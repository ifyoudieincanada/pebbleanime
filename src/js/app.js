/* ------ REQUIRE LIBRARIES -------- */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var OPTIONS = 
  [{
    title: '+',
    icon: 'images/menu_icon.png',
    subtitle: 'increments progress'
  } ,{
    title: '-',
    icon: 'images/menu_icon.png',
    subtitle: 'decrements progress'
  } ,{
    title: 'Progress',
    icon: 'images/menu_icon.png',
    subtitle: 'epsWatched/totEps'
  }, {
    title: 'Rating',
    icon: 'images/menu_icon.png',
    subtitle: 'current rating'
  }, {
    title: 'Remove',
    icon: 'images/menu_icon.png',
    subtitle: 'removes anime from lsit'
  }, {
    title: 'Rewatch',
    icon: 'images/menu_icon.png',
    subtitle: 'moves anime to watching list and sets status to rewatching'
  }, {
    title: 'Episodes',
    icon: 'images/menu_icon.png',
    subtitile: 'Lists all episodes'
  }];

var MAINLIST=  [{
    title: 'Watching',
    icon: 'images/menu_icon.png',
    subtitle: 'Currently watching anime'
  }, {
    title: 'On hold',
    icon: 'images/menu_icon.png',
    subtitle: 'Anime put on hold'
  }, {
    title: 'Completed',
    icon: 'images/menu_icon.png',
    subtitle: 'Completed anime'
  }, {
    title: 'Plan to watch',
    icon: 'images/menu_icon.png',
    subtitle: 'Anime you want to watch'
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

/* ------ ANIME LIST CODE -------- */
//To be called when getting anime from every sub-category

function formatAnimes(animeList) {
  console.log('log3');
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

function getAnimes(index) {
  console.log('log4');
  // AJAX CALL IN THIS FUNCTION
  // index determines the specific list you are getting
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

function buildAnimeList(index) {
  console.log('log5');
  return new UI.Menu({
    sections: [{
      items: getAnimes(index)
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

function getStatusList(index){
  console.log('log10');
  switch(index){
   case 0: return getWatchingOptions();
   case 1: return getOnHoldOptions();
   case 2: return getCompletedOptions();
   case 3: return getPlanToWatchOptions();
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

/* ------ MAIN CODE -------- */

var main = buildMainList();
main.show();

main.on('select', function(e) {
  console.log('selected: ' + e.itemIndex);
  var animeList=buildAnimeList(e.itemIndex);
  animeList.show();

  animeList.on('select', function(f){
   var statOptions = statusOptions(e.itemIndex);
   statOptions.show();

   console.log('log11');

   statOptions.on('select', function(g){
     console.log('unused block');
   });
  });
});
