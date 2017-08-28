//Import React
import React from 'react';

//Import required components
import Track from '../Track/Track';

//Import stylesheet
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => <Track track={track}
                                               key={track.id}
                                               onAdd={this.props.onAdd}
                                               onRemove={this.props.onRemove}
                                               isRemoval={this.props.isRemoval}/>)}
      </div>
    );
  }
}

export default TrackList;
