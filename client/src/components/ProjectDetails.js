import React, { Component } from "react";
import axios from "axios";
// import { Button } from "react-bootstrap";
// import EditProject from "./EditProject";
import Comment from "./Comment";

export default class ProjectDetails extends Component {

state = {
  userId: "",
  username: "",
  languagesSpoken:[],
  languagesToLearn: [],
  description: "",
  comments: [],
  error: ""
}
  getData = () => {
    axios
      .get(`/api/projects/${this.props.match.params.id}`)
      .then((response) => {
        const userComments = response.data.comments.filter(comment => {
          return ((this.props.user._id === comment.receiver || comment.sender === this.props.user._id) && this.props.match.params.id === comment.receiver) && comment
        })
        this.setState({
          userId: response.data.user._id,
          username: response.data.user.username,
          description: response.data.user.description,
          languagesSpoken: response.data.user.languagesSpoken,
          languagesToLearn: response.data.user.languagesToLearn,
          comments: userComments
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({
            error: "Not found",
          });
        }
      });
  };

  // deleteProject = () => {
  //   const id = this.props.match.params.id;
  //   axios
  //     .delete(`/api/projects/${id}`)
  //     .then(() => {
  //       this.props.history.push("/projects");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const id = this.props.match.params.id;
  //   axios
  //     .put(`/projects/${id}`, {
  //       title: this.state.title,
  //       description: this.state.description,
  //     })
  //     .then((response) => {
  //       this.setState({
  //         project: response.data,
  //         title: response.data.title,
  //         description: response.data.description,
  //         editForm: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    console.log("project details",this.props);
    // if (this.state.error) return <div>{this.state.error}</div>;
    // if (!this.state.project) return <p>Loading ...</p>;

    // let allowedToDelete = false;
    // const user = this.props.user;
    // const owner = this.state.project.owner;
    // if (user && user._id === owner) allowedToDelete = true;
    const languagesToLearn = this.state.languagesToLearn.map(language => {
      return <p>{language}</p>
    })
    const languagesSpoken = this.state.languagesSpoken.map(language => {
      return <p>{language}</p>
    })
    return (
      <div>
        <h1>{this.state.username}</h1>
        <p>{this.state.description}</p>
        <h3>Wants to learn</h3>
        {languagesToLearn}
        <h3>Can speak</h3>
        {languagesSpoken}

        {/* {allowedToDelete && (
          <Button variant="danger" onClick={this.deleteProject}>
            Delete Project
          </Button>
        )} */}

        {/* <Button onClick={this.toggleEditForm}>Show Edit Form</Button>
        {this.state.editForm && (
          <EditProject
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          
        )} */}
        <Comment getData={this.getData} loggedUser={this.props.user} {...this.state}/>
      </div>
    );
  }
}
