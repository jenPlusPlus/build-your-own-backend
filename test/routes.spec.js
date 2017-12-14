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
  });

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
        response.body.error.should.equal('Could not find any team associated with "city" of "dayton"');
      })
      .catch((error) => {
        throw error;
      }));

  describe('POST /api/v1/teams', () => {

  });

  describe('GET /api/v1/teams/:id', () =>
    chai.request(server)
      .get('/api/v1/teams/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.team.should.be.an('object');
        response.body.team.should.have.property('id');
        response.body.team.should.have.property('city');
        response.body.team.should.have.property('name');
      })
      .catch((error) => {
        throw error;
      }));

  describe('PATCH /api/v1/teams/:id', () => {

  });
  describe('DELETE /api/v1/teams/:id', () => {

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
