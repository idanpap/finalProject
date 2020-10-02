// src/components/Project.js

import React, { Component } from "react";
import axios from "axios";
import LearnersList from "./LearnersList";
import AddProject from "./AddProject";

export default class Projects extends Component {
  state = {
    projects: [],
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
      .get("/api/projects")
      .then((response) => {
        console.log(response);
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="projects-container">
        <AddProject getData={this.getData} />
        <LearnersList projects={this.state.projects} />
      </div>
    );
  }
}
