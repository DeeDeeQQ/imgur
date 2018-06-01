import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "react-emotion";

class Post extends Component {
  componentWillMount() {}

  render() {
    const data = this.props.data;
    console.log(data);
    return <p>Id</p>;
  }
}
export default connect(
  state => ({
    data: state.galleriesList
  }),
  dispatch => {}
)(Post);
