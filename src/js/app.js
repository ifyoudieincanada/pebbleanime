/* ------ REQUIRE LIBRARIES -------- */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

/* ------ ANIME LIST CODE -------- */

function formatAnimes(animeList) {
  var formatted_animes = [];

  var i;
  for (i = 0; i < animeList.length; i++) {
    console.log('iteration: ' + i);

    formatted_animes[i] = {
      title: 'placeholder #' + i,
      icon: 'images/menu_icon.png',
      subtitle: 'description #' + i
    };
  }
  return formatted_animes;
}

function getAnimes() {
  // AJAX CALL IN THIS FUNCTION
  return formatAnimes([{
    title: 'test 1',
    icon: 'images/menu_icon.png',
    subtitle: 'Brief description'
  }, {
    title: 'test 2',
    icon: 'images/menu_icon.png',
    subtitle: 'Another description'
  }]);
}

function buildAnimeList() {
  return new UI.Menu({
    sections: [{
      items: getAnimes()
    }]
  });
}

/* ------ EPISODE LIST CODE -------- */

function formatEpisodes(episodeList) {
  var formatted_episodes = [];

  var i;
  for (i = 0; i < episodeList.length; i++) {
    console.log('iteration: ' + i);

    formatted_episodes[i] = {
      title: 'placeholder #' + i,
      icon: 'images/menu_icon.png',
      subtitle: 'description #' + i
    };
  }
  return formatted_episodes;
}

function getEpisodes(index) {
  // AJAX CALL IN THIS FUNCTION
  return formatEpisodes([]);
}

function buildEpisodeList(index) {
  return new UI.Menu({
    sections: [{
      items: getEpisodes(index)
    }]
  });
}

/* ------ MAIN CODE -------- */

var main = buildAnimeList();
main.show();

main.on('select', function(e) {
  console.log('selected: ' + e.itemIndex);
  var epList = buildEpisodeList(e.itemIndex);
  epList.show();
});

/* ------ SAMPLE CODE -------- */

/*
 * main.on('click', 'up', function(e) {
 *   var menu = new UI.Menu({
 *     sections: [{
 *       items: [{
 *         title: 'Pebble.js',
 *         icon: 'images/menu_icon.png',
 *         subtitle: 'Can do Menus'
 *       }, {
 *         title: 'Second Item',
 *         subtitle: 'Subtitle Text'
 *       }]
 *     }]
 *   });
 *   menu.on('select', function(e) {
 *     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
 *     console.log('The item is titled "' + e.item.title + '"');
 *   });
 *   menu.show();
 * });
 * 
 * main.on('click', 'select', function(e) {
 *   var wind = new UI.Window({
 *     fullscreen: true,
 *   });
 *   var textfield = new UI.Text({
 *     position: new Vector2(0, 65),
 *     size: new Vector2(144, 30),
 *     font: 'gothic-24-bold',
 *     text: 'Text Anywhere!',
 *     textAlign: 'center'
 *   });
 *   wind.add(textfield);
 *   wind.show();
 * });
 * 
 * main.on('click', 'down', function(e) {
 *   var card = new UI.Card();
 *   card.title('A Card');
 *   card.subtitle('Is a Window');
 *   card.body('The simplest window type in Pebble.js.');
 *   card.show();
 * });
 */ 
