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
  database('teams').where('id', request.params.id).select()
    .then(team => {
      if(team.length){
        return response.status(200).json({ team });
      }
      return response.status(404).json({ error: `Could not find any team associated with id ${request.params.id}` });
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams', (request, response) => {
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

app.patch('/api/v1/teams/:id', (request, response) => {
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

app.delete('/api/v1/teams/:id', (request, response) => {
  const teamID = request.params.id;

  database('teams').where('id', teamID).del()
    .then(() => {
      return response.status(204).json({ teamID });
    })
    .catch(error => response.status(404).json({error: `Could not find team with id '${teamID}'`}));
});

// player resources

app.get('/api/v1/players', (request, response) => {
  database('players').select()
    .then(players => response.status(200).json({ players }))
    .catch(error => response.status(500).json({ error }));
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

app.post('/api/v1/teams/:id/players', (request, response) => {
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
  const teamID = request.params.teamID;
  const playerID = request.params.playerID;
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
  const teamID = request.params.teamID;
  const playerID = request.params.playerID;

  database('players').where('id', playerID).del()
    .then(() => response.status(204).json({ playerID }))
    .catch(error => response.status(404).json({error: `Could not find player with id '${playerID}'`}));
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
