import React, { Component } from "react";
import axios from "axios";
// import LearnersList from "./LearnersList";
// import AddProject from "./AddProject";
// import ProjectDetails from "./ProjectDetails";

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
        this.setState({
          learners: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

  };

  render() {
    const users = this.state.learners.map(user => {
      console.log("in learnersList",user)
    return <div>
      <a href={`/api/projects/${user._id}`}>
      {user.username} 
      </a>
    {user.languagesSpoken.map(language => {
    return <p>Language/s: {language}</p>
    })}
    </div>
    })
    return (
      <div className="projects-container">
        {users}
        {/* <ProjectDetails learners={this.state.learners} /> */}
        {/* <AddProject getData={this.getData} /> */}
        {/* <LearnersList projects={this.state.projects} /> */}
      </div>
    );
  }
}
