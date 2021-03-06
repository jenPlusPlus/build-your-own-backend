/* eslint no-restricted-syntax: 0 */
/* eslint no-console: 0 */
/* eslint no-plusplus: 0 */

const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.set('secretKey', process.env.SECRET_KEY);

app.locals.title = 'BYOB';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const cleanTeam = (request, response, next) => {
  const checkEmptyString = (stringProperties) => {
    stringProperties.forEach((stringProperty) => {
      if (request.body[Object.keys(stringProperty)[0]] === '') {
        return response.status(422).json({ error: `${Object.keys(stringProperty)[0]} cannot be an empty string.` });
      }
      return null;
    });
  };
  if (request.body.city) {
    request.body.city = request.body.city.toLowerCase();
  }
  if (request.body.name) {
    request.body.name = request.body.name.toLowerCase();
  }
  checkEmptyString([
    { name: request.body.name },
    { city: request.body.city },
  ]);
  next();
};

const cleanPlayer = (request, response, next) => {
  const checkPositives = (numericalProperties) => {
    for (let iter = 0; iter < numericalProperties.length; iter++) {
      if (numericalProperties[iter][Object.keys(numericalProperties[iter])[0]] < 0) {
        return response.status(422).json({ error: `${Object.keys(numericalProperties[iter])[0]} must be a positive number` });
      }
    }
    return null;
  };

  const checkEmptyString = (stringProperties) => {
    stringProperties.forEach((stringProperty) => {
      if (request.body[Object.keys(stringProperty)[0]] === '') {
        return response.status(422).json({ error: `${Object.keys(stringProperty)[0]} cannot be an empty string.` });
      }
      return null;
    });
  };

  const checkUniqueNumber = (number) => {
    database('players').where('number', number).select()
      .then((numberInUse) => {
        if (numberInUse.length) {
          return response.status(422).json({ error: `Player number ${number} is already in use.` });
        }
        return null;
      });
  };

  const checkPosition = (position) => {
    if (!position) {
      return response.status(422).json({ error: "You are missing the 'position' property" });
    }
    if (position.length < 1 || position.length > 2) {
      return response.status(422).json({ error: 'Invalid position. position must be between 1 and 2 characters in length.' });
    }
    return null;
  };

  checkPositives([
    { number: request.body.number },
    { age: request.body.age },
    { weight: request.body.weight }]);
  checkEmptyString([
    { name: request.body.name },
    { position: request.body.position },
    { height: request.body.height },
    { experience: request.body.experience },
    { college: request.body.college }]);
  checkUniqueNumber(request.body.number);
  checkPosition(request.body.position);
  next();
  return null;
};

const checkAuth = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];

  if (!token) {
    return response.status(403).json({ error: 'You must be authorized to access this endpoint.' });
  }
  const verified = jwt.verify(token, app.get('secretKey'));

  if (verified.admin) {
    next();
  } else {
    return response.status(403).json({ error: 'You must be authorized to access this endpoint.' });
  }
  return null;
};

app.use(express.static(path.join(__dirname, '/public')));

app.post('/api/v1/authenticate', (request, response) => {
  const { email } = request.body;

  for (const requiredParameter of ['email', 'appName']) {
    if (!request.body[requiredParameter]) {
      return response.send(422).json({ error: `You are missing the '${requiredParameter}' property` });
    }
  }

  const admin = email.endsWith('@turing.io');
  const token = jwt.sign({ admin }, app.get('secretKey'));
  return response.status(200).json({ token });
});

