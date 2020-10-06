import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Comment extends Component {
  state = {
    comment: "",
    receiver: "",
    receiverUsername: "",
    allowedToDelete: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment: this.state.comment,
        receiver: this.props.userId,

        receiverUsername: this.props.username,
      })
      .then(() => {
        console.log("in comment", this.props);
        this.setState({
          comment: "",
        });
        this.props.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  decline = (commentObj) => {
    // const id = this.props;
    console.log(`find the comment`, commentObj);
    axios
      .delete(`/comments/${commentObj._id}`)
      .then(() => {
        this.props.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props);
    let allowedToDelete = true;
    const user = this.props.user;

    const userComment = this.props.comments.map((commentObj) => {
      console.log("commentObj in comment", commentObj);
      return (
        <div>
          {commentObj.sender === this.props.loggedUser._id ? (
            <p className="username-comment">You said: </p>
          ) : (
            <p className="username-comment">
              {commentObj.receiverUsername} said:{" "}
            </p>
          )}
          {commentObj.comment}
          <Form>
            {allowedToDelete && (
              <Button
                variant="danger"
                onClick={() => {
                  this.decline(commentObj);
                }}
              >
                Decline
              </Button>
            )}
          </Form>
        </div>
      );
    });

    return (
      <>
        <h1>Comments:</h1>
        <div className="comments">{userComment}</div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="comment">
              <b>Get in touch here! </b>
            </Form.Label>
            <Form.Control
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              id="comment"
            />
          </Form.Group>
          <Button type="submit">Submit comment</Button> <br />
          <a href="/room">
            <Button disabled>Call</Button>
          </a>
        </Form>
      </>
    );
  }
}
