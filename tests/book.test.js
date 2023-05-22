const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "Harry Potter",
          author: "J.K. Rowling",
          ISBN: "123456",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("Harry Potter");

        expect(newBookRecord.title).to.equal("Harry Potter");
        expect(newBookRecord.author).to.equal("J.K. Rowling");
        expect(newBookRecord.ISBN).to.equal("123456");
      });

      it("errors if any of the fields are missing", async () => {
        const response = await request(app).post("/books").send({});
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(3);
        expect(newBookRecord).to.equal(null);
      });

      it("errors if title is an empty string", async () => {
        const response = await request(app).post("/books").send({
          title: "",
          author: "John Doe",
          ISBN: "123456",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newBookRecord).to.equal(null);
      });

      it("errors if the ISBN already exists", async () => {
        Book.create({
          title: "Harry Potter",
          author: "J.K. Rowling",
          ISBN: "123456",
        });

        const response = await request(app).post("/books").send({
          title: "Harry Potter 2",
          author: "J.K. Rowling",
          ISBN: "123456",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      await Book.destroy({ where: {} });

      books = await Promise.all([
        Book.create({
          title: "Harry Potter",
          author: "J.K. Rowling",
          ISBN: "123456",
        }),
        Book.create({
          title: "Percy Jackson",
          author: "Rick Riordan",
          ISBN: "789101",
        }),
        Book.create({
          title: "Sherlock Holmes",
          author: "Arthur Conan Doyle",
          ISBN: "987654",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/books");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /books/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books details by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ author: "A different author" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.author).to.equal("A different author");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/books/12345")
          .send({ author: "A different author" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/books/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
