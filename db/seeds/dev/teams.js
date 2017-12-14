const teams = require('../../../scrape/nfl-players');

const teamAbbreviations = Object.keys(teams);

const createPlayer = (knex, player) => knex('players').insert(player);


const createTeam = (knex, team) =>
  knex('teams').insert({
    city: team.city,
    name: team.name,
  }, 'id')
    .then((teamID) => {
      const playerPromises = [];

      team.players.forEach((player) => {
        playerPromises.push(createPlayer(knex, {
          team_id: teamID[0],
          number: parseInt(player.number, 10),
          name: player.name,
          position: player.position,
          age: parseInt(player.age, 10),
          height: player.height,
          weight: parseInt(player.weight, 10),
          experience: player.experience,
          college: player.college,
        }));
      });

      return Promise.all(playerPromises);
    });

exports.seed = (knex, Promise) =>
  knex('players').del()
    .then(() => knex('teams').del())
    .then(() => {
      const teamPromises = [];

      teamAbbreviations.forEach((abbreviation) => {
        teamPromises.push(createTeam(knex, teams[abbreviation]));
      });
      return Promise.all(teamPromises);
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log(`Error seeding data: ${error}`));
