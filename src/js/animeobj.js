/* ------ REQUIRE LIBRARIES ------ */

var UI = require('ui');
var url = require('url');
var animAjax = require('animAjax');

/* ------ ANIME OBJECT ------ */

function Anime(animObj, listObj, lists) {
  var ajax_payload = {
    episode:             animObj.my_watched_episodes,
    status:              animObj.my_status,
    score:               animObj.my_score,
    downloaded_episodes: '',
    storage_type:        '',
    storage_values:      '',
    times_rewatched:     animObj.my_rewatching,
    rewatch_value:       '',
    date_start:          animObj.my_start_date,
    date_finish:         animObj.my_finish_date,
    priority:            '',
    enable_discussion:   '',
    enable_rewatching:   '',
    comments:            '',
    fansub_group:        '',
    tags:                animObj.my_tags
  };

  var id = animObj.series_animedb_id;
  var episodes = animObj.series_episodes;

  var retryCount = 0;

  this.fetch = function() {
    console.log('fill ajax_payload and other variables with data');
  };

  this.store = function() {
    console.log('save ajax_payload and other variables to pebble');
  };

  this.increment = function() {
    // Increment the number of episodes watched
    if (ajax_payload.episode < episodes -1+1) { // -1+1 to make sure comparing Ints
      ajax_payload.episode -= 1;
      ajax_payload.episode += 2;
    }

    if (ajax_payload.episode === episodes -1+1) {
      lists.completed.addAnime(listObj.removeAnime(id));
    }

    function contact() {
      animAjax.animAjaxPost(url.updateAnimeUrl(id), ajax_payload, function(data) {
        console.log('success' + data);
        retryCount = 0;
      }, function(error) {
        console.log('error: ' + error);

        if (retryCount < 3) {
          retryCount += 1;

          setTimeout(function() {
            console.log('Retrying remote increment');

            contact();
          }, 500);
        } else {
          console.log('Giving up');
          retryCount = 0;
        }
      });
    }

    contact();
  };

  this.decrement = function() {
    // Decrement the number of episodes watched
    if (ajax_payload.episode > 1) { // -1+1 to make sure comparing Ints
      ajax_payload.episode -= 1;
    }

    function contact() {
      animAjax.animAjaxPost(url.updateAnimeUrl(id), ajax_payload, function(data) {
        console.log('success' + data);
        retryCount = 0;
      }, function(error) {
        console.log('error: ' + error);

        if (retryCount < 3) {
          retryCount += 1;

          setTimeout(function() {
            console.log('Retrying remote decrement');

            contact();
          }, 500);
        } else {
          console.log('Giving up');
          retryCount = 0;
        }
      });
    }

    contact();
  };

  this.progress = function() {
    // Show list UI from 1 to episodes
    var i;
    var epList = [];

    for (i = 1; i <= episodes; i++) {
      epList.push({
        title: i
      });
    }

    var episodeUI =  new UI.Menu({
      suctions: [{
        items: epList
      }]
    });

    episodeUI.show();

    episodeUI.on('select', function(e) {
      var currentEp = ajax_payload.episode;
      ajax_payload.episode = e.title;

      function contact() {
        animAjax.animAjaxPost(url.updateAnimeUrl(id), ajax_payload, function(data) {
          console.log('success' + data);
          retryCount = 0;
          episodeUI.remove();
        }, function(error) {
          console.log('error: ' + error);

          if (retryCount < 3) {
            retryCount += 1;

            setTimeout(function() {
              console.log('Retrying remote progress');

              contact();
            }, 500);
          } else {
            console.log('Giving up');
            retryCount = 0;
            ajax_payload.episode = currentEp;
            episodeUI.remove();
          }
        });
      }

      contact();
    });
  };

  this.rate = function() {
    // Show list UI from 1 to 10
    var i;
    var scoreList = [];

    for (i = 1; i <= 10; i++) {
      scoreList.push({
        title: i
      });
    }

    var scoreUI =  new UI.Menu({
      suctions: [{
        items: scoreList
      }]
    });

    scoreUI.show();

    scoreUI.on('select', function(e) {
      var currentScore = ajax_payload.score;
      ajax_payload.score = e.title;

      function contact() {
        animAjax.animAjaxPost(url.updateAnimeUrl(id), ajax_payload, function(data) {
          console.log('success' + data);
          retryCount = 0;
          scoreUI.remove();
        }, function(error) {
          console.log('error: ' + error);

          if (retryCount < 3) {
            retryCount += 1;

            setTimeout(function() {
              console.log('Retrying remote progress');

              contact();
            }, 500);
          } else {
            console.log('Giving up');
            retryCount = 0;
            ajax_payload.score = currentScore;
            scoreUI.remove();
          }
        });
      }

      contact();
    });
  };

  this.remove = function() {
    listObj.removeAnime(id);

    function contact() {
      animAjax.animAjaxPost(url.deleteAnimeUrl(id), ajax_payload, function(data) {
        console.log('success' + data);
        retryCount = 0;
      }, function(error) {
        console.log('error: ' + error);

        if (retryCount < 3) {
          retryCount += 1;

          setTimeout(function() {
            console.log('Retrying remote decrement');

            contact();
          }, 500);
        } else {
          console.log('Giving up');
          retryCount = 0;
        }
      });
    }

    contact();
  };

  this.animeRewatch = function() {
    lists.watching.addAnime(listObj.removeAnime(id));
    ajax_payload.enable_rewatching = '1';

    function contact() {
      animAjax.animAjaxPost(url.updateAnimeUrl(id), ajax_payload, function(data) {
        console.log('success' + data);
        retryCount = 0;
      }, function(error) {
        console.log('error: ' + error);

        if (retryCount < 3) {
          retryCount += 1;

          setTimeout(function() {
            console.log('Retrying remote increment');

            contact();
          }, 500);
        } else {
          console.log('Giving up');
          retryCount = 0;
        }
      });
    }

    contact();
  };
}

