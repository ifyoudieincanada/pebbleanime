/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var animeList = buildAnimeList();
  animeList.show();

  animeList.on('select', function(e) {
    var epList = buildEpisodeList();
    epList.show();
  });
}

function buildAnimeList() {
  var animeList = new UI.Menu({
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
  return animeList;
}

function buildEpisodeList() {
  episodeList = new UI.Menu({
    sections: [{
      items: [{
        title: 'Episode #1',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description
      }, {
        title: 'Episode #2',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description
      },{
        title: 'Episode #3',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description
      }, {
        title: 'Episode #4',
        icon: 'images/menu_icon.png',
        subtitle: 'Brief description
      }]
    }]
  });

  return episodeList;
}

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
