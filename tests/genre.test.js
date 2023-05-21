const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models");
const app = require("../src/app");

describe("/genres", () => {
  before(async () => Genre.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /genres", () => {
      it("creates a new genre in the database", async () => {
        const response = await request(app).post("/genres").send({
          name: "Romance",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("Romance");

        expect(newGenreRecord.name).to.equal("Romance");
      });

      it("errors if the field is missing", async () => {
        const response = await request(app).post("/genres").send({});
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newGenreRecord).to.equal(null);
      });

      it("errors if name is an empty string", async () => {
        const response = await request(app).post("/genres").send({
          name: "",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newGenreRecord).to.equal(null);
      });

      it("errors if the genre already exists", async () => {
        Genre.create({
          name: "Romance",
        });

        const response = await request(app).post("/genres").send({
          name: "Romance",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newGenreRecord).to.equal(null);
      });
    });
  });
});

describe("with records in the database", () => {
  let genres;

  beforeEach(async () => {
    await Genre.destroy({ where: {} });

    genres = await Promise.all([
      Genre.create({
        name: "Romance",
      }),
      Genre.create({
        name: "Mystery",
      }),
      Genre.create({
        name: "Science Fiction",
      }),
    ]);
  });

  describe("GET /genres", () => {
    it("gets all genres records", async () => {
      const response = await request(app).get("/genres");

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((genre) => {
        const expected = genres.find((a) => a.id === genre.id);

        expect(genre.name).to.equal(expected.name);
      });
    });
  });

  describe("GET /genres/:id", () => {
    it("gets genres record by id", async () => {
      const genre = genres[0];
      const response = await request(app).get(`/genres/${genre.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(genre.name);
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app).get("/genres/12345");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });

  describe("PATCH /genres/:id", () => {
    it("updates genres name by id", async () => {
      const genre = genres[0];
      const response = await request(app)
        .patch(`/genres/${genre.id}`)
        .send({ name: "Romance" });
      const updatedGenreRecord = await Genre.findByPk(genre.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedGenreRecord.name).to.equal("Romance");
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app)
        .patch("/genres/12345")
        .send({ name: "Romance" });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });

  describe("DELETE /genres/:id", () => {
    it("deletes genre record by id", async () => {
      const genre = genres[0];
      const response = await request(app).delete(`/genres/${genre.id}`);
      const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedGenre).to.equal(null);
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app).delete("/genres/12345");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });
});
