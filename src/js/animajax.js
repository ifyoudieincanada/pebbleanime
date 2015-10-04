/* ------ REQUIRE LIBRARIES ------ */

var ajax = require('ajax');
var base64 = require('base64');
var Settings = require('settings');

/* ------ AJAX STUFF ------ */

function animAjaxPost(destination, options, success, error) {
  ajax({
    url:    'http://dank.software:3000', // Translator URL
    method: 'post',
    type:   'json',
    async:  false,
    headers: {
      Authorization: "Basic " + base64.Base64.encode(Settings.option('Login') + ":" + Settings.option('password')),
    },
    data: {
      // MyAnimeList data
      site_data: {
        episode:             options.episode,
        status:              options.status,
        score:               options.score,
        downloaded_episodes: options.downloaded_episodes,
        storage_type:        options.storage_type,
        storage_values:      options.storage_values,
        times_rewatched:     options.times_rewatched,
        rewatch_value:       options.rewatch_value,
        date_start:          options.date_start,
        date_finish:         options.date_finish,
        priority:            options.priority,
        enable_discussion:   '',
        enable_rewatching:   options.enable_rewatching,
        comments:            '',
        fansub_group:        options.fansub_group,
        tags:                ''
      },

      // Translator data
      req_type: 'post',
      destination:         destination
    }
  },
  function(data) {
    success(data);
  },
  function(err) {
    error(err);
  });
}

function animAjaxGet(destination, success, error) {
  ajax({
    url:    'http://dank.software:3000', // Translator URL
    method: 'post',
    type:   'json',
    headers: {
      Authorization: "Basic " + base64.Base64.encode(Settings.option('login') + ":" + Settings.option('password')),
    },
    data: {
      site_data:   {},
      req_type: 'get',
      destination: destination
    }
  },
  function(data) {
    success(data);
  },
  function(err) {
    error(err);
  });
}

