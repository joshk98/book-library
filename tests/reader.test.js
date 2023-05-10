const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
  before(async () => await Reader.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /readers", () => {
      it("creates a new reader in the database", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
        });

        expect(response.status).to.equal(201);

        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.body.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
      });
    });
  });
});
