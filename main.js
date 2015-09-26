var ajax = require('ajax'); // ajax object
var UI   = require('ui'); // UI object

var splashCard = new UI.Card({ // creates card to display fullscreen
  title: "Please wait",
  body: "downloading..."
});

splashCard.show(); // displays card

var URL = 'asonix.dog'; // this is where the API url should be placed

ajax(
  {
    url: URL,
    type: 'json'
  },
  function(json) {
    // json variable is data returned from server
    console.log(json);
  },
  function(error) {
    // error returned from server or lack thereof
    console.log('Ajax failed: ' + error);
  }
);

function showList(jsArray) {
  var resultsMenu = new UI.Menu({
    sections: [{
      title: 'Episodes',
      items: jsArray
    }]
  });

  resultsMenu.show();
  splashCard.hide();
}
