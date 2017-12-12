const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/', (request, response) => {
  response.send('it works!!');
});

// team resources

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then(teams => response.status(200).json({ teams }))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:id', (request, response) => {

});

// player resources

app.get('/api/v1/players', (request, response) => {
  database('players').select()
    .then(players => response.status(200).json({ players }))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:id/players', (request,response) => {

});

app.get('/api/v1/teams/:teamID/players/:playerID', (request, response) => {

});

// generic errors

app.use(function (request, response, next) {
  response.status(404).send("404: Sorry can't find that!")
});

app.use(function (error, request, response, next) {
  console.error(error.stack)
  response.status(500).send('Something broke!')
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

