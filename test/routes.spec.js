/* eslint-disable no-unused-expressions */

const chai = require('chai');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('./../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjMwNzM1fQ.oKRKielelMEtVeN4FVURPlDP4lv9heS11BlogGu4srs';
const unauthorizedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUxMzIyOTY2Nn0.QheMWhbCRkKZmvTrvvt2C9pbSrdfaBWNMoksctfAIA8';

chai.use(chaiHttp);
describe('Client Routes', () => {
  it('should return the homepage', () =>
    chai.request(server)
      .get('/')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch((err) => { throw err; }));

  it('should return a 404 for a route that does not exist', () =>
    chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404);
      })
      .catch((err) => { throw err; }));
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => { throw error; });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => { throw error; });
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
        .catch((error) => { throw error; }));

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
        .catch((error) => { throw error; }));

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
        .catch((error) => { throw error; }));
  });

  describe('POST /api/v1/teams', () => {

  });

  describe('GET /api/v1/teams/:id', () => {
    it('should get a specific team', () =>
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
        .catch((error) => { throw error; }));
  });
  describe('PATCH /api/v1/teams/:id', () => {

  });

  describe('DELETE /api/v1/teams/:id', () => {

  });

  describe('GET /api/v1/teams/:id/players', () => {
    it('should get all players from a specific team', () =>
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
        .catch((error) => { throw error; }));
    it('should return a 404 with error if the team is not found', () =>
      chai.request(server)
        .get('/api/v1/teams/999/players')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any players with a team_id of 999');
        })
        .catch((error) => { throw error; }));
  });
  describe('POST /api/v1/teams/:id/players', () => {
    it.skip('should be able to add a player to the database', () =>
      chai.request(server)
        .post('/api/v1/teams/6/players')
        .send({
          number: 99,
          name: 'John Q. Football',
          position: 'xx',
          age: 67,
          height: '5-10',
          weight: 250,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch((error) => { throw error; }));

    it('should return a 422 if a property is not present', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: 250,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal("You are missing the 'name' property");
        })
        .catch((error) => { throw error; }));

    it('should return a 403 if the token is not present', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          name: 'John Q. Football',
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: 250,
          experience: '4',
          college: 'MTSU',
        })
        .then((response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You must be authorized to access this endpoint.');
        })
        .catch((error) => { throw error; }));

    it('should return a 403 if the token does not have admin privileges', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          name: 'John Q. Football',
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: 250,
          experience: '4',
          college: 'MTSU',
          token: unauthorizedToken,
        })
        .then((response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You must be authorized to access this endpoint.');
        })
        .catch((error) => { throw error; }));

    it('should return a 422 if a numerical value is negative', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          name: 'John Q. Football',
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: -125,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('weight must be a positive number');
        })
        .catch((error) => { throw error; }));

    it('should return a 422 if a string is empty', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          name: '',
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: 325,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('name cannot be an empty string.');
        })
        .catch((error) => { throw error; }));

    it('should return a 422 if a number is taken by a teammate', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 24,
          name: 'John Q. Quarterback',
          position: 'QB',
          age: 67,
          height: '5-10',
          weight: 325,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Player number 24 is already in use.');
        })
        .catch((error) => { throw error; }));

    it('should return a 422 if a position is anything other than 1 or 2 characters', () =>
      chai.request(server)
        .post('/api/v1/teams/7/players')
        .send({
          number: 99,
          name: 'John Q. Quarterback',
          position: 'ppp',
          age: 67,
          height: '5-10',
          weight: 325,
          experience: '4',
          college: 'MTSU',
          token,
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Invalid position. position must be between 1 and 2 characters in length.');
        })
        .catch((error) => { throw error; }));
  });
  describe('GET /api/v1/players', () => {
    it('should return all of the players', () =>
      chai.request(server)
        .get('/api/v1/players')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.players.should.be.an('array');
          response.body.players[0].should.have.property('id');
          response.body.players[0].should.have.property('team_id');
          response.body.players[0].should.have.property('name');
          response.body.players[0].should.have.property('age');
          response.body.players[0].should.have.property('number');
          response.body.players[0].should.have.property('height');
          response.body.players[0].should.have.property('weight');
          response.body.players[0].should.have.property('position');
          response.body.players[0].should.have.property('college');
          response.body.players[0].should.have.property('experience');
        })
        .catch((error) => { throw error; }));

    it('should return an array of players given query parameter', () =>
      chai.request(server)
        .get('/api/v1/players?age=37')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.players.should.be.an('array');
          response.body.players.length.should.equal(1);
          response.body.players[0].should.include({
            id: 3,
            team_id: 1,
            age: 37,
            college: 'USC',
            experience: '15',
            height: '6-5',
            name: 'Carson Palmer',
            number: 3,
            position: 'QB',
            weight: 235,
          });
          response.body.players[0].should.have.property('id');
          response.body.players[0].should.have.property('team_id');
          response.body.players[0].should.have.property('name');
          response.body.players[0].should.have.property('age');
          response.body.players[0].should.have.property('number');
          response.body.players[0].should.have.property('height');
          response.body.players[0].should.have.property('weight');
          response.body.players[0].should.have.property('position');
          response.body.players[0].should.have.property('college');
          response.body.players[0].should.have.property('experience');
        })
        .catch((error) => {
          throw error;
        }));

    it('should return a 404 with error if match for query is not found', () =>
      chai.request(server)
        .get('/api/v1/players?age=999')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal("Could not find any player associated with 'age' of '999'");
        })
        .catch((error) => {
          throw error;
        }));
  });

  describe('GET /api/v1/players/:id', () => {
    it('should get a specific player', () =>
      chai.request(server)
        .get('/api/v1/players/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.player.should.be.an('object');
          response.body.player.should.have.property('id');
          response.body.player.id.should.equal(1);
          response.body.player.should.have.property('age');
          response.body.player.age.should.equal(28);
          response.body.player.should.have.property('college');
          response.body.player.college.should.equal('Virginia Tech');
          response.body.player.should.have.property('experience');
          response.body.player.experience.should.equal('7');
          response.body.player.should.have.property('height');
          response.body.player.height.should.equal('6-1');
          response.body.player.should.have.property('name');
          response.body.player.name.should.equal('Tyrod Tayler');
          response.body.player.should.have.property('number');
          response.body.player.number.should.equal(5);
          response.body.player.should.have.property('position');
          response.body.player.should.have.property('weight');
          response.body.player.weight.should.equal(215);
        })
        .catch((error) => { throw error; }));

    it('should return a 404 error if player is not found', () =>
      chai.request(server)
        .get('/api/v1/players/4000')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any player associated with id 4000');
        })
        .catch((error) => {
          throw error;
        }));
  });
  describe('GET /api/v1/teams/:teamID/players/:playerID', () => {
    it('should return a specific player from a specific team', () => {
      chai.request(server)
        .get('/api/v1/teams/1/players/3')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.players.should.be.an('array');
          response.body.players.length.should.equal(1);
          response.body.players[0].should.have.property('id');
          response.body.players[0].should.have.property('team_id');
          response.body.players[0].should.have.property('name');
          response.body.players[0].should.have.property('age');
          response.body.players[0].should.have.property('number');
          response.body.players[0].should.have.property('height');
          response.body.players[0].should.have.property('weight');
          response.body.players[0].should.have.property('position');
          response.body.players[0].should.have.property('college');
          response.body.players[0].should.have.property('experience');
          response.body.players[0].should.include({
            id: 3,
            team_id: 1,
            age: 37,
            college: 'USC',
            experience: '15',
            height: '6-5',
            name: 'Carson Palmer',
            number: 3,
            position: 'QB',
            weight: 235,
          });
        })
        .catch((error) => { throw error; });
    });

    it('should return a 404 error if player is not found', () =>
      chai.request(server)
        .get('/api/v1/teams/1/players/4000')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any player associated with team_id 1 and id 4000');
        })
        .catch((error) => {
          throw error;
        }));
  });
  describe('PATCH /api/v1/teams/:teamID/players/:playerID', () => {
    it('should be able to update a player record', () => {
      chai.request(server)
        .patch('/api/v1/teams/7/players/2')
        .send({
          name: 'Mr.Football',
          token,
        })
        .then((response) => {
          response.should.have.status(202);
          response.should.be.json;
          response.body.player.should.be.an('object');
          response.body.player.should.have.property('id');
          response.body.player.id.should.equal(2);
          response.body.player.should.have.property('age');
          response.body.player.age.should.equal(29);
          response.body.player.should.have.property('college');
          response.body.player.college.should.equal('Georgia');
          response.body.player.should.have.property('experience');
          response.body.player.experience.should.equal('7');
          response.body.player.should.have.property('height');
          response.body.player.height.should.equal('6-4');
          response.body.player.should.have.property('name');
          response.body.player.name.should.equal('A.J. Green');
          response.body.player.should.have.property('number');
          response.body.player.number.should.equal(18);
          response.body.player.should.have.property('position');
          response.body.player.should.have.property('weight');
          response.body.player.weight.should.equal(210);
        })
        .catch((error) => { throw error; });
    });

    it.skip('should return a 404 error if player is not found', () =>
      chai.request(server)
        .patch('/api/v1/teams/7/players/99999')
        .send({
          name: 'Mr.Football',
          token,
        })
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any player associated with id 99999');
        })
        .catch((error) => { throw error; }));
  });

  describe('DELETE /api/v1/teams/:teamID/players/:playerID', () => {
    it.skip('should delete bill with id specified', () =>
      chai.request(server)
        .del('/api/v1/teams/7/players/2')
        .send({
          token,
        })
        .then((response) => {
          response.should.have.status(204);
          response.body.player.id.should.equal(2);
        })
        .catch((error) => { throw error; }));

    it.skip('should return a 404 error if player is not found', () =>
      chai.request(server)
        .del('/api/v1/teams/7/players/400')
        .send({
          token,
        })
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find any player associated with id 99999');
        })
        .catch((error) => { throw error; }));
  });

  describe('POST to POST /api/v1/teams/:id/players', () => {
    it('should authenticate a user', () => {
      chai.request(server)
        .post('/api/v1/teams/6/players')
        .send({
          email: 'jen@email.com',
          appName: 'my cool app',
        })
        .then((response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.should.have.property('token');
          response.body.should.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUxMzM2NTc0N30.2LXG2iymi_pVYxq05cSu_EyMev0wtxJZrqKNONruTmg');
        })
        .catch((error) => { throw error; });
    });

    it('should create an admin when the correct credentials are supplied', () => {
      chai.request(server)
        .post('/api/v1/teams/6/players')
        .send({
          email: 'jen@turing.io',
          appName: 'my cool app',
        })
        .then((response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.should.have.property('token');
          response.body.should.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUxMzM2NTc0N30.2LXG2iymi_pVYxq05cSu_EyMev0wtxJZrqKNONruTmg');
        })
        .catch((error) => { throw error; });
    });

    it('should return a 422 error if a required parameter is missing', () => {
      chai.request(server)
        .post('/api/v1/teams/6/players')
        .send({
          email: 'jen@turing.io',
        })
        .then((response) => {
          response.should.have.status(422);
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the appName property');
        })
        .catch((error) => { throw error; });
    });
  });
});
