process.env.TESTING = true;
const app = require("../index");
const supertest = require("supertest");

describe("Test the root post path", () => {
    test("It should response the POST method", async () => {
        await supertest(app).post("/api/profiles")
            .send({
                patentId: "t5588989",
                name: "XXXTENTACION",
                birthDate: new Date(1970, 1, 1, 0, 0, 0, 0),
                gender: 1,
                phoneNumber: '0102030405060',
                address: '30 Great Devil St, Hell',
                hasHypertension: false,
                hasDiabetes: false,
                hasObesity: false,
                hasAllergies: false,
                hasCancer: false,
                isSmoker: true,
            })
            .expect(201)
            .then((response) => {
                expect(response.body.patentId).toEqual('t5588989');
            });
    });

    test("It should refuse to create duplicate profile the POST method", async () => {
        await supertest(app).post("/api/profiles")
            .send({
                patentId: "t5588989",
                name: "XXXTENTACION",
                birthDate: new Date(1970, 1, 1, 0, 0, 0, 0),
                gender: 1,
                phoneNumber: '0102030405060',
                address: '30 Great Devil St, Hell',
                hasHypertension: false,
                hasDiabetes: false,
                hasObesity: false,
                hasAllergies: false,
                hasCancer: false,
                isSmoker: true,
            })
            .expect(409)
            .then((response) => {
                expect(response.body.error).toEqual('ALREADY_EXISTS');
            });
    });

    test("It should response the GET method", async () => {
        await supertest(app).get("/api/profiles/t5588989")
            .expect(200)
            .then((response) => {
                expect(response.body.patentId).toEqual('t5588989')
            });
    });
});