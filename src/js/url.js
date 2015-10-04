/* ------ API URLs ------ */

function getAnimeUrl(username) {
  return 'http://myanimelist.net/malappinfo.php?u=' + username + '&status=all&type=anime';
}

function updateAnimeUrl(id) {
  return  'http://myanimelist.net/api/animelist/update/' + id + '.xml';
}

function deleteAnimeUrl(id) {
  return 'http://myanimelist.net/api/animelist/delete/' + id + '.xml';
}

