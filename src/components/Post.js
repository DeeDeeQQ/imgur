import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import styled from "react-emotion";
import isAnimated from "./../helpers/isAnimated";
import isInserted from "./../helpers/isInserted";

class Post extends Component {
  state = {
    data: null
  };
  componentWillMount() {
    const id = this.props.match.params.postId;
    axios
      .get(`https://api.imgur.com/3/gallery/${id}`, {
        headers: {
          authorization: "Client-ID 4983217019809fb"
        }
      })
      .then(response => {
        this.setState({
          data: response.data.data
        });
      });
  }

  render() {
    const data = this.state.data;

    return (
      <div>
        <Link to="/">&larr; Go back</Link>
        {data ? (
          <div>
            {data.title && <h2>{data.title}</h2>}
            {isInserted(data)
              ? data.images.map(image => (
                  <div key={image.id}>
                    {image.description && <h3>{image.description}</h3>}
                    {(isAnimated(image) && (
                      <video preload="auto" autoPlay="autoPlay" loop="loop">
                        <source src={image.mp4} type="video/mp4" />
                      </video>
                    )) || <img src={image.link} alt={image.description} />}
                  </div>
                ))
              : (isAnimated(data) && (
                  <video preload="auto" autoPlay="autoPlay" loop="loop">
                    <source src={data.mp4} type="video/mp4" />
                  </video>
                )) || <img src={data.link} alt={data.title} />}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Post;
