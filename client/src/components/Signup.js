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

  spokenLanguageChanges = (event) => {
    event.preventDefault();
    let value = [];
    for (let i = 0; i < event.target.options.length; i++) {
      if (event.target.options[i].selected) {
        value.push(event.target.options[i].value);
        console.log("this is the value from the if", value);
      }
    }
    this.setState({
      languagesSpoken: value,
    });
    console.log(
      "this is the state languages spoken? ",
      this.state.languagesSpoken,
      "this is the value:",
      value
    );
  };

  languagesToLearnChanges = (event) => {
    event.preventDefault();
    let value = [];
    for (let i = 0; i < event.target.options.length; i++) {
      if (event.target.options[i].selected) {
        value.push(event.target.options[i].value);
      }
    }
    this.setState({
      languagesToLearn: value,
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
        console.log(data);
        if (data.message) {
          this.setState({
            message: data.message,
            username: username,
            password: "",
            languagesSpoken: languagesSpoken,
            languagesToLearn: languagesToLearn,
          });
        } else {
          // now we need to put the user in the user key of the state of App.js
          this.props.setUser(data);
          // redirect to /projects
          this.props.history.push("/");
        }
      }
    );
    console.log(this.state);
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
          <Form.Group>
            <Form.Label>I speak the following languages:</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="languagesSpoken"
              value={this.state.languagesSpoken}
              onChange={this.spokenLanguageChanges}
            >
              <option value="english">English</option>
              <option value="german">German</option>
              <option value="french">French</option>
              <option value="italian">Italian</option>
              <option value="arabic">Arabic</option>
              <option value="mandarin">Mandarin</option>
              <option value="hindi">Hindi</option>
              <option value="turkish">Turkish</option>
              <option value="portuguese">Portuguese</option>
              <option value="spanish">Spanish</option>
              <option value="greek">Greek</option>
              <option value="russian">Russian</option>
              <option value="japanese">Japanese</option>
              <option value="bulgarian">Bulgarian</option>
              <option value="korean">Korean</option>
              <option value="armenian">Armenian</option>
              <option value="dutch">Dutch</option>
              <option value="urdu">Urdu</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>I want to learn the following languages:</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="languagesToLearn"
              value={this.state.languagesToLearn}
              onChange={this.languagesToLearnChanges}
            >
              <option value="english">English</option>
              <option value="german">German</option>
              <option value="french">French</option>
              <option value="italian">Italian</option>
              <option value="arabic">Arabic</option>
              <option value="mandarin">Mandarin</option>
              <option value="hindi">Hindi</option>
              <option value="turkish">Turkish</option>
              <option value="portuguese">Portuguese</option>
              <option value="spanish">Spanish</option>
              <option value="greek">Greek</option>
              <option value="russian">Russian</option>
              <option value="japanese">Japanese</option>
              <option value="bulgarian">Bulgarian</option>
              <option value="korean">Korean</option>
              <option value="armenian">Armenian</option>
              <option value="dutch">Dutch</option>
              <option value="urdu">Urdu</option>
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
