import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Comment extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/comment", {
        description: this.state.description,
      })
      .then(() => {
        this.setState({
          description: ""
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
  render() {
    return (
      <>
        <h1>comment</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="comment">Get in touch here! </Form.Label>
            <Form.Control
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              id="comment"
            />
          </Form.Group>
  <Button type="submit">Signup</Button>
        </Form>
      </>
    )
  }
}
