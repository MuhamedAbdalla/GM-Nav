process.env.NODE_ENV = "production";

const expect = require("chai").expect;
const request = require("supertest");
const server = require('../server');

describe("Checking cookies server", () => {
  before((done) => {
    console.log("Tests started!!");
    done();
  });

  after(function (done) {
    console.log('Tests are done!!');
    done();
  });

  it("Check user cookies", (done) => {
    fetch(server, '/cookies-insert', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
          keys: ['userID'],
          values: ['XX'],
          ages: [5000],
      }),
    })
    .then(async (_) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      fetch(server, '/cookies-get', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            key: 'userID',
        }),
      })
      .then((res) => {
        var value = res.body.cookies;
        expect(value).to.equal('XX');
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
