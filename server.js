const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
  response.send('it works!!');
});

// team resources

app.get('/api/v1/teams', (request, response) => {
  
});

app.get('/api/v1/teams/:id', (request, response) => {

});

// player resources

app.get('/api/v1/players', (request, response) => {

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

