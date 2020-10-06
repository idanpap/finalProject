import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
export default class Comment extends Component {
  state = {
    comment: "",
    receiver: "",
    receiverUsername: "",
    senderUsername: "",
    showButton: true,
    allowedToDelete: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment: this.state.comment,
        receiver: this.props.userId,
        receiverUsername: this.props.username,
        senderUsername: this.props.loggedUser.username
      })
      .then(() => {
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
  handleRandomRoom = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment:
          "This is your room number: " + Math.floor(Math.random() * 1000000),
        receiver: this.props.userId,
        receiverUsername: this.props.username,
        senderUsername: this.props.loggedUser.username,
      })
      .then(() => {
        this.setState({
          comment: "",
        });
        this.props.getData();
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

  handleButton = (event) => {
    if (event.target.className == "is-hidden") {
      event.target.className = "";
    } else {
      event.target.className = "is-hidden";
    }
  };
  render() {
    let allowedToDelete = true;
    const userComment = this.props.comments.map((commentObj) => {
      console.log("commentObj in comment", commentObj);
      return (
        <div>
          {commentObj.senderUsername === this.props.username ?  <p className="username-comment">{commentObj.receiverUsername} said: </p> : <p className="username-comment">{commentObj.senderUsername} said: </p>}
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
          <Form onSubmit={this.handleRandomRoom}>

      <Button onClick={this.handleButton} type="submit">Accept invitation</Button> <br />
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

        </Form>
      </>
    );
  }
}
