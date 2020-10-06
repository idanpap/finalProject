import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

// import LearnersList from "./LearnersList";
// import AddProject from "./AddProject";
// import ProjectDetails from "./ProjectDetails";

export default class Projects extends Component {
  state = {
    learners: [],
    search: null,
  };

  componentDidMount() {
    this.getData();
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  getData = () => {
    axios
      .get("/api/projects")
      .then((response) => {
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
    const users = this.state.learners
      .filter((data) => {
        if (this.state.search == null) return data;
        else if (
          data.username
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          data.languagesSpoken.forEach((language) => {
            return language
              .slice(5)
              .toLowerCase()
              .includes(this.state.search.toLowerCase());
          })
        ) {
          return data;
        }
      })
      .map((user) => {
        return (
          <div>
            <a href={`/users/${user._id}`}>{user.username}</a> <br></br>
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
      <div>
        <Form.Group>
          <Form.Label htmlFor="search"> </Form.Label>
          <Form.Control
            type="text"
            name="search"
            onChange={(e) => this.searchSpace(e)}
            id="search"
            placeholder="Enter the language you want to learn or the user you want to talk to"
          />
        </Form.Group>
        {users}
      </div>
    );
  }
}
