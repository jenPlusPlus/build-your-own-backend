/* eslint no-plusplus: 0 */
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: false });
const fs = require('fs');

nightmare
  .goto('http://www.espn.com/nfl/players')
  .wait(1000)
  .end()
  .evaluate(() => {
    const tableRows = document.querySelectorAll('.small-logos li');
    const tableData = [];
    for (let i = 0; i < tableRows.length; i++) {
      const team = tableRows[i].innerText.replace(/\n/g, '').slice(1);
      tableData.push({ team });
    }
    return tableData;
  })
  .then((result) => {
    const output = JSON.stringify(result, null, 2);

    fs.writeFile('./nfl-teams.json', output, 'utf8', (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        return console.error(err);
      }
      return null;
    });
    // eslint-disable-next-line no-console
    console.log('File was saved.');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Search failed:', error);
  });
