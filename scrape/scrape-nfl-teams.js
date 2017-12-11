var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
const fs = require('fs');

nightmare
  .goto('http://www.espn.com/nfl/players')
  .wait(1000)
  .end()
  .evaluate( () => {
    let tableRows = document.querySelectorAll('.small-logos li');
    let tableData = [];
    for (let i=0; i<tableRows.length; i++) {
      let team = tableRows[i].innerText.replace(/\n/g, '').slice(1);
      tableData.push({team});
    }
    return tableData;
  })
  .then((result) => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./nfl-teams.json', output, 'utf8', (err) => {
      if (err) { return console.error(err) }
    })

    console.log('File was saved.')
  })
  .catch((error) => {
    console.error('Search failed:', error);
  });
