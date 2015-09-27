/*
EXAMPLE JSON OBJECT TO SEND IN AJAX (I think)

ajax(
{
  url: 'http://10.33.80.112:3000', // Translator URL
  method: 'post',
  type: 'json',
  async: false,
  headers: {
    // Note, Base64.encode comes from `https://github.com/pastukhov/pebticz/blob/master/src/app.js`
    Authorization: "Basic " + Base64.encode(Settings.option('Login') + ":" + Settings.option('password')),
  },
  data: {
    // MyAnimeList data
    episode: 11,
    status: 1,
    score: 7,
    downloaded_episodes: '',
    storage_type: '',
    storage_values: '',
    times_rewatched: '',
    rewatch_value: '',
    date_start: '',
    date_finish: '',
    priority: '',
    enable_discussion: '',
    enable_rewatching: '',
    comments: '',
    fansub_group: '',
    tags: '',

    // Translator data
    destination: 'http://myanimelist.net/api/animelist/add/21.xml'
  }
}
*/


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

/* ----- WATCHING STATUS OPTIONS -----*/

function getWatchingStatus(){
  return [{
    title: '+',
    icon: 'images/menue_icon.png',
    subtitle: 'increments progress'
  } ,{
    title: '-',
    icon: 'images/menue_icon.png',
    subtitle: 'decrements progress'
  } ,{
    title: 'Progress',
    icon: 'images/menue_icon.png',
    subtitle: 'epsWatched/totEps'
  }, {
    title: 'Rating',
    icon: 'images/menue_icon.png',
    subtitle: 'current rating'
  }, {
    title: 'Remove',
    icon: 'images/menue_icon.png'
  }];
}

/* ------ STATUS OPTIONS ------ */

function statusOptions(){
  return new UI.Menu({
    sections: [{
      items: getWatchingStatus()
    }]
  }); 
}

/* ------ MAIN CODE -------- */

var main = buildAnimeList();
main.show();

main.on('select', function(e) {
  console.log('selected: ' + e.itemIndex);
  var epList = statusOptions();
  // var epList = buildEpisodeList(e.itemIndex);
  epList.show();
});
