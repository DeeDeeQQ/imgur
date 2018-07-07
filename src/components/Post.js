import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

import styled from "react-emotion";
import isAnimated from "./../helpers/isAnimated";
import isInserted from "./../helpers/isInserted";

class Post extends Component {
  state = {
    data: null,
    comments: null
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
    axios
      .get(`https://api.imgur.com/3/gallery/${id}/comments/best`, {
        headers: {
          authorization: "Client-ID 4983217019809fb"
        }
      })
      .then(response => {
        console.log(response.data.data);
        this.setState({
          comments: response.data.data
        });
      });
  }

  commentReply = comment => {
    if (comment.children.length > 0) {
      return comment.children.map(comment => (
        <CommentStackDiv key={comment.id}>
          <ReplyDiv>
            <span>
              {comment.author} via {comment.platform}
            </span>
            <hr />
            <p>{comment.comment}</p>
          </ReplyDiv>
          {this.commentReply(comment)}
        </CommentStackDiv>
      ));
    }
  };

  render() {
    const data = this.state.data;
    const comments = this.state.comments;

    return (
      <PostDiv>
        {/*<Link to="/">&larr; Go back</Link>*/}
        {data ? (
          <div>
            {data.title && <h2>{data.title}</h2>}
            {isInserted(data)
              ? data.images.map(image => (
                  <DataDiv key={image.id}>
                    {image.description && <h3>{image.description}</h3>}
                    {(isAnimated(image) && (
                      <video preload="auto" autoPlay="autoPlay" loop="loop">
                        <source src={image.mp4} type="video/mp4" />
                      </video>
                    )) || <img src={image.link} alt={image.description} />}
                  </DataDiv>
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
        <div>
          {comments &&
            comments.map(comment => (
              <CommentStackDiv key={comment.id}>
                <CommentDiv>
                  <span>
                    {comment.author} via {comment.platform}
                  </span>
                  <hr />
                  <p>{comment.comment}</p>
                </CommentDiv>
                {this.commentReply(comment)}
              </CommentStackDiv>
            ))}
        </div>
      </PostDiv>
    );
  }
}

export default Post;

const PostDiv = styled("div")`
  display: flex;
  max-width: 80%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
`;

const DataDiv = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > img {
    max-width: 100%;
  }
  & > video {
    max-width: 100%;
  }
`;

const CommentDiv = styled("div")`
  border: 1px solid black;
  background-color: #e6e6e6;
  padding: 15px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 1em;

  & > span {
    font-weight: bold;
  }
  & > p {
    margin: 0;
  }
`;

const ReplyDiv = styled("div")`
  border: 1px solid red;
  background-color: #e6e6e6;
  padding: 15px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  border-radius: 1em;

  & > span {
    font-weight: bold;
  }
  & > p {
    margin: 0;
  }
`;

const CommentStackDiv = styled("div")`
  margin-left: 25px;
  &:nth-child(2n) {
    padding: 10px;
  }
`;
