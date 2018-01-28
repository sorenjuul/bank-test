import React, { Component } from "react";
import "./App.css";
import { searchFlickr } from "./api";
import { getImageUrls } from "./helper";
import size from "lodash/size";
import parseInt from "lodash/parseInt";
import { Card, Tag, Input, Tooltip, Icon, Pagination, Layout, Row, Col } from "antd";
const { Header, Content } = Layout;

class App extends Component {
  state = {
    page: 1,
    imageUrls: [],
    loading: false,
    tags: [],
    inputVisible: false,
    inputValue: "",
    total: 0
  };

  searchImages = async (page, tags) => {
    const { tags: stateTags } = this.state;
    const searchTags = tags || stateTags;
    if (size(searchTags) === 0) {
      this.setState({
        imageUrls: [],
        page: 1,
        total: 0,
        tags: []
      });
      return;
    }
    this.setState({ loading: true });
    const data = await searchFlickr(searchTags.join(","), page);
    const formattedData = getImageUrls(data);
    this.setState({
      imageUrls: formattedData.imageUrls,
      loading: false,
      page,
      total: parseInt(formattedData.total),
      tags: searchTags
    });
  };

  paging = page => {
    this.searchImages(page);
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.searchImages(1, tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      inputVisible: false,
      inputValue: ""
    });
    this.searchImages(1, tags);
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { imageUrls, loading, tags, inputVisible, inputValue, page, total } = this.state;
    const gridStyle = {
      width: "25%",
      textAlign: "center"
    };
    return (
      <div className="App">
        <Layout>
          <Header>
            {tags.map(tag => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag onClick={this.showInput} style={{ background: "#fff", borderStyle: "dashed" }}>
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Row gutter={32}>
              <Col span={24}>
                {size(imageUrls) > 0 && (
                  <Card loading={loading} title="Search results">
                    {imageUrls.map(item => (
                      <Card.Grid key={item.id} style={gridStyle}>
                        <img alt="" src={item.url} />
                      </Card.Grid>
                    ))}
                  </Card>
                )}

                {size(imageUrls) === 0 && size(tags) !== 0 && <h1>No results</h1>}

                {size(imageUrls) > 0 &&
                  !loading && (
                    <Pagination current={page} total={total} pageSize={12} onChange={this.paging} />
                  )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
