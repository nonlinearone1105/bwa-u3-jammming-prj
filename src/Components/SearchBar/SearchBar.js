//Import React
import React from 'react';

//Import stylesheet
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    //Bind methods
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //Pass user's search term to App's search method
  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  //Change search term to match new input
  handleTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
               onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
