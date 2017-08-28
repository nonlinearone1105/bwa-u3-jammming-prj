//Import React
import React from 'react';

//Import necessary components
import TrackList from '../TrackList/TrackList';

//Import stylesheet
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    //Bind method
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //Pass new playlist name to App's updatePlaylistName method
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}
               onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks}
                   onRemove={this.props.onRemove}
                   isRemoval={true}/>
        <a className="Playlist-save"
           onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
