const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const app = require("../src/app");

describe("/authors", () => {
  before(async () => Author.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          name: "Dr. Seuss",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("Dr. Seuss");

        expect(newAuthorRecord.name).to.equal("Dr. Seuss");
      });

      it("errors if the field is missing", async () => {
        const response = await request(app).post("/authors").send({});
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });

      it("errors if name is an empty string", async () => {
        const response = await request(app).post("/authors").send({
          name: "",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });

      it("errors if the author already exists", async () => {
        Author.create({
          name: "Dr. Seuss",
        });

        const response = await request(app).post("/authors").send({
          name: "Dr. Seuss",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });
    });
  });
});

describe("with records in the database", () => {
  let authors;

  beforeEach(async () => {
    await Author.destroy({ where: {} });

    authors = await Promise.all([
      Author.create({
        name: "Dr. Seuss",
      }),
      Author.create({
        name: "George R.R. Martin",
      }),
      Author.create({
        name: "C.S. Lewis",
      }),
    ]);
  });

  describe("GET /authors", () => {
    it("gets all authors records", async () => {
      const response = await request(app).get("/authors");

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((author) => {
        const expected = authors.find((a) => a.id === author.id);

        expect(author.name).to.equal(expected.name);
      });
    });
  });

  describe("GET /authors/:id", () => {
    it("gets authors record by id", async () => {
      const author = authors[0];
      const response = await request(app).get(`/authors/${author.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(author.name);
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app).get("/authors/12345");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });

  describe("PATCH /authors/:id", () => {
    it("updates authors name by id", async () => {
      const author = authors[0];
      const response = await request(app)
        .patch(`/authors/${author.id}`)
        .send({ name: "Georgia R.R. Martin" });
      const updatedAuthorRecord = await Author.findByPk(author.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedAuthorRecord.name).to.equal("Georgia R.R. Martin");
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app)
        .patch("/authors/12345")
        .send({ name: "Georgia R.R. Martin" });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });

  describe("DELETE /authors/:id", () => {
    it("deletes author record by id", async () => {
      const author = authors[0];
      const response = await request(app).delete(`/authors/${author.id}`);
      const deletedAuthor = await Author.findByPk(author.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedAuthor).to.equal(null);
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app).delete("/authors/12345");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });
});
