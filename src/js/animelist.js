/* ------ REQUIRE LIBRARIES ------ */

console.log('requiring Anime object');
var anime = require('animeobj');

/* ------ LIST OBJECT ------ */

var animelist = {

  AnimeList : function(name, options) {
    console.log('New AnimeList object created');

    // Private
    var fedNumber = 0;
    var animArray = false;
    var aListObj = this;

    // Public

    this.name = name;
    this.options = {};
    this.list = '';

    this.setAnimeList = function(listOfAnime, fetch) {
      console.log('setting anime list');

      var formattedAnimes = [];
      var i;
      var currentAnime;

      for (i = 0; i < listOfAnime.length; i++) {
        currentAnime = {
          title: listOfAnime[i].series_title,
          icon: 'images/menu_icon.png',
          id: listOfAnime[i].series_animedb_id,
          animeObj: new anime.Anime(listOfAnime[i], aListObj, aListObj.list, options)
        };

        if (fetch) {
          currentAnime.animeObj.fetch();
        } else {
          currentAnime.animeObj.store();
        }

        formattedAnimes.push(currentAnime);
      }

      animArray = formattedAnimes;
    };

    this.getTenMore = function() {
      console.log('getting 10 more animes for list UI');
      if (animArray) {
        var retList = [];
        var i;

        for (i = 0; i < 10; i += 1) {
          if (fedNumber + i < animArray.length) {
            retList.push(animArray[fedNumber + i]);
          }
        }

        fedNumber += 10;

        return retList;
      }
      // Error out
    };

    this.store = function() { // This uses the pebble's stored data
      if (animArray) {
        console.log('stores data using: ' + name);
        var i;
        var storedList = [];

        for (i = 0; i < animArray.length; i += 1) {
          storedList.push({
            series_title: animArray[i].title,
            series_animedb_id: animArray[i].id
          });

          animArray[i].animeObj.store();

          if (i % 100 === 0 && i !== 0) {
            localStorage.setItem('alist_' + name + '_' + i/100, JSON.stringify(storedList));
            storedList = [];
          }
        }

        return;
      }
      // Error out
    };

    this.fetch = function() { // This uses the pebble's stored data
      // Fills animArray with stored data, must handle no-data event
      console.log('fetches data using: ' + name);
      var i;
      var storedData = [];
      var currentData;

      for (i = 0; i < 50; i += 1) {
        currentData = localStorage.getItem('alist_' + name + '_' + i);
        if (currentData) {
          storedData += currentData;
        } else {
          break;
        }
      }

      if (storedData) {
        aListObj.setAnimeList(JSON.parse(storedData), true);
        return;
      }
      // Error out

    };

    this.reset = function() {
      console.log('reset called');
      fedNumber = 0;
    };

    this.addAnime = function(animeObj) {
      console.log('addAnime called');

      if (animArray) {
        animArray.push(animeObj);
      }
      // Error out
    };

    this.removeAnime = function(animeDatabaseID) {
      console.log('removeAnime called');
      var i;

      if (animArray) {
        for (i = 0; i < animArray.length; i++) {
          if (animArray[i].anime_id === animeDatabaseID) {
            return animArray.splice(i, 1);
          }
        }
      }
      // If it got here it did not find the anime to delete
      // Error out
    };
  }
};

this.exports = animelist;
