process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../bin/www');
// noinspection JSUnusedLocalSymbols
const should = chai.should();

chai.use(chaiHttp);

describe('status', () => {
  describe(`/GET /status`, () => {
    it('it should GET the status', done => {
      chai
        .request(server)
        .get(`/status`)
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.be.eql('OK');
          done();
        });
    });
  });
});
