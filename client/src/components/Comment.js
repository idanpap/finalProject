import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class Comment extends Component {

  state = {
    comment:"",
    receiver: ""
  }
  handleSubmit = (event) => {
    console.log("makes sense patients", this.props)
    event.preventDefault();
    axios
      .post("/comments", {
        comment: this.state.comment,
        receiver: this.props.userId 
      })
      .then(() => {
        this.setState({
          comment: ""
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
  console.log(this.props)
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
  <Button type="submit">Submit comment</Button> <br />
  <Button disabled>Call</Button>
        </Form>
      </>
    )
  }
}
