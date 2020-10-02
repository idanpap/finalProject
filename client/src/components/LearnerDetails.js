import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import EditLearner from "./EditLearner";

export default class LearnerDetails extends Component {
  state = {
    user: null,
    error: null,
    title: "",
    description: "",
    editForm: false,
  };

  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/api/learners/${id}`)
      .then((response) => {
        this.setState({
          user: response.data,
          title: response.data.title,
          description: response.data.description,
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

  deleteUser = () => {
    const id = this.props.match.params.id;
    axios
      .delete(`/api/learners/${id}`)
      .then(() => {
        this.props.history.push("/learners");
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

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/learners/${id}`, {
        title: this.state.title,
        description: this.state.description,
      })
      .then((response) => {
        this.setState({
          user: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.user) return <p>Loading ...</p>;

    let allowedToDelete = false;
    const user = this.props.user;
    const owner = this.state.user.owner;
    if (user && user._id === owner) allowedToDelete = true;

    return (
      <div>
        <h1>{this.state.user.title}</h1>
        <p>{this.state.user.description}</p>

        {allowedToDelete && (
          <Button variant="danger" onClick={this.deleteUser}>
            Delete User
          </Button>
        )}

        <Button onClick={this.toggleEditForm}>Show Edit Form</Button>
        {this.state.editForm && (
          <EditLearner
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

//title, description, owner
