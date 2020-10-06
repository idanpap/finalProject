import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Comment extends Component {
  state = {
    comment: "",
    receiver: "",
    receiverUsername: "",
<<<<<<< HEAD
    senderUsername: "",
    showButton: true
  }
=======
    allowedToDelete: false,
  };

>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment: this.state.comment,
        receiver: this.props.userId,
<<<<<<< HEAD
        receiverUsername: this.props.username,
        senderUsername: this.props.loggedUser.username
      })
      .then(() => {
=======

        receiverUsername: this.props.username,
      })
      .then(() => {
        console.log("in comment", this.props);
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
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
<<<<<<< HEAD

  handleRandomRoom = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment: "This is your room number: " + Math.floor(Math.random() * 1000000),
        receiver: this.props.userId,
        receiverUsername: this.props.username,
        senderUsername: this.props.loggedUser.username
      })
      .then(() => {
        this.setState({
          comment: ""
        });
=======
  decline = (commentObj) => {
    // const id = this.props;
    console.log(`find the comment`, commentObj);
    axios
      .delete(`/comments/${commentObj._id}`)
      .then(() => {
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
        this.props.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
<<<<<<< HEAD
  handleButton = (event) => {
    if (event.target.className == "is-hidden") {
      event.target.className = "";
    } else {
      event.target.className = "is-hidden";
    }

  }
  render() {
  const userComment = this.props.comments.map(commentObj => {
    // console.log("commentObj.senderUsername",commentObj.senderUsername)
    // console.log("commentObj.receiverUsername",commentObj.receiverUsername);
    return <div>
      {commentObj.senderUsername === this.props.username ?  <p className="username-comment">{commentObj.receiverUsername} said: </p> : <p className="username-comment">{commentObj.senderUsername} said: </p>}
      {commentObj.comment}
      <Form onSubmit={this.handleRandomRoom}>
      <Button onClick={this.handleButton} type="submit">Accept invitation</Button> <br />
      </Form>
         </div>
  })
=======

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

>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
    return (
      <>
        <h1>Comments:</h1>
        <div className="comments">{userComment}</div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
<<<<<<< HEAD
            <Form.Label htmlFor="comment"><b>Schedule a videocall! </b></Form.Label>
=======
            <Form.Label htmlFor="comment">
              <b>Get in touch here! </b>
            </Form.Label>
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
            <Form.Control
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              id="comment"
            />
          </Form.Group>
<<<<<<< HEAD
  <Button type="submit">Submit comment</Button> <br />
=======
          <Button type="submit">Submit comment</Button> <br />
          <a href="/room">
            <Button disabled>Call</Button>
          </a>
>>>>>>> 3c8e95dd9d1b6c1edd4e406b343a1c2e5886f9e4
        </Form>
      </>
    );
  }
}
