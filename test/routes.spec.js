const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch(err => {
        throw err;
      });
  });
  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(err => {
        throw err;
      });
  });
});

describe('API Routes', () => {

  describe('GET /api/v1/teams', () => {

  });
  describe('POST /api/v1/teams', () => {

  });
  describe('GET /api/v1/teams/:id', () => {

  });
  describe('PATCH /api/v1/teams/:id', () => {

  });
  describe('DELETE /api/v1/teams/:id', () => {

  });
  describe('GET /api/v1/teams/:id/players', () => {

  });
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
