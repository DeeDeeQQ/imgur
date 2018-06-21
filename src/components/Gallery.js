import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { getList } from "../actions/gallerieList";
import { Filter } from "../components/Filter";
import { getTags } from "../actions/getTags";

class Gallery extends Component {
  state = {
    section: "hot",
    sort: "viral",
    window: "day"
  };

  componentWillMount() {
    this.props.getData(this.state.section, this.state.sort, this.state.window);
    this.props.getTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.getData(
        this.state.section,
        this.state.sort,
        this.state.window
      );
    }
  }

  onFilterChange = value => {
    this.setState(value);
  };

  render() {
    const data = this.props.data;
    const tags = this.props.tags;
    return (
      <GlobalDiv>
        <Filter
          onChange={this.onFilterChange}
          filterSection={this.state.section}
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
    );
  }
}
export default connect(
  state => ({
    data: state.galleriesList,
    tags: state.tags
  }),
  dispatch => ({
    getData: (section, sort, window) => {
      dispatch(getList(section, sort, window));
    },
    getTags: () => {
      dispatch(getTags());
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
