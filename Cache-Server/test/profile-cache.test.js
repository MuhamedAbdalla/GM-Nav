const expect = require("chai").expect;
const request = require("supertest");
const server = require("../server");

describe("Checking cache server", () => {
  beforeEach((done) => {
    this.timeout(500);
    setTimeout(done, 300);
    console.log("Tests started!!");
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
