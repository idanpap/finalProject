import React, { Component } from "react";
import axios from "axios";
import LearnersList from "./LearnersList";
import AddProject from "./AddProject";

export default class Projects extends Component {
  state = {
    learners: [],
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
        console.log("learnersList", response);
        this.setState({
          learners: response.data,
        });
        this.state.learners.forEach((learner) => {
          learner.languagesSpoken.forEach((language) => {
            console.log(language);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const users = this.state.learners.map((user) => {
      console.log("here in map", user.languagesSpoken, user.description);
      return (
        <div>
          {user.username} <br></br>
          <b>{user.description}</b>
          <p>I speak </p>
          {user.languagesSpoken.map((spokenLanguage) => {
            return <p>{spokenLanguage}</p>;
          })}
          <p>and would love to learn </p>
          {user.languagesToLearn.map((languagesToLearn) => {
            return <p>{languagesToLearn}</p>;
          })}
        </div>
      );
    });
    return (
      <div className="projects-container">
        {users}
        {/* <AddProject getData={this.getData} /> */}
        {/* <LearnersList projects={this.state.projects} /> */}
      </div>
    );
  }
}
