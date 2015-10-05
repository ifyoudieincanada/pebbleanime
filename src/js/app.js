/* ------ REQUIRE LIBRARIES -------- */

console.log('SYSTEM REQUIRES');

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Settings = require('settings'); //Caitlin

console.log('CUSTOM REQUIRES');

var AnimeList = require('animelist');
var URL = require('url');
var animAjax = require('animajax');

/* ------ ANIME LISTS ------ */

console.log('about to create animeLists object');

var animeLists = {
  watching:  new AnimeList.AnimeList('watching'),
  hold:      new AnimeList.AnimeList('on-hold'),
  completed: new AnimeList.AnimeList('completed'),
  plan:      new AnimeList.AnimeList('plan-to-watch'),
  dropped:   new AnimeList.AnimeList('dropped')
};

var animeListStrings = ['watching', 'hold', 'completed', 'plan', 'dropped'];

console.log('created animeLists object');

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

console.log('created MAINLIST');

/* ------ ANIME LIST INTERACTIONS ------ */

function setAnime(list) {
  var i;
  var watching = [];
  var hold = [];
  var completed = [];
  var plan = [];
  var dropped = [];

  console.log('sorting list into different list objects');

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

  console.log('anime sorted');
}

function getStoredAnime() {
  console.log('fetching list objects from storage');

  animeLists.watching.fetchData();
  animeLists.hold.fetchData();
  animeLists.completed.fetchData();
  animeLists.plan.fetchData();
  animeLists.dropped.fetchData();

  console.log('list objects fetched');
}

function getUsername() {
  var u = localStorage.getItem('settings_username');
  if (u) {
    console.log('found stored username: ' + u);
    return u;
  }
  console.log('username not stored, ask user to configure app');
  // TELL THE USER TO CONFIGURE THE APP
}

/* ------ MAIN FUNCTION ------ */

function main() {
  console.log('running main');
  var i;

  for (i = 0; i < animeListStrings.length; i++) {
    animeLists[animeListStrings[i]].list = animeLists;
  }
  console.log('each anime list can reference lists object');

  var user = getUsername();
  var url = URL.getAnimeUrl(user);

  console.log('launching ajax get for user: ' + user);
  console.log('URL: ' + url);

  animAjax.animAjaxGet(url, function(data) {
    console.log('success');
    setAnime(data.myanimelist.anime);

  }, function(error) {
    console.log('error: ' + error);
    getStoredAnime();

  });

  console.log('building main UI');
  var mainUI = new UI.Menu({
    sections: [{
      items: MAINLIST
    }]
  });
  console.log('showing main UI');
  mainUI.show();

  mainUI.on('select', function(e) {
    var mainItem = e.menu.state.sections[0].items[e.itemIndex];
    console.log(JSON.stringify(mainItem));

    console.log('building anime list UI');
    var aListUI = new UI.Menu({
      suctions: [{
        items: animeLists[mainItem.actionName].getTenMore()
      }]
    });
    console.log('showing anime list UI');
    aListUI.show();

    aListUI.on('select', function(f) {
      var aListItem = f.menu.state.sections[0].items[f.itemIndex];
      console.log('show options for: ' + aListItem.title);

      console.log('building anime options UI');
      var animeOptsUI = new UI.menu({
        sections: [{
          items: aListItem.animeObj.statusOptions()
        }]
      });
      console.log('showing anime options UI');
      animeOptsUI.show();

      animeOptsUI.on('select', function(g) {
        var animeItem = g.menu.state.sections[0].items[f.itemIndex];
        console.log('selected item: ' + animeItem.title);

        animeItem.func();
      });
    });
  });
}

/* ------ MAIN CODE -------- */

console.log('about to run main');
main();

