/* ------ REQUIRE LIBRARIES ------ */

console.log('requiring system libraries');
var UI = require('ui');

console.log('requiring custom libraries');
var url = require('url');
var animAjax = require('animajax');

/* ------ ANIME OBJECT ------ */

var anime = {

  Anime : function(animObj, listObj, lists, options) {
    console.log('New Anime object created');

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
    var animeObj = this;

    var retryCount = 0;

    this.fetch = function() {
      // use localStorage
      // convert data from string
      console.log('fill ajax_payload and other variables with data');
    };

    this.store = function() {
      // use localStorage
      // convert data to string (probably with JSON.stringify())
      console.log('save ajax_payload and other variables to pebble');
    };

    this.statusOptions = function() {
      console.log('Determining which status options to show');

      var optionMap = {
        increment: {
          title: '+',
          icon: 'images/plus.png',
          subtitle: 'increments progress',
          func: function() {
            animeObj.increment();
          }
        },
        decrement: {
          title: '-',
          icon: 'images/minus.png',
          subtitle: 'decrements progress',
          func: function() {
            animeObj.decrement();
          }
        },
        progress: {
          title: 'Progress',
          icon: 'images/progress.png',
          subtitle: 'epsWatched/totEps',
          func: function() {
            animeObj.progress();
          }
        },
        rate: {
          title: 'Rating',
          icon: 'images/rating.png',
          subtitle: 'current rating',
          func: function() {
            animeObj.rate();
          }
        },
        remove: {
          title: 'Remove',
          icon: 'images/remove.png',
          subtitle: 'removes anime from list',
          func: function() {
            animeObj.remove();
          }
        },
        rewatch: {
          title: 'Rewatch',
          icon: 'images/rewatch.png',
          subtitle: 'moves to rewatch list',
          func: function() {
            animeObj.rewatch();
          }
        }
      };
      var i;

      var uiList = [];

      for (i = 0; i < options.lenth; i++) {
        uiList.push(optionMap[options[i]]);
      }

      return uiList;
    };

    this.increment = function() {
      console.log('Calling increment');
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
      console.log('Calling decrement');
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
      console.log('Calling progress');
      // Show list UI from 1 to episodes
      var i;
      var epList = [];

      for (i = 1; i <= episodes; i++) {
        epList.push({
          title: i
        });
      }

      console.log('building episode UI');
      var episodeUI =  new UI.Menu({
        suctions: [{
          items: epList
        }]
      });
      console.log('showing episode UI');
      episodeUI.show();

      episodeUI.on('select', function(e) {
        var selectedEp = e.menu.state.sections[0].items[e.itemIndex];
        var currentEp = ajax_payload.episode;
        ajax_payload.episode = selectedEp.title;

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
      console.log('Calling rate');
      // Show list UI from 1 to 10
      var i;
      var scoreList = [];

      for (i = 1; i <= 10; i++) {
        scoreList.push({
          title: i
        });
      }

      console.log('building score UI');
      var scoreUI =  new UI.Menu({
        suctions: [{
          items: scoreList
        }]
      });
      console.log('showing score UI');
      scoreUI.show();

      scoreUI.on('select', function(e) {
        var selectedScore = e.menu.state.sections[0].items[e.itemIndex];
        var currentScore = ajax_payload.score;
        ajax_payload.score = selectedScore.title;

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
      console.log('calling remove');
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

    this.rewatch = function() {
      console.log('calling rewatch');
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
};

this.exports = anime;