app.get('/api/v1/teams', (request, response) => {
  const queryParameter = Object.keys(request.query)[0];
  const queryParameterValue = request.query[queryParameter];

  if (!queryParameter) {
    database('teams').select()
      .then(teams => response.status(200).json({ teams }))
      .catch(error => response.status(500).json({ error }));
  } else {
    database('teams').where(queryParameter.toLowerCase(), queryParameterValue.toLowerCase()).select()
      .then((team) => {
        if (!team.length) {
          return response.status(404).json({ error: `Could not find any team associated with '${queryParameter}' of '${queryParameterValue}'` });
        }
        return response.status(200).json({ team: team[0] });
      })
      .catch(error => response.status(500).json({ error }));
  }
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('teams').where('id', request.params.id).select()
    .then((team) => {
      if (team.length) {
        return response.status(200).json({ team: team[0] });
      }
      return response.status(404).json({ error: `Could not find any team associated with id ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams', checkAuth, cleanTeam, (request, response) => {
  const { name, city } = request.body;
  const team = { name, city };

  for (const requiredParameter of ['city', 'name']) {
    if (!team[requiredParameter]) {
      return response.status(422).json({ error: `You are missing the '${requiredParameter}' property` });
    }
  }

  database('teams').insert(team, 'id')
    .then(insertedTeam => response.status(201).json({ id: insertedTeam[0] }))
    .catch(error => response.status(500).json({ error }));

  return null;
});

app.patch('/api/v1/teams/:id', checkAuth, cleanTeam, (request, response) => {
  const teamID = request.params.id;
  const { city, name } = request.body;
  const body = { city, name };

  database('teams').where('id', teamID).update(body, '*')
    .then((team) => {
      if (!team.length) {
        return response.status(404).json({ error: `Could not find any team associated with team_id ${request.params.id}` });
      }
      return response.status(202).json({ team: team[0] });
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/teams/:id', checkAuth, (request, response) => {
  const teamID = request.params.id;

  database('teams').where('id', teamID).del()
    .then(() => response.status(204).json({ teamID }))
    .catch(() => response.status(404).json({ error: `Could not find team with id '${teamID}'` }));
});

app.get('/api/v1/players', (request, response) => {
  const queryParameter = Object.keys(request.query)[0];
  const queryParameterValue = request.query[queryParameter];

  if (!queryParameter) {
    database('players').select()
      .then(players => response.status(200).json({ players }))
      .catch(error => response.status(500).json({ error }));
  } else {
    database('players').where(queryParameter.toLowerCase(), queryParameterValue).select()
      .then((players) => {
        if (!players.length) {
          return response.status(404).json({ error: `Could not find any player associated with '${queryParameter}' of '${queryParameterValue}'` });
        }
        return response.status(200).json({ players });
      })
      .catch(error => response.status(500).json({ error }));
  }
});

app.get('/api/v1/players/:id', (request, response) => {
  database('players').where('id', request.params.id).select()
    .then((player) => {
      if (player.length) {
        return response.status(200).json({ player: player[0] });
      }
      return response.status(404).json({ error: `Could not find any player associated with id ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:id/players', (request, response) => {
  database('players').where('team_id', request.params.id).select()
    .then((players) => {
      if (players.length) {
        return response.status(200).json({ players });
      }
      return response.status(404).json({ error: `Could not find any players with a team_id of ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:teamID/players/:playerID', (request, response) => {
  database('players').where('team_id', request.params.teamID).where('id', request.params.playerID).select()
    .then((player) => {
      if (player.length) {
        return response.status(200).json({ player });
      }
      return response.status(404).json({ error: `Could not find any player associated with team_id ${request.params.teamID} and id ${request.params.playerID}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams/:id/players', checkAuth, cleanPlayer, (request, response) => {
  const {
    number, name, position, age, height, weight, experience, college,
  } = request.body;
  let player = {
    number, name, position: position.toUpperCase(), age, height, weight, experience, college,
  };
  const { id } = request.params;

  for (const requiredParameter of ['number', 'name', 'position', 'age', 'height', 'weight', 'experience', 'college']) {
    if (!player[requiredParameter]) {
      return response.status(422).json({ error: `You are missing the '${requiredParameter}' property` });
    }
  }
  player = Object.assign({}, player, { team_id: id });
  database('players').insert(player, 'id')
    .then(insertedPlayer => response.status(201).json({ id: insertedPlayer[0] }))
    .catch(error => response.status(500).json({ error }));

  return null;
});

app.patch('/api/v1/teams/:teamID/players/:playerID', checkAuth, cleanPlayer, (request, response) => {
  const { playerID } = request.params;
  const {
    number, name, position, age, height, weight, experience, college,
  } = request.body;
  const body = {
    number, name, position, age, height, weight, experience, college,
  };

  database('players').where('id', playerID).update(body, '*')
    .then((player) => {
      if (!player.length) {
        return response.status(404).json({ error: `Could not find any player associated with team_id ${request.params.teamID} and id ${request.params.playerID}` });
      }
      return response.status(202).json({ player: player[0] });
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/teams/:teamID/players/:playerID', checkAuth, (request, response) => {
  const { playerID } = request.params;

  database('players').where('id', playerID).del()
    .then(() => response.status(204).json({ playerID }))
    .catch(() => response.status(404).json({ error: `Could not find player with id '${playerID}'` }));
});

app.use((request, response) => response.status(404).send("404: Sorry can't find that!"));


app.use((error, request, response) => {
  console.error(error.stack);
  return response.status(500).send('Something broke!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;
