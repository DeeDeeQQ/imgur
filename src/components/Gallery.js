import React, { Component } from "react";
import { connect } from "react-redux";
import { getList } from "../actions/gallerieList";

class Gallery extends Component {
  componentWillMount() {
    this.props.getData();
  }

  render() {
    return <div>HEllo</div>;
  }
}
export default connect(
  state => ({
    data: state
  }),
  dispatch => ({
    getData: () => {
      dispatch(getList());
    }
  })
)(Gallery);
