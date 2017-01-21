var rp = require('request-promise'); 

var userId = '<USER-ID>';
var clientId = '<CLIENT-ID>';
var clientSecret = '<CLIENT-SECRET>';
var refreshToken = '<REFRESH-TOKEN>';
var discoverId = '<DISCOVER-PLAYLIST-ID>';
var targetId = '<ARCHIVE-PLAYLIST-ID>';

var AUTH_URL = 'https://accounts.spotify.com/api/token';
var BASE_URL = 'https://api.spotify.com/v1/users/';
var auth, req;

// Get an access token from the Accounts endpoint
auth = {
	method: 'POST',
	url: AUTH_URL,
	headers: {'Authorization': 'Basic ' + (new Buffer(clientId + ':' +
						clientSecret).toString('base64')) },
	form: {
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	},
	json: true
};

// Extract all song URIs from the Discover Weekly playlist
var getURIs = function(response) {
	var uris = [];
	response = JSON.parse(response);

	for (i=0; i < response.items.length; i++){
		uris.push(response.items[i].track.uri);
	}
	return uris;
};

rp(auth)
	.then(function (response){

		console.log('Connected with Spotify \nArchiving Discover Weekly');

		// Get all songs from the Web API Endpoint
		req = {
			url: BASE_URL + 'spotifydiscover/playlists/' + discoverId + '/tracks',
			headers: { 'Authorization': 'Bearer ' + response.access_token},
		}

		return rp(req);

	}).then(function (response){

		// Add all song URIs to the target playlist
		var uris = getURIs(response);
		req.method = 'POST';
		req.url = BASE_URL + userId + '/playlists/' + targetId + '/tracks';
		req.body = uris;
		req.json = true;

		return rp(req);

	}).then(function (response){

		// Success with a HTTP 2xx response
		console.log('- - -\nSUCCESS. Playlist archived.');

	}).catch(function (err) {

		err = JSON.parse(err.response.body);
		console.log('Failed to archive!\nReason (' + err.error.status + '): ' +
								err.error.message);
	});