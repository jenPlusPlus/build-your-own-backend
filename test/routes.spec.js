/* eslint no-unused-expressions: 0 */

const chai = require('chai');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('./../server');

const enviroment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[enviroment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () =>
    chai.request(server)
      .get('/')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch((err) => {
        throw err;
      }));

  it('should return a 404 for a route that does not exist', () =>
    chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404);
      })
      .catch((err) => {
        throw err;
      }));
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  describe('GET /api/v1/teams', () => {
    it('should return all of the teams', () =>
      chai.request(server)
        .get('/api/v1/teams')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.teams.should.be.an('array');
          response.body.teams.length.should.equal(10);
          response.body.teams[0].should.have.property('id');
          response.body.teams[0].should.have.property('city');
          response.body.teams[0].should.have.property('name');
        })
        .catch((error) => {
          throw error;
        }));

    it('should return one team given query parameter', () =>
      chai.request(server)
        .get('/api/v1/teams?city=dallas')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.team.should.be.an('object');
          response.body.team.should.have.property('id');
          response.body.team.should.have.property('city');
          response.body.team.should.have.property('name');
        })
        .catch((error) => {
          throw error;
        }));

    it('should return error if query parameter and value not found', () =>
      chai.request(server)
        .get('/api/v1/teams?city=dayton')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal("Could not find any team associated with 'city' of 'dayton'");
        })
        .catch((error) => {
          throw error;
        }));
  });

  describe('POST /api/v1/teams', () => {
    it('should add a team if given correct parameters', () => {
      const postBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        name: 'aurora',
        city: 'stars',
      };

      chai.request(server)
        .post('/api/v1/teams').send(postBody)
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.be.a('number');
        })
        .catch((error) => {
          throw error;
        });
    });
    it('should return an error if token is missing', () => {
      const postBody = {
        name: 'aurora',
        city: 'stars',
      };

      chai.request(server)
        .post('/api/v1/teams').send(postBody)
        .then((response) => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You must be authorized to access this endpoint.');
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should return an error if token does not have admin authorization', () => {
      const postBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUxMzI5OTUxNH0.fM6rmI_-r2nsRIN78K_8-yl8T7189-oHr4KPuZYgTbw',
        name: 'aurora',
        city: 'stars',
      };

      chai.request(server)
        .post('/api/v1/teams').send(postBody)
        .then((response) => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You must be authorized to access this endpoint.');
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should return an error if post body does not include all required parameters', () => {
      const postBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        city: 'stars',
      };

      chai.request(server)
        .post('/api/v1/teams').send(postBody)
        .then((response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the \'name\' property');
        })
        .catch((error) => {
          throw error;
        });
    });

    it.skip('should return an error if post parameter is incorrect data type', () => {
      const postBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        name: false,
        city: 'stars',
      };

      chai.request(server)
        .post('/api/v1/teams').send(postBody)
        .then((response) => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/teams/:id', () => {
    it('should return a single team', () => {
      chai.request(server)
        .get('/api/v1/teams/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('team');
          response.body.team.should.be.an('object');
          response.body.team.should.have.property('city');
          response.body.team.city.should.be.a('string');
          response.body.team.should.have.property('name');
          response.body.team.name.should.be.a('string');
        })
        .catch((error) => {
          throw error;
        });
    });

    it('should return an error if no team found', () => {
      chai.request(server)
        .get('/api/v1/teams/100')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  describe('PATCH /api/v1/teams/:id', () => {
    it('should edit an existing team with given parameters', () => {
      const patchBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        city: 'colorado springs',
      };
      chai.request(server)
        .patch('/api/v1/teams/2')
        .send(patchBody)
        .then((response) => {
          response.should.have.status(202);
          response.should.be.json;
          response.body.should.have.property('team');
          response.body.team.should.have.property('city');
          response.body.city.should.be.a('string');
          response.body.team.should.have.property('name');
          response.body.name.should.be.a('string');
        })
        .catch((error) => {
          throw error;
        });
    });
    it.skip('should return an error if the team does not exist', () => {
      const patchBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        city: 'raleigh',
      };
      chai.request(server)
        .patch('/api/v1/teams/500')
        .send(patchBody)
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
    it.skip('should return an error if parameter does not exist', () => {
      const patchBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        elevation: '5280',
      };
      chai.request(server)
        .patch('/api/v1/teams/9')
        .send(patchBody)
        .then((response) => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
    it.skip('should return an error if parameter value is invalid', () => {
      const patchBody = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        weight: -300,
      };
      chai.request(server)
        .patch('/api/v1/teams/10')
        .send(patchBody)
        .then((response) => {
          response.should.have.status(422);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
  });
  describe('DELETE /api/v1/teams/:id', () => {
    it.skip('should remove an existing team', () => {
      chai.request(server)
        .delete('/api/v1/teams/1')
        .send({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        })
        .then((response) => {
          response.should.have.status(204);
        })
        .catch((error) => {
          throw error;
        });
    });
    it.skip('should return an error if the team does not exist', () => {
      chai.request(server)
        .delete('/api/v1/teams/0')
        .send({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjk2OTAyfQ.PYJdX-gPt-9QVKIX98J5nMCK_58eeU-9huriSVlf6AQ',
        })
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
    });
    it.skip('should throw an error if user does not supply token', () => {
      chai.request(server)
        .delete('/api/v1/teams/5')
        .then((response) => {
          response.should.have.status(403);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        })
    });
  });
  describe('GET /api/v1/teams/:id/players', () =>
    chai.request(server)
      .get('/api/v1/teams/1/players')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.have.property('players');
        response.body.players.should.be.an('array');
        response.body.players.length.should.equal(1);
        response.body.players[0].should.be.an('object');
        response.body.players[0].should.have.property('id');
        response.body.players[0].id.should.be.a('number');
        response.body.players[0].should.have.property('team_id');
        response.body.players[0].team_id.should.be.a('number');
        response.body.players[0].should.have.property('name');
        response.body.players[0].name.should.be.a('string');
        response.body.players[0].should.have.property('position');
        response.body.players[0].position.should.be.a('string');
        response.body.players[0].should.have.property('age');
        response.body.players[0].age.should.be.a('number');
        response.body.players[0].should.have.property('height');
        response.body.players[0].height.should.be.a('string');
        response.body.players[0].should.have.property('weight');
        response.body.players[0].weight.should.be.a('number');
        response.body.players[0].should.have.property('experience');
        response.body.players[0].experience.should.be.a('string');
        response.body.players[0].should.have.property('college');
        response.body.players[0].college.should.be.a('string');
      })
      .catch((error) => {
        throw error;
      }));

  describe('POST /api/v1/teams/:id/players', () => {

  });
  describe('GET /api/v1/players', () => {

  });
  describe('GET /api/v1/players/:id', () => {

  });
  describe('GET /api/v1/teams/:teamID/players/:playerID', () => {

  });
  describe('PATCH /api/v1/teams/:teamID/players/:playerID', () => {

  });
  describe('DELETE /api/v1/teams/:teamID/players/:playerID', () => {

  });
});
