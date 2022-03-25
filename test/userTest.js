const request = require("supertest")

const app = require("../app.js")

/* Testing get all users EnpPoint */

describe("GET User Endpoint", () => {
    it("Testing GET Users", done => {
        request(app)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})

describe("GET Users Endpoint", () => {
    it("Response with json containing single user", done => {
        request(app)
            .get("/api/users/619289986efadd9ee1c3c2a9")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })

    it("Response with user not found", done => {
        request(app)
            .get("/api/users/61928702a40736bbe032f172")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('{"msg":"usuario no encontrado o deshabilitado"}')
            .end((err) => {
                if (err) return done(err);
                done()
            })
    })
    it("Response with error indicating is not mongoID", done => {
        request(app)
            .get("/api/users/61928702a40736bbe032f1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .expect('{"errors":[{"value":"61928702a40736bbe032f1","msg":"No es un id mongo","param":"id","location":"params"}]}')
            .end(err => {
                if (err) return done(err)
                done()
            })

    })
})

describe("POST User Endpoint", () => {
    it("Response 201 indicating no autorization", done => {
        const data = {
            name: "nero",
            description: "cachorro pequeño, color cafe, similar a un salchicha",
            contact: "950011417",
            type: "6196a2e2bb4af8d1ae10b5c5"
        }
        request(app)
            .post("/api/users")
            .send(data)
            .set(
                {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTkyYmJjMmY4YTc3OGJlNzEzM2YzOTQiLCJuYW1lIjoiSnVhbiIsImlhdCI6MTYzOTI0MTg0OCwiZXhwIjoxNjM5MjQ1NDQ4fQ.QJxu_chJYMZvkaJx4nUcNSt_UP29oaB3EzMwmTYtqiY",
                "Accept": "application/json"
            })
            .expect("Content-Type", /json/)
            .expect(201)
            .end(err =>{
                if(err) return done(err)
                done()
            })  
    })
})