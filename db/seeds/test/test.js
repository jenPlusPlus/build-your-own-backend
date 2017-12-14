const teams = require('../../../scrape/nfl-players');
const teamAbbreviations = Object.keys(teams);

exports.seed = (knex, Promise) => {
  return knex('players').del()
    .then(() => knex('teams').del())
    .then(() =>{
      return Promise.all([
        knex('teams').insert([
          { 
            id: 1,
            city: "arizona",
            name: "cardinals" 
          },
          { 
            id: 2,
            city: "atlanta",
            name: "falcons" 
          },
          { 
            id: 3,
            city: "baltimore",
            name: "ravens" 
          },
          { 
            id: 4,
            city: "buffalo",
            name: "buffalo" 
          },
          { 
            id: 5,
            city: "carolina",
            name: "panthers" 
          },
          { 
            id: 6,
            city: "chicago",
            name: "bears" 
          },
          { 
            id: 7,
            city: "cincinnati",
            name: "bengals" 
          },
          { 
            id: 8,
            city: "cleveland",
            name: "browns" 
          },
          { 
            id: 9,
            city: "dallas",
            name: "cowboys" 
          },
          { 
            id: 10,
            city: "denver",
            name: "broncos" 
          }
        ]).then(() => {
          return knex('players').insert([
            {
              id: 1,
              team_id: 4,
              age: 28,
              college: "Virginia Tech",
              experience: "7",
              height: "6-1",
              name: "Tyrod Tayler",
              number: 5,
              position: "QB",
              weight: 215
            },
            {
              id: 2,
              team_id: 7,
              age: 29,
              college: "Georgia",
              experience: 7,
              height: "6-4",
              name: "A.J. Green",
              number: 18,
              position: "WR",
              weight: 210
            },
            {
              id: 3,
              team_id: 1,
              age: 37,
              college: "USC",
              experience: 15,
              height: "6-5",
              name: "Carson Palmer",
              number: 3,
              position: "QB",
              weight: 235
            },
            {
              id: 4,
              team_id: 2,
              age: 28,
              college: "Alabama",
              experience: 7,
              height: 6-3,
              name: "Julio Jones",
              number: 11,
              position: "WR",
              weight: 220
            },
            {
              id: 5,
              team_id: 3,
              age: 35,
              college: "Arizona State",
              experience: 15,
              height: 6-3,
              name: "Terrell Suggs",
              number: 55,
              position: "LB",
              weight: 265
            },
            {
              id: 6,
              team_id: 5,
              age: 21,
              college: "Stanford",
              experience: "R",
              height: 5-11,
              name: "Christian McCaffrey",
              number: 22,
              position: "RB",
              weight: 205
            },
            {
              id: 7,
              team_id: 6,
              age: 23,
              college: "Indiana",
              experience: 2,
              height: 6-0,
              name: "Jordan Howard",
              number: 24,
              position: "RB",
              weight: 224
            },
            {
              id: 8,
              team_id: 8,
              age: 26,
              college: "Utah",
              experience: 3,
              height: 6-3,
              name: "Josh Gordon",
              number: 12,
              position: "WR",
              weight: 225
            },
            {
              id: 9,
              team_id: 9,
              age: 22,
              college: "Ohio State",
              experience: 2,
              height: 6-0,
              name: "Ezekiel Elliott",
              number: 21,
              position: "RB",
              weight: 228
            },
            {
              id: 10,
              team_id: 10,
              age: 28,
              college: "Texas A&M",
              experience: 7,
              height: 6-3,
              name: "Von Miller",
              number: 58,
              position: "LB",
              weight: 250
            }
          ])
        })
        .catch()
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};