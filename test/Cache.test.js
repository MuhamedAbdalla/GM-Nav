const expect = require("chai").expect;
const request = require("supertest");
const server = require("../Cache-Server/server");

describe("Checking cache server", () => {
  beforeEach((done) => {
    console.log("Tests started!!");
    done();
  });

  after(function (done) {
    console.log("Tests are done!!");
    done();
  });

  it("Check profile cache", (done) => {
    request(server)
      .post("/Cache-Profile")
      .send({
        UserKey: "khwhybgk1",
        ID: "khwhybgk1",
      })
      .then(async (_) => {
        request(server)
          .post("/Cache-Profile")
          .send({
            UserKey: "khwhybgk1",
            ID: "khwhybgk1",
          })
          .then(async (res) => {
            expect(res.body.data.Email).equals(
              "muhammed.abdalla.work@gmail.com"
            );
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
      done();
  });
}).timeout(5000);
