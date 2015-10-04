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

    this.setAnimeList = function(listOfAnime) {
      console.log('setting anime list');
      var formattedAnimes = [];
      var i;

      for (i = 0; i < listOfAnime.length; i++) {
        formattedAnimes.push({
          title: listOfAnime[i].series_title,
          icon: 'images/menu_icon.png',
          animeObj: new anime.Anime(listOfAnime[i], aListObj, aListObj.list, options)
        });
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

    this.storeData = function() { // This uses the pebble's stored data
      if (animArray) {
        console.log('stores data using: ' + name);
      }
      // Error out
    };

    this.fetchData = function() { // This uses the pebble's stored data
      console.log('fetches data using: ' + name);
      // Fills animArray with stored data, must handle no-data event
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
