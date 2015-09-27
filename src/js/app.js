/* ------ REQUIRE LIBRARIES -------- */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Settings = require('settings'); //Caitlin

/* ------ GLOBAL ARRAYS ------ */

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

/* ------ Test ------ */

var Base64 = {
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = Base64._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  },
  // public method for decoding
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = Base64._utf8_decode(output);
    return output;
  },
  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    var n;
    var c;
    for (n = 0; n < string.length; n++) {
      c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    //        var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
};

/* ------ AJAX STUFF ------ */

function animAjaxPost(destination, options, success, error) {
  ajax({
    url:    'http://10.33.80.112:3000', // Translator URL
    method: 'post',
    type:   'json',
    async:  false,
    headers: {
      Authorization: "Basic " + Base64.encode(Settings.option('Login') + ":" + Settings.option('password')),
    },
    data: {
      // MyAnimeList data
      site_data: {
        episode:             options.episode,
        status:              options.status,
        score:               options.score,
        downloaded_episodes: options.downloaded,
        storage_type:        options.store_type,
        storage_values:      options.store_values,
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
    url:    'http://10.33.80.112:3000', // Translator URL
    method: 'post',
    type:   'json',
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

function formatAnimes(animeList, which) {
  console.log('log3');

  var animeMap = ['1', '3', '2', '6', '4']; // [watching, on-hold, completed, plan to watch, dropped]

  var formatted_animes = [];
  var i;
  for (i = 0; i < animeList.length; i++) {
    if (animeMap[which] === animeList[i].my_status) {
      formatted_animes.push({
        title: animeList[i].series_title,
        icon: 'images/menu_icon.png',
        subtitle: animeList[i].series_synonyms,
        anime_id: animeList[i].series_animedb_id
      });
    }
  }
  return formatted_animes;
}

function getAnimes(which, callback) {
  // AJAX CALL IN THIS FUNCTION
  // index determines the specific list you are getting

  var user = 'balrog95';
  var url = 'http://myanimelist.net/malappinfo.php?u=' + user + '&status=all&type=anime';

  animAjaxGet(url, function(data) {
    console.log('success');

    var uiElem = new UI.Menu({
      sections: [{
        items: formatAnimes(data.myanimelist.anime, which)
      }]
    });

    callback(uiElem);

  }, function(error) {
    console.log('error: ' + error);
  });

  console.log('log4');
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

  getAnimes(e.itemIndex, function(uiElem) {
    uiElem.show();

    uiElem.on('select', function(f){
      var statOptions = statusOptions(e.itemIndex);
      statOptions.show();

      console.log('log11');

      statOptions.on('select', function(g){
        console.log('unused block');
      });
    });
  });
});
