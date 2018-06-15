import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { getList } from "../actions/gallerieList";

class Gallery extends Component {
  componentWillMount() {
    this.props.getData();
  }

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <GlobalDiv>
        {data &&
          data.map(data => (
            <PostDiv key={data.id}>
              <Link to={`/post/${data.id}`}>
                <ImgDiv>
                  {(data.animated && (
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
                    (data.images && (
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
    data: state.galleriesList
  }),
  dispatch => ({
    getData: () => {
      dispatch(getList());
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
  "& > img{max-width:100%;max-height:250px;}& > video{width:200px;height:200px;}& > span{align-self:flex-end;}"
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
