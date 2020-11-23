process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

var FirebaseServer = require("firebase-server");
FirebaseServer = new FirebaseServer(5000, "localhost.firebaseio.test", {
  /* Here I added my data */
  /* Available for test database */
});

const server = require("../server");

describe("Get User tests", () => {
  before((done) => {
    console.log("Server start");
    done();
  });

  after(function (done) {
    FirebaseServer.close(console.log("\n —server closed — "));
    done();
  });

  it("Get a user by username", (done) => {
    request(server)
      .post("/insert")
      .send({
        path: ["User", "xx"],
        model: {
          name: "momo",
        },
      })
      .then((res) => {
        request(server)
          .post("/get")
          .send({
            path: ["User", "xx"],
          })
          .then((res) => {
            const body = res.body;
            expect(body.name).to.equal("momo");
            done();
          })
          .catch((error) => {
            console.log(error);
            done(error);
          });
      })
      .catch((error) => {
        console.log(error);
        done(error);
      });
  });
});
