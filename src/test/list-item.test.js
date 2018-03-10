process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../bin/www');
const List = require('../api/models').list;
const ListItem = require('../api/models').list_item;
// noinspection JSUnusedLocalSymbols
const should = chai.should();
const records = require('../data').records;

chai.use(chaiHttp);

describe('List Items', () => {
  beforeEach(() => {
    return List.truncate({ cascade: true });
  });

  describe('GET /lists/:id/items', () => {
    it('it should GET all items from a list. Should be empty', done => {
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .get(`/lists/${list.id}/items`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  });

  describe('GET /lists/:id/items', () => {
    it('it should GET all items from a list. Should have one', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        chai
          .request(server)
          .get(`/lists/${list.id}/items`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(10);
            done();
          });
      });
    });
  });

  describe('GET /lists', () => {
    it('it should GET all the lists paginated', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        chai
          .request(server)
          .get(`/lists/${list.id}/items?page=1&limit=5`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(5);
            done();
          });
      });
    });
  });

  describe('GET /lists', () => {
    it('it should NOT GET all the lists paginated. When limit is less than 1', done => {
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .get(`/lists/${list.id}/items?page=1&limit=0`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('POST /lists/:id/items', () => {
    it('it should POST item to a list.', done => {
      const listItem = { content: 'item 1' };
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .post(`/lists/${list.id}/items`)
          .send(listItem)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(201);
            done();
          });
      });
    });
  });

  describe('POST /lists/:id/items', () => {
    it('it should NOT POST item to a list, when content is missing.', done => {
      const listItem = {};
      List.create(records[0]).then(list => {
        chai
          .request(server)
          .post(`/lists/${list.id}/items`)
          .send(listItem)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('POST /lists/:id/items', () => {
    it('it should NOT POST item to a list, when the id is wrong.', done => {
      const listItem = { content: 'item 1' };
      List.create(records[0]).then(() => {
        chai
          .request(server)
          .post(`/lists/100/items`)
          .send(listItem)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe('GET /lists/:id/items/:itemId', () => {
    it('it should GET an item in list.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .get(`/lists/${list.id}/items/${listItem.id}`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('GET /lists/:id/items/:itemId', () => {
    it('it should NOT GET an item in list, when the id is wrong.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .get(`/lists/${list.id}/items/100`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe('PATCH /lists/:id/items/:itemId', () => {
    it('it should Patch an item in list.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .patch(`/lists/${list.id}/items/${listItem.id}`)
          .send(listItem)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('PATCH /lists/:id/items/:itemId', () => {
    it('it should NOT Patch an item in list, when content is missing.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .patch(`/lists/${list.id}/items/${listItem.id}`)
          .send({})
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('PATCH /lists/:id/items/:itemId', () => {
    it('it should NOT PATCH an item in list, when the id is wrong.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .patch(`/lists/${list.id}/items/100`)
          .send(listItem)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(404);
            done();
          });
      });
    });
  });

  describe('DELETE /lists/:id/items/:itemId', () => {
    it('it should DELETE an item in list.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .delete(`/lists/${list.id}/items/${listItem.id}`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(204);
            done();
          });
      });
    });
  });

  describe('DELETE /lists/:id/items/:itemId', () => {
    it('it should NOT DELETE an item in list, when the id is wrong.', done => {
      List.create(records[0], {
        include: {
          model: ListItem,
          as: 'listItems'
        }
      }).then(list => {
        const listItem = list.listItems[0];
        listItem.content = 'edited';
        chai
          .request(server)
          .delete(`/lists/${list.id}/items/100`)
          .end((err, res) => {
            // noinspection Annotator
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
