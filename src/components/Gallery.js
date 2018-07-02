import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import { getList } from "../actions/gallerieList";
import { getListByTag } from "../actions/gallerieListByTag";
import { Filter } from "../components/Filter";
import { getTags } from "../actions/getTags";

class Gallery extends Component {
  state = {
    filter: {
      section: "hot",
      sort: "viral",
      window: "day",
      tag: ""
    },
    isLoading: false,
    page: 0,
    dataId: {}
  };

  componentWillMount() {
    this.props.getData(
      this.state.filter.section,
      this.state.filter.sort,
      this.state.filter.window
    );
    this.props.getTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      if (this.state.filter.section !== "tag") {
        this.props.getData(
          this.state.filter.section,
          this.state.filter.sort,
          this.state.filter.window
        );
      } else {
        this.props.getDataByTag(
          this.state.filter.tag,
          this.state.filter.sort,
          this.state.filter.window
        );
      }
    }
    if (prevProps.data !== this.props.data) {
      this.setState({ isLoading: false });
    }
  }

  onFilterChange = value => {
    this.setState({ page: 0 });
    this.setState(value);
  };

  handleKeyPress = e => {
    if (e.nativeEvent.keyCode === 13) {
      this.setState({ filter: { section: "tag", tag: e.target.value } });
      this.props.getDataByTag(
        e.target.value,
        this.state.filter.sort,
        this.state.filter.window
      );
    }
  };

  handleLoadMore = () => {
    this.setState({
      isLoading: true,
      page: +this.state.page + 1
    });
    if (this.state.filter.section !== "tag") {
      this.props.getData(
        this.state.filter.section,
        this.state.filter.sort,
        this.state.filter.window,
        this.state.page
      );
    } else {
      this.props.getDataByTag(
        this.state.filter.tag,
        this.state.filter.sort,
        this.state.filter.window,
        this.state.page
      );
    }
    console.log(this.state.page);
  };

  render() {
    const data = this.props.data;
    const tags = this.props.tags;
    return (
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={this.handleLoadMore}
        hasMore={!this.state.isLoading}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <GlobalDiv>
          <Filter
            onChange={this.onFilterChange}
            handleKeyPress={this.handleKeyPress}
            filterSection={this.state.filter.section}
            tags={tags}
          />
          {data &&
            data.map(data => (
              <PostDiv key={data.id}>
                <Link to={`/post/${data.id}`}>
                  <ImgDiv>
                    {(data.images &&
                      data.images_count === 0 && <p>no image</p>) ||
                      (data.animated && (
                        <video preload="auto" controls="controls" loop="loop">
                          <source src={data.mp4} type="video/mp4" />
                        </video>
                      )) ||
                      (data.images &&
                        data.images[0].animated && (
                          <video preload="auto" controls="controls" loop="loop">
                            <source src={data.images[0].mp4} type="video/mp4" />
                          </video>
                        )) ||
                      (data.images &&
                        data.images[0] && (
                          <img src={data.images[0].link} alt={data.title} />
                        )) || <img src={data.link} alt={data.title} />}
                  </ImgDiv>
                </Link>
                <TitleDiv>
                  <p>{data.title}</p>
                  <span>Views: {data.views}</span>
                </TitleDiv>
              </PostDiv>
            ))}
        </GlobalDiv>
      </InfiniteScroll>
    );
  }
}
export default connect(
  state => ({
    data: state.galleriesList,
    tags: state.tags
  }),
  dispatch => ({
    getData: (section, sort, window, tag, page) => {
      dispatch(getList(section, sort, window, tag, page));
    },
    getTags: () => {
      dispatch(getTags());
    },
    getDataByTag: (tag, sort, window, page) => {
      dispatch(getListByTag(tag, sort, window, page));
    }
  })
)(withRouter(Gallery));

const PostDiv = /*#__PURE__*/ styled("div", {
  target: "e2ccsqh0"
})(
  "display:flex;position:relative;flex-direction:column;flex:0 0 200px;margin:5px;border:1px solid #ccc;box-shadow:2px 2px 6px 0px rgba(0,0,0,0.3);justify-content:center;align-items:center;"
);

const ImgDiv = /*#__PURE__*/ styled("div", {
  target: "e2ccsqh1"
})(
  "display:flex;width: 200px;height:250px;justify-content:center;& > img{max-width:100%;max-height:100%;margin:auto;}& > video{max-width:100%;max-height:100%;}& > span{align-self:flex-end;}"
);
const TitleDiv = /*#__PURE__*/ styled("div", {
  target: "e2ccsqh2"
})(
  "border:1px solid #cccccc;border-radius:1em;width:220px;justify-self:flex-end;display:none;padding:10px;background-color:#e6e6e6;top:100%;z-index:5;position:absolute;& > p{margin:0;}& > span{margin-top:5px;float:right;}",
  PostDiv,
  ":hover &{display:block;}"
);

const GlobalDiv = /*#__PURE__*/ styled("div", {
  target: "e2ccsqh3"
})("display:flex;flex-wrap:wrap;align-items:stretch;justify-content:center;");
