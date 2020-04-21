import React, {Component} from "react";
import './GlobalSearch.css';
class GlobalSearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () =>
      this.globalSearch()
    );
        
  };

  globalSearch = () => {
    let filteredData = [];
    let { searchInput } = this.state;

    console.log('Global component: ', searchInput);
    

        filteredData= this.props.data.filter(value => {
          return (
            (value.title && value.title.toLowerCase().includes(searchInput.toLowerCase())) ||
            (value.url && value.url.toLowerCase().includes(searchInput.toLowerCase()) )||
            (value.author && value.author.toLowerCase().includes(searchInput.toLowerCase()))
          );
        });

    this.props.handleSetData(filteredData);
  };

  render() {
    return (
      <>
        <br />
        <input
          size="large"
          name="searchInput"
          value={this.state.searchInput}
          onChange={this.handleChange}
          label="Search" placeholder="Search URL, Title or Author...."
        />
        <br />
        <br />
      </>
    );
  }
}

export default GlobalSearchComp;