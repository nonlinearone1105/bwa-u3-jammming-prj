//Import React
import React from 'react';

//Import stylesheet
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    //Bind methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  //Display a + if the track is not in the playlist, display a - if the track is in the playlist
  renderAction() {
    if(this.props.isRemoval) {
      return <a className="Track-action"
                onClick={this.removeTrack}>-</a>;
    }
    return <a className="Track-action"
              onClick={this.addTrack}>+</a>;
  }

  //Pass track to be added TrackList so it will get back to App's addTrack method
  addTrack(e) {
    this.props.onAdd(this.props.track);
  }

  //Pass track to be removed to TrackList so it will get back to App's removeTrack method
  removeTrack(e) {
    this.props.onRemove(this.props.track);
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
