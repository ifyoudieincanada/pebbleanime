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
