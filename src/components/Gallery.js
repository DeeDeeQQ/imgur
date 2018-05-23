import React, { Component } from "react";
import { connect } from "react-redux";
import { getList } from "../actions/gallerieList";

class Gallery extends Component {
  render() {
    return <div>HEllo</div>;
  }
}
export default connect(
  state => ({
    data: state
  }),
  dispatch => ({})
)(Gallery);
