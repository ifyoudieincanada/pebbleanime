/* ------ REQUIRE LIBRARIES -------- */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Settings = require('settings'); //Caitlin
var AnimeList = require('animelist');
var URL = require('url');
var animAjax = require('animajax');

/* ------ ANIME LISTS ------ */

var animeLists = {
  watching:  new AnimeList.AnimeList('watching'),
  hold:      new AnimeList.AnimeList('on-hold'),
  completed: new AnimeList.AnimeList('completed'),
  plan:      new AnimeList.AnimeList('plan-to-watch'),
  dropped:   new AnimeList.AnimeList('dropped')
};

/* ------ ANIME LIST INTERACTIONS ------ */

function setAnime(list) {
  var i;
  var watching = [];
  var hold = [];
  var completed = [];
  var plan = [];
  var dropped = [];

  for (i = 0; i < list.length; i++) {
    if (list[i].series_animedb_id === '1') {
      watching.push(list[i]);
    } else if (list[i].series_animedb_id === '3') {
      hold.push(list[i]);
    } else if (list[i].series_animedb_id === '2') {
      completed.push(list[i]);
    } else if (list[i].series_animedb_id === '6') {
      plan.push(list[i]);
    } else if (list[i].series_animedb_id === '4') {
      dropped.push(list[i]);
    }
  }

  animeLists.watching.setAnimeList(watching);
  animeLists.hold.setAnimeList(hold);
  animeLists.completed.setAnimeList(completed);
  animeLists.plan.setAnimeList(plan);
  animeLists.dropped.setAnimeList(dropped);
}

function getStoredAnime() {
  animeLists.watching.fetchData();
  animeLists.hold.fetchData();
  animeLists.completed.fetchData();
  animeLists.plan.fetchData();
  animeLists.dropped.fetchData();
}

/* ------ GLOBAL ARRAYS ------ */

var OPTIONS =
[{
  title: '+',
  icon: 'images/plus.png',
  subtitle: 'increments progress',
  opt_id: 0
} ,{
  title: '-',
  icon: 'images/minus.png',
  subtitle: 'decrements progress',
  opt_id: 1
} ,{
  title: 'Progress',
  icon: 'images/progress.png',
  subtitle: 'epsWatched/totEps',
  opt_id: 2
}, {
  title: 'Rating',
  icon: 'images/rating.png',
  subtitle: 'current rating',
  opt_id: 3
}, {
  title: 'Remove',
  icon: 'images/remove.png',
  subtitle: 'removes anime from lsit',
  opt_id: 4
}, {
  title: 'Rewatch',
  icon: 'images/rewatch.png',
  subtitle: 'moves anime to watching list and sets status to rewatching',
  opt_id: 5
}, {
  title: 'Episodes',
  icon: 'images/episodes.png',
  subtitile: 'Lists all episodes',
  opt_id: 6
}];

var MAINLIST=  [{
  title: 'Watching',
  icon: 'images/watching.png',
  subtitle: 'Currently watching anime',
  action_name: 'watching'
}, {
  title: 'On hold',
  icon: 'images/hold.png',
  subtitle: 'Anime put on hold',
  action_name: 'hold'
}, {
  title: 'Completed',
  icon: 'images/complete.png',
  subtitle: 'Completed anime',
  action_name: 'completed'
}, {
  title: 'Dropped',
  icon: 'images/dropped.png',
  subtitle: 'Dropped anime',
  action_name: 'dropped'
}, {
  title: 'Plan to watch',
  icon: 'images/planned.png',
  subtitle: 'Anime you want to watch',
  action_name: 'plan'
}];


/* ------ Main List ------*/

function getMainElements(){
  console.log('log3');
  return MAINLIST;
}

function buildMainList(){
  console.log('log2');
  return new UI.Menu({
    sections: [{
      items: getMainElements()
    }]
  });
}

/* ------ EPISODE LIST CODE -------- */

