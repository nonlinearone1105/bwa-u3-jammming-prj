const clientId = "7b880a76648c4009ad79e3c535b1c5da";
const redirectUri = "http://nifty-clocks.surge.sh";

let accessToken;

const Spotify = {
  //Retrieve an access token from Spotify
  getAccessToken() {
    //Return access token if one is already stored
    if(accessToken) {
      return accessToken;
    }
    //Retrieve access token from URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    //Retrieve expire time from URL
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //Proceed if access token and expire time are found
    if(accessTokenMatch && expiresInMatch) {
      //Store access token
      accessToken = accessTokenMatch[1];
      //Store expire time
      const expiresIn = Number(expiresInMatch[1]);
      //Clear access token after timeout so a new one can be requested
      window.setTimeout(() => accessToken = "", expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }
    // Redirect user to login page so an access token can be retrieved, then bring them back to Jammming
    else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  //Search for user's input
  search(searchTerm) {
    //Retrieve access token
    accessToken = Spotify.getAccessToken();
    //Send search to Spotify API
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        //Return empty array if no results found
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        //Return an object for each search result
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  //Save playlist to user's Spotify account
  savePlaylist(playlistName, trackUris) {
    //Exit if playlist is unnammed or there are no tracks in the playlist
    if(!playlistName || !trackUris.length) {
      console.log("Something is missing!");
      return;
    }
    //Retrieve access token
    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;

    //Request user's username from Spotify
    return fetch("https://api.spotify.com/v1/me", {
      headers: headers
    }).then(response => response.json()).then(jsonResponse => {
      //Store username
      userId = jsonResponse.id;
      //Send playlist to Spotify
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()).then(jsonResponse => {
        //Store playlist ID
        const playlistId = jsonResponse.id;
        //Send tracks in playlist to Spotify
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
