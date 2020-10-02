import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/auth";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    languagesSpoken: [],
    languagesToLearn: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      languagesSpoken,
      languagesToLearn,
    } = this.state;
    signup(username, password, languagesSpoken, languagesToLearn).then(
      (data) => {
        if (data.message) {
          this.setState({
            message: data.message,
            username: "",
            password: "",
            languagesSpoken: [],
            languagesToLearn: [],
          });
        } else {
          // now we need to put the user in the user key of the state of App.js
          this.props.setUser(data);
          // redirect to /projects
          this.props.history.push("/projects");
        }
      }
    );
  };

  render() {
    return (
      <>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>I speak the following languages:</Form.Label>
            <Form.Control as="select" multiple>
              <option>English</option>
              <option>German</option>
              <option>French</option>
              <option>Italian</option>
              <option>Arabic</option>
              <option>Mandarin</option>
              <option>Hindi</option>
              <option>Turkish</option>
              <option>Portuguese</option>
              <option>Spanish</option>
              <option>Greek</option>
              <option>Russian</option>
              <option>Japanese</option>
              <option>Bulgarian</option>
              <option>Korean</option>
              <option>Armenian</option>
              <option>Dutch</option>
              <option>Urdu</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>I want to learn the following languages:</Form.Label>
            <Form.Control as="select" multiple>
              <option>English</option>
              <option>German</option>
              <option>French</option>
              <option>Italian</option>
              <option>Arabic</option>
              <option>Mandarin</option>
              <option>Hindi</option>
              <option>Turkish</option>
              <option>Portuguese</option>
              <option>Spanish</option>
              <option>Greek</option>
              <option>Russian</option>
              <option>Japanese</option>
              <option>Bulgarian</option>
              <option>Korean</option>
              <option>Armenian</option>
              <option>Dutch</option>
              <option>Urdu</option>
            </Form.Control>
          </Form.Group>
          {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )}
          <Button type="submit">Signup</Button>
        </Form>
      </>
    );
  }
}
