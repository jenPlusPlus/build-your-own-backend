var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('http://www.espn.com/nfl/players')
  .wait(1000)
  .click('.small-logos li div a')
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

    fs.writeFile('./nfl-players.json', output, 'utf8', (err) => {
      if (err) { return console.error(err) }
    })

    console.log('File was saved.')
  })
  .catch((error) => {
    console.error('Search failed:', error);
  });
