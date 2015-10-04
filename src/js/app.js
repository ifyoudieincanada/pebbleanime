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

var animeListStrings = ['watching', 'hold', 'completed', 'plan', 'dropped'];

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

var MAINLIST=  [{
  title: 'Watching',
  icon: 'images/watching.png',
  subtitle: 'Currently watching anime',
  actionName: 'watching'
}, {
  title: 'On hold',
  icon: 'images/hold.png',
  subtitle: 'Anime put on hold',
  actionName: 'hold'
}, {
  title: 'Completed',
  icon: 'images/complete.png',
  subtitle: 'Completed anime',
  actionName: 'completed'
}, {
  title: 'Dropped',
  icon: 'images/dropped.png',
  subtitle: 'Dropped anime',
  actionName: 'dropped'
}, {
  title: 'Plan to watch',
  icon: 'images/planned.png',
  subtitle: 'Anime you want to watch',
  actionName: 'plan'
}];

/* ------ MAIN FUNCTION ------ */

function main() {
  var i;

  for (i = 0; i < animeListStrings.length; i++) {
    animeLists[animeListStrings[i]].list = animeLists;
  }

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
    console.log('selected: ' + e.actionName);

    var aListUI = new UI.Menu({
      suctions: [{
        items: animeLists[e.actionName].getTenMore()
      }]
    });
    aListUI.show();

    aListUI.on('select', function(f) {
      console.log('show options' + f);

      var animeOptsUI = new UI.menu({
        sections: [{
          items: f.animeObj.statusOptions()
        }]
      });
      animeOptsUI.show();

      animeOptsUI.on('select', function(g) {
        g.func();
      });
    });
  });
}

/* ------ MAIN CODE -------- */

main();

