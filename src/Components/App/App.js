//Import React
import React, { Component } from 'react';

//Import stylesheet
import './App.css';

//Import needed app components
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    //Set initial states
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    //Bind methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //Add a new track to the playlist
  addTrack(track) {
    //Retrieve tracks currently in the playlist
    let tracks = this.state.playlistTracks;
    //Add new track to the end of the existing playlist
    tracks.push(track);
    //Reset state to represent new playlist
    this.setState({
      playlistTracks: tracks
    });
  }

  //Remove a track from the playlist
  removeTrack(track) {
    //Retrieve tracks currently in the playlist
    let tracks = this.state.playlistTracks;
    //Filter the playlist to only include songs that do not match the song selected for removal
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    //Reset state to represent new playlist
    this.setState({
      playlistTracks: tracks
    });
  }

  //Change the name of the playlist
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  //Save a new playlist to user's Spotify account
  savePlaylist() {
    //Create an array of URIs to send to Spotify
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    //Call Spotify savePlaylist function
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      //Reset state so a new playlist can be created
      this.setState({
        playlistName: "New Playlist",
        searchResults: []
      });
    });
  }

  //Search user's term
  search(searchTerm) {
    //Pass user's search term to Spotify search function
    Spotify.search(searchTerm).then(searchResults => {
      //Store results in state
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                          onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks = {this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
