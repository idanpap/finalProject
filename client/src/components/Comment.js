import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Comment extends Component {
  state = {
    comment: "",
    receiver: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        comment: this.state.comment,
        receiver: this.props.userId,
      })
      .then(() => {
        this.setState({
          comment: "",
        });
        // this.props.getData();
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
  render() {
    console.log("props in comment", this.props);
    const userComment = this.props.comments.map((commentObj) => {
      return <p>{commentObj.comment}</p>;
    });
    return (
      <>
        <h1>Comments:</h1>
        {userComment}
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
