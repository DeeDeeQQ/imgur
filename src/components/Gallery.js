import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";

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
            <ImgDiv key={data.id}>
              {(data.images &&
                data.images[0].animated && (
                  <video preload="auto" autoPlay="autoplay" loop="loop">
                    <source src={data.images[0].mp4} type="video/mp4" />
                  </video>
                )) ||
                (data.images && (
                  <img src={data.images[0].link} alt={data.title} />
                )) || <img src={data.link} alt={data.title} />}
            </ImgDiv>
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
)(Gallery);

const ImgDiv = styled("div")`
  width: 200px;
  & > img {
    width: 200px;
  }
  & > video {
    width: 200px;
  }
`;
const GlobalDiv = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;
