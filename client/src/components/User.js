// src/components/User.js

import React, { Component } from "react";
import axios from "axios";
import LearnersList from "./LearnersList";
import AddUser from "./AddUser";

export default class Users extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getData();
  }

  // componentDidUpdate() {
  //   console.log('update');
  //   // this.getData();
  // }

  getData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="users-container">
        <AddUser getData={this.getData} />
        <LearnersList users={this.state.users} />
      </div>
    );
  }
}
