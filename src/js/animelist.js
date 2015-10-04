/* ------ REQUIRE LIBRARIES ------ */

var anime = require('anime');

/* ------ LIST OBJECT ------ */

function AnimeList(name) {
  // Private
  var fedNumber = 0;
  var animArray = false;

  // Public

  this.name = name;

  this.setAnimeList = function(listOfAnime) {
    var formattedAnimes = [];
    var i;

    for (i = 0; i < listOfAnime.length; i++) {
      formattedAnimes.push({
        title: listOfAnime[i].series_title,
        icon: 'images/menu_icon.png',
        animeObj: new anime.Anime(listOfAnime[i])
      });
    }

    animArray = formattedAnimes;
  };

  this.getTenMore = function() {
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
    fedNumber = 0;
  };

  this.addAnime = function(animeObj) {
    if (animArray) {
      animArray.push(animeObj);
    }
    // Error out
  };

  this.removeAnime = function(animeDatabaseID) {
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

