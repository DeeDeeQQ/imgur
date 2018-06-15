import React, { Component } from "react";
import axios from "axios";
import styled from "react-emotion";

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
        {data ? (
          <div>
            {console.log(data.type === "image/gif")}
            {console.log(data)}
            {((data.type === "image/gif" ||
              data.images[0].type === "image/gif" ||
              data.type === "video/mp4" ||
              data.images[0].type === "video/mp4") && (
              <div>
                <h2>{data.title}</h2>
                {((data.mp4 || data.images[0].mp4) && (
                  <video preload="auto" controls="controls" loop="loop">
                    <source
                      src={data.mp4 || data.images[0].mp4}
                      type="video/mp4"
                    />
                  </video>
                )) || (
                  <video preload="auto" controls="controls" loop="loop">
                    <source src={data.gifv} type="video/mp4" />
                  </video>
                )}
              </div>
            )) ||
              (data.type === "image/png" ||
                (data.type === "image/jpeg" && (
                  <div>
                    <h2>data.title</h2>
                    <img src={data.link} />
                  </div>
                ))) ||
              (!data.type && (
                <div>
                  <h2>{data.title}</h2>
                  {data.images.map(image => (
                    <div key={image.id}>
                      {image.description && <p>{image.description}</p>}
                      <img src={image.link} />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Post;