function formatEpisodes(episodeList) {
  console.log('log6');
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
  console.log(index);
  console.log('log7');
  // AJAX CALL IN THIS FUNCTION
  return formatEpisodes([]);
}

function buildEpisodeList(index) {
  console.log('log8');
  return new UI.Menu({
    sections: [{
      items: getEpisodes(index)
    }]
  });
}

/* ------ ANIME LIST CODE -------- */
//To be called when getting anime from every sub-category

function formatAnimes(animeList, which) {
  console.log('log3');

  var animeMap = ['1', '3', '2', '6', '4']; // [watching, on-hold, completed, plan to watch, dropped]

  var formatted_animes = [];
  var i;
  for (i = 0; i < animeList.length; i++) {
    if (animeMap[which] === animeList[i].my_status) {
      formatted_animes.push({
        title: animeList[i].series_title,
        icon: 'images/menu_icon.png',
        subtitle: animeList[i].series_synonyms,
        anime_id: animeList[i].series_animedb_id
      });
    }
  }
  return formatted_animes;
}

function getAnimes(which, callback) {
  // index determines the specific list you are getting

  var user = Settings.option('login');
  var url = URL.getAnimeUrl(user);

  animAjax.animAjaxGet(url, function(data) {
    console.log('success');

    var uiElem = new UI.Menu({
      sections: [{
        items: formatAnimes(data.myanimelist.anime, which)
      }]
    });

    callback(uiElem);

  }, function(error) {
    console.log('error: ' + error);
  });

  console.log('log4');
}

/* ----- RATE LIST ----*/

function getRateElements(){
  var nums= [];
  var i;
  for(i = 0; i<=10; i++){
    nums.push(i);
  }
}

function buildRateList() {
 return new UI.Menu({
  sections: [{
    items: getRateElements()
  }]
 });
}

/* ----- STATUS OPTIONS -----*/

function getOptions(args){
  console.log('log9');
  var opts= [];
  var i;
  for(i = 0; i<args.length; i++){
    opts.push(OPTIONS[args[i]]);
  }
  return opts;
}

function getWatchingOptions(){
  return getOptions([0,1,2,3,4,6]);
}

function getOnHoldOptions(){
  return getOptions([2,3,4,6]);
}

function getCompletedOptions(){
  return getOptions([3,4,5,6]);
}

function getPlanToWatchOptions(){
  return getOptions([0,4,6]);
}

function getDroppedOptions(){
  return getOptions([1,3,4,6]);
}


function getStatusList(index){
  console.log('log10');
  switch(index){
    case 0: return getWatchingOptions();
    case 1: return getOnHoldOptions();
    case 2: return getCompletedOptions();
    case 3: return getPlanToWatchOptions();
    case 4: return getDroppedOptions();
  }
}

/* ------ STATUS OPTIONS ------ */

function statusOptions(index){
  console.log('log11');
  return new UI.Menu({
    sections: [{
      items: getStatusList(index)
    }]
  });
}

/* ------ MAIN FUNCTION ------ */

function main() {

  var user = Settings.option('login');
  var url = URL.getAnimeUrl(user);

  animAjax.animAjaxGet(url, function(data) {
    console.log('success');
    setAnime(data.myanimelist.anime);

  }, function(error) {
    console.log('error: ' + error);
    getStoredAnime();

  });

  var mainUI = new UI.Menu({
    sections: [{
      items: MAINLIST
    }]
  });
  mainUI.show();

  mainUI.on('select', function(e) {
    console.log('selected: ' + e.action_name);

    var aListUI = new UI.Menu({
      suctions: [{
        items: animeLists[e.action_name].getTenMore()
      }]
    });
    aListUI.show();

    aListUI.on('select', function(e) {
      console.log('selected: ' + e.anime_id);
      // animeOptions(g, e.anime_id);
    });
  });
}

/* ------ MAIN CODE -------- */

main();
