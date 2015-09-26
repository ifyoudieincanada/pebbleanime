/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

function buildAnimeList() {
  return new UI.Menu({
    sections: [{
      items: [{
        title: 'Anime #1',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description'
      }, {
        title: 'Anime #2',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description'
      }]
    }]
  });
}

function getEpisodes(index) {
  return [];
}

function buildEpisodeList(index) {
  var episodes = getEpisodes(index);
  var formatted_episodes = [];

  var i;
  for (i = 0; i < episodes.length; i++) {
    formatted_episodes[i] = {
      title: 'placeholder #' + i,
      icon: 'images/menu_icon.png',
      subtitle: 'description #' + i
    };
  }

  return new UI.Menu({
    sections: [{
      items: formatted_episodes
    }]
  });
}

var main = buildAnimeList();
main.show();

main.on('select', function(e) {
  var epList = buildEpisodeList(e.itemIndex);
  epList.show();
});

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
