const teams = require('../../../scrape/nfl-players');
const teamAbbreviations = Object.keys(teams); 

const createTeam = (knex, team) => {
  return knex('teams').insert({
    city: team.city,
    name: team.name
  }, 'id')
    .then(teamID => {
      let playerPromises = [];

      team.players.forEach( (player, index) => {
        playerPromises.push(
          createPlayer(knex, {
            team_id: teamID[0],
            number: parseInt(player.number, 10),
            name: player.name,
            position: player.position,
            age: parseInt(player.age, 10),
            height: player.height,
            weight: parseInt(player.weight, 10),
            experience: player.experience,
            college: player.college 
          })
        )
      });

      return Promise.all(playerPromises);
    });
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player);
};

exports.seed = (knex, Promise) => {
  return knex('players').del()
    .then(() => knex('teams').del() )
      .then(() => {
        let teamPromises = [];

        teamAbbreviations.forEach( abbreviation => {
          teamPromises.push(createTeam(knex, teams[abbreviation]));
        })
        console.log('SUCCESSFUL SEED');
        return Promise.all(teamPromises);
      })
    .catch(error => console.log(`Error seeding data: ${error}`));
};