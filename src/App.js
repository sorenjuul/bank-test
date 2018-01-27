import React, { Component } from "react";
import "./App.css";
import { searchFlickr } from "./api";
import { getImageUrls } from "./helper";
import { size } from "lodash";

class App extends Component {
  state = {
    search: "",
    page: 1,
    imageUrls: [],
    loading: false
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
    console.log(event.target.value);
  };

  searchImages = async page => {
    const { search } = this.state;
    this.setState({ loading: true });
    const data = await searchFlickr(search, page);
    const imageUrls = getImageUrls(data);
    this.setState({
      imageUrls,
      loading: false,
      page
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.searchImages(this.state.page);
  };

  forward = () => {
    let { page } = this.state;
    this.searchImages(++page);
  };
  back = () => {
    let { page } = this.state;
    this.searchImages(page > 0 ? --page : 0);
  };

  render() {
    const { search, imageUrls, loading } = this.state;
    return (
      <div className="App">
        {loading && <h1>Loading</h1>}
        <form onSubmit={this.handleSearch}>
          <label htmlFor="tag">Tag</label>
          <input id="tag" value={search} onChange={this.handleChange} type="text" />
          <button>Search</button>
        </form>
        <div>
          <button onClick={this.back}>Back</button>
          <button onClick={this.forward}>Forward</button>
        </div>
        {size(imageUrls) > 0 && (
          <ul>
            {imageUrls.map(item => (
              <li key={item.id}>
                <img alt="" src={item.url} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
