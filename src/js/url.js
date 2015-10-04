/* ------ API URLs ------ */

var url = {
  getAnimeUrl : function(username) {
    return 'http://myanimelist.net/malappinfo.php?u=' + username + '&status=all&type=anime';
  },

  updateAnimeUrl : function(id) {
    return  'http://myanimelist.net/api/animelist/update/' + id + '.xml';
  },

  deleteAnimeUrl : function(id) {
    return 'http://myanimelist.net/api/animelist/delete/' + id + '.xml';
  }
};

this.exports = url;
