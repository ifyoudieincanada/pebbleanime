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
    var directList;

    // Public

    this.name = name;
    this.options = {};
    this.list = '';

    this.setAnimeList = function(listOfAnime, fetch) {
      console.log('setting anime list');

      directList = listOfAnime;

      var formattedAnimes = [];
      var i;
      var currentAnime;

      for (i = 0; i < listOfAnime.length; i++) {
        currentAnime = {
          title: listOfAnime[i].series_title,
          icon: 'images/menu_icon.png',
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

        for (i = 0; i < 10; i++) {
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
      if (directList) {
        console.log('stores data using: ' + name);

        localStorage.setItem('alist_' + name, JSON.stringify(directList));

        // NOTE: avoid storing directlist by storing titles, icons, ids, call store() on each Anime

        return;
      }
      // Error out
    };

    this.fetch = function() { // This uses the pebble's stored data
      // Fills animArray with stored data, must handle no-data event
      console.log('fetches data using: ' + name);

      var storedData = localStorage.getItem('alist_' + name);

      aListObj.setAnimeList(storedData, true);

      // NOTE: avoid fetching directlist by passing { series_animedb_id: id } and calling fetch() for each Anime

    };

    this.reset = function() {
      console.log('reset called');
      fedNumber = 0;
    };

    this.addAnime = function(animeObjList) {
      console.log('addAnime called');

      if (animArray) {
        animArray.push(animeObjList[0]);
        directList.push(animeObjList[1]);
      }
      // Error out
    };

    this.removeAnime = function(animeDatabaseID) {
      console.log('removeAnime called');
      var i;
      var dListAnime;

      if (animArray) {
        for (i = 0; i < directList.length; i++) {
          if (directList[i].series_animedb_id === animeDatabaseID) {
            dListAnime = directList.splice(i, 1);
            break;
          }
        }

        for (i = 0; i < animArray.length; i++) {
          if (animArray[i].anime_id === animeDatabaseID) {
            return [animArray.splice(i, 1), dListAnime];
          }
        }
      }
      // If it got here it did not find the anime to delete
      // Error out
    };
  }
};

this.exports = animelist;
