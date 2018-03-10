process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../bin/www');
const List = require('../api/models').list;
// noinspection JSUnusedLocalSymbols
const should = chai.should();
const records = require('../data').records;

chai.use(chaiHttp);

describe('Lists', () => {
  beforeEach(() => {
    return List.truncate({ cascade: true });
  });

  describe('GET /lists', () => {
    it('it should GET empty lists.', done => {
      chai
        .request(server)
        .get('/lists')
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('GET /lists', () => {
    it('it should GET all the lists', done => {
      List.create(records[0]).then(() => {
        chai
          .request(server)
          .get('/lists')
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  describe('GET /lists', () => {
    it('it should GET all the lists paginated', done => {
      List.create(records[0]).then(() => {
        chai
          .request(server)
          .get('/lists?page=1&limit=1')
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  describe('GET /lists', () => {
    it('it should GET all the lists', done => {
      List.create(records[0]).then(() => {
        chai
          .request(server)
          .get('/lists')
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  describe('POST /lists', () => {
    it('it should POST one list to lists', done => {
      const list = records[0];
      chai
        .request(server)
        .post('/lists')
        .send(list)
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          done();
        });
    });
  });

  describe('POST /lists', () => {
    it('it should NOT POST one list to lists without a name field', done => {
      const list = {};
      chai
        .request(server)
        .post('/lists')
        .send(list)
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('code').eql(400);
          done();
        });
    });
  });

  describe('GET /lists/:id', () => {
    it('it should GET one list from lists', done => {
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .get(`/lists/${list.id}`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.id.should.be.eql(list.id);
            done();
          });
      });
    });
  });

  describe('GET /lists/:id', () => {
    it('it should not GET one list from lists when id is wrong.', done => {
      chai
        .request(server)
        .get('/lists/100')
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('PATCH /lists/:id/', () => {
    it('it should PATCH one list to lists', done => {
      List.create(records[0]).then(list => {
        list.name = 'edited';
        chai
          .request(server)
          .patch(`/lists/${list.id}`)
          .send(list)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('edited');
            done();
          });
      });
    });
  });

  describe('PATCH /lists/:id/', () => {
    it('it should NOT PATCH one list to lists, when name is missing.', done => {
      List.create(records[0]).then(list => {
        list.name = 'edited';
        chai
          .request(server)
          .patch(`/lists/${list.id}`)
          .send({})
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('PATCH /lists/:id/', () => {
    it('it should NOT PATCH one list to lists when id is wrong.', done => {
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .patch(`/lists/100`)
          .send(list)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe('DELETE /lists/:id/', () => {
    it('it should DELETE one list from lists', done => {
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .delete(`/lists/${list.id}`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(204);
            done();
          });
      });
    });
  });

  describe('DELETE /lists/:id/', () => {
    it('it should NOT DELETE one list from lists when id is wrong.', done => {
      chai
        .request(server)
        .delete('/lists/100')
        .end((err, res) => {
          // noinspection Annotator
          res.should.have.status(404);
          done();
        });
    });
  });
});
