var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
const fs = require('fs');

const rosterUrls = [
  "http://www.espn.com/nfl/team/roster/_/name/buf/buffalo-bills",
  "http://www.espn.com/nfl/team/roster/_/name/mia/miami-dolphins",
  "http://www.espn.com/nfl/team/roster/_/name/ne/new-england-patriots",
  "http://www.espn.com/nfl/team/roster/_/name/nyj/new-york-jets",
  "http://www.espn.com/nfl/team/roster/_/name/dal/dallas-cowboys",
  "http://www.espn.com/nfl/team/roster/_/name/nyg/new-york-giants",
  "http://www.espn.com/nfl/team/roster/_/name/phi/philadelphia-eagles",
  "http://www.espn.com/nfl/team/roster/_/name/wsh/washington-redskins",
  "http://www.espn.com/nfl/team/roster/_/name/den/denver-broncos",
  "http://www.espn.com/nfl/team/roster/_/name/kc/kansas-city-chiefs",
  "http://www.espn.com/nfl/team/roster/_/name/lac/los-angeles-chargers",
  "http://www.espn.com/nfl/team/roster/_/name/oak/oakland-raiders",
  "http://www.espn.com/nfl/team/roster/_/name/ari/arizona-cardinals",
  "http://www.espn.com/nfl/team/roster/_/name/lar/los-angeles-rams",
  "http://www.espn.com/nfl/team/roster/_/name/sf/san-francisco-49ers",
  "http://www.espn.com/nfl/team/roster/_/name/sea/seattle-seahawks",
  "http://www.espn.com/nfl/team/roster/_/name/bal/baltimore-ravens",
  "http://www.espn.com/nfl/team/roster/_/name/cin/cincinnati-bengals",
  "http://www.espn.com/nfl/team/roster/_/name/cle/cleveland-browns",
  "http://www.espn.com/nfl/team/roster/_/name/pit/pittsburgh-steelers",
  "http://www.espn.com/nfl/team/roster/_/name/chi/chicago-bears",
  "http://www.espn.com/nfl/team/roster/_/name/det/detroit-lions",
  "http://www.espn.com/nfl/team/roster/_/name/gb/green-bay-packers",
  "http://www.espn.com/nfl/team/roster/_/name/min/minnesota-vikings",
  "http://www.espn.com/nfl/team/roster/_/name/hou/houston-texans",
  "http://www.espn.com/nfl/team/roster/_/name/ind/indianapolis-colts",
  "http://www.espn.com/nfl/team/roster/_/name/jax/jacksonville-jaguars",
  "http://www.espn.com/nfl/team/roster/_/name/ten/tennessee-titans",
  "http://www.espn.com/nfl/team/roster/_/name/atl/atlanta-falcons",
  "http://www.espn.com/nfl/team/roster/_/name/car/carolina-panthers",
  "http://www.espn.com/nfl/team/roster/_/name/no/new-orleans-saints",
  "http://www.espn.com/nfl/team/roster/_/name/tb/tampa-bay-buccaneers"
];

nightmare
  .goto(rosterUrls[24])
  .wait(1000)
  .evaluate(() => {
    let tableRows = document.querySelectorAll('.oddrow, .evenrow');
    let tableData = [];
    for (let i=0; i<tableRows.length; i++) {
      let player = tableRows[i].querySelectorAll('td');
      let number = player[0].innerText;
      let name = player[1].innerText;
      let position = player[2].innerText;
      let age = player[3].innerText;
      let height = player[4].innerText;
      let weight = player[5].innerText;
      let experience = player[6].innerText;
      let college = player[7].innerText;
      tableData.push({name, number, position, age, height, weight, experience, college})
    }
    return tableData;
  })
  .end()
  .then((result) => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./nfl-players-24.json', output, 'utf8', (err) => {
      if (err) { return console.error(err) }
    })

    console.log('File was saved.')
  })
  .catch((error) => {
    console.error('Search failed:', error);
  });
