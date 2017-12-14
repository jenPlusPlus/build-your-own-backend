const express = require('express');
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

const checkAuth = (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];

  if(!token) {
    return response.status(403).json({error: 'You must be authorized to access this endpoint.'});
  } else {
    const verified = jwt.verify(token, app.get('secretKey'))

    if (verified.admin) {
      next();
    } else {
      return response.status(403).json({error: 'You must be authorized to access this endpoint.'})
    }
  }
}

app.post('/authenticate', (request, response) => {
  const { email, appName } = request.body;

  // rendundant check for required parameters
  for (let requiredParameter of ['email', 'appName']) {
    if (!request.body[requiredParameter]) {
      return response.status(422).json({ error: `You are missing the '${requiredParameter}' property` });
    };
  };

  const admin = email.endsWith('@turing.io');
  const token = jwt.sign({ admin }, app.get('secretKey'));
  return response.status(200).json({ token });
});

app.get('/', (request, response) => {
  response.send('it works!!');
});

app.get('/api/v1/teams', checkAuth, (request, response) => {
  const queryParameter = Object.keys(request.query)[0];
  const queryParameterValue = request.query[queryParameter];

  if (!queryParameter) {
    database('teams').select()
      .then(teams => response.status(200).json({ teams }))
      .catch(error => response.status(500).json({ error }));
  } else {
    database('teams').where(queryParameter, queryParameterValue).select()
      .then(team => {
        if(!team.length){
          return response.status(404).json({ error: `Could not find any team associated with '${queryParameter}' of '${queryParameterValue}'` });
        }
        return response.status(200).json({ team });
      })
      .catch(error => response.status(500).json({ error }));
  }
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('teams').where('id', request.params.id).select()
    .then(team => {
      if(team.length){
        return response.status(200).json({ team });
      }
      return response.status(404).json({ error: `Could not find any team associated with id ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams', checkAuth, (request, response) => {
  let team = request.body;

  for (let requiredParameter of ['city', 'name']) {
    if (!team[requiredParameter]) {
      return response.status(422).json({ error: `You are missing the '${requiredParameter}' property` });
    };
  };

  database('teams').insert(team, 'id')
    .then(team => response.status(201).json({ team }))
    .catch(error => response.status(500).json({ error }))
});

app.patch('/api/v1/teams/:id', checkAuth, (request, response) => {
  const teamID = request.params.id;
  const body = request.body;

  database('teams').where('id', teamID).update(body, '*')
    .then(team => {
      if (!team.length) {
        return response.status(404).json({ error: `Could not find any team associated with team_id ${request.params.id}` });
      }
      return response.status(202).json({ team: team[0] });
    })
    .catch(error => response.status(500).json({ error }));
})

app.delete('/api/v1/teams/:id', checkAuth, (request, response) => {
  const teamID = request.params.id;

  database('teams').where('id', teamID).del()
    .then(() => response.status(204).json({ teamID }))
    .catch(error => response.status(404).json({error: `Could not find team with id '${teamID}'`}));
});

app.get('/api/v1/players', (request, response) => {
  const queryParameter = Object.keys(request.query)[0];
  const queryParameterValue = request.query[queryParameter];

  if(!queryParameter){
    database('players').select()
      .then(players => response.status(200).json({ players }))
      .catch(error => response.status(500).json({ error }));
  } else {
    database('players').where(queryParameter, queryParameterValue).select()
      .then(player => {
        if(!player.length){
          return response.status(404).json({ error: `Could not find any player associated with '${queryParameter}' of '${queryParameterValue}'` });
        }
        return response.status(200).json({ player });
      })
      .catch(error => response.status(500).json({ error }));
  }
});

app.get('/api/v1/players/:id', (request, response) => {
  database('players').where('id', request.params.id).select()
    .then(player => {
      if(player.length){
        return response.status(200).json({ player });
      }
      return response.status(404).json({ error: `Could not find any player associated with id ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:id/players', (request,response) => {
  database('players').where('team_id', request.params.id).select()
    .then(players => {
      if(players.length){
        return response.status(200).json({ players });
      }
      return response.status(404).json({ error: `Could not find any players with a team_id of ${request.params.id}`});
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:teamID/players/:playerID', (request, response) => {
  database('players').where('team_id', request.params.teamID).where('id', request.params.playerID).select()
    .then(player => {
      if(player.length){
        return response.status(200).json({ player });
      }
      return response.status(404).json({ error: `Could not find any player associated with team_id ${request.params.teamID} and id ${request.params.playerID}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams/:id/players', checkAuth, (request, response) => {
  let player = request.body;
  const id = request.params.id;

  for (let requiredParameter of ['number', 'name', 'position', 'age', 'height', 'weight', 'experience', 'college']) {
    if (!player[requiredParameter]) {
      return response.status(422).json({ error: `You are missing the '${requiredParameter}' property` });
    };
  };

  if(player.number < 0){
   return response.status(422).json({ error: `number must be a positive number` });
  } else if (player.age < 0) {
    return response.status(422).json({ error: `age must be a positive number` });
  } else if (player.weight < 0) {
    return response.status(422).json({ error: `weight must be a positive number` });
  }

  player = Object.assign({}, player, { team_id: id });

  database('players').insert(player, 'id')
    .then(player => response.status(201).json({ player }))
    .catch(error => response.status(500).json({ error }))
});

app.patch('/api/v1/teams/:teamID/players/:playerID', (request, response) => {
  const { teamID, playerID } = request.params;
  const body = request.body;

  database('players').where('id', playerID).update(body, '*')
    .then(player => {
      if (!player.length) {
        return response.status(404).json({ error: `Could not find any player associated with team_id ${request.params.teamID} and id ${request.params.playerID}` });
      }
      return response.status(202).json({ player: player[0] });
    })
    .catch(error => response.status(500).json({ error }));
})

app.delete('/api/v1/teams/:teamID/players/:playerID', (request, response) => {
  const { teamID, playerID } = request.params;

  database('players').where('id', playerID).del()
    .then(() => response.status(204).json({ playerID }))
    .catch(error => response.status(404).json({error: `Could not find player with id '${playerID}'`}));
});

app.use(function (request, response, next) {
  return response.status(404).send("404: Sorry can't find that!");
});

app.use(function (error, request, response, next) {
  console.error(error.stack);
  return response.status(500).send('Something broke!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});
