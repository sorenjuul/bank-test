import React, { Component } from 'react';
import { searchFlickr } from './utils/api';
import { getImageUrls } from './utils/helper';
import size from 'lodash/size';
import parseInt from 'lodash/parseInt';
import { Pagination, Layout } from 'antd';
import Tags from './components/Tags';
import ImageGrid from './components/ImageGrid';
import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  state = {
    page: 1,
    imageUrls: [],
    loading: false,
    total: 0,
    tags: [],
  };

  searchImages = async (page, tags) => {
    const { tags: stateTags } = this.state;
    const searchTags = tags || stateTags;
    // reset state if all tags have been deleted
    if (size(searchTags) === 0) {
      this.setState({
        imageUrls: [],
        page: 1,
        total: 0,
        tags: [],
      });
      return;
    }
    this.setState({
      loading: true,
      tags: searchTags,
    });
    //call API
    const data = await searchFlickr(searchTags.join(','), page);
    //get UI formatted data
    const formattedData = getImageUrls(data);
    this.setState({
      imageUrls: formattedData.imageUrls,
      loading: false,
      page,
      total: parseInt(formattedData.total),
    });
  };

  paging = page => {
    this.searchImages(page);
  };

  tagsChanged = tags => {
    this.searchImages(1, tags);
  };

  render() {
    const { imageUrls, loading, tags, page, total } = this.state;

    return (
      <div className="app">
        <Layout>
          <Header className="header">
            <h1 className="header__title">Bank Test</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 16 }}>Search for tags on flickr:</h4>
              <Tags handleChange={this.tagsChanged} tags={tags} />
              {size(imageUrls) === 0 && size(tags) !== 0 && <h2>No results</h2>}
              <ImageGrid imageUrls={imageUrls} loading={loading} />
              {size(imageUrls) > 0 &&
                !loading && (
                  <div className="pagination">
                    <Pagination
                      simple
                      current={page}
                      total={total}
                      pageSize={12}
                      onChange={this.paging}
                    />
                  </div>
                )}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
