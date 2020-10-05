import React, { Component } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Projects from "./components/Projects";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProjectDetails from "./components/ProjectDetails";
import Navbar from "./components/Navbar";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";
import { Button } from "react-bootstrap";

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />

        {/* <Route
          exact
          path='/projects'
          component={Projects}
        /> */}

        <Route
          exact
          path="/projects"
          render={(props) => {
            if (this.state.user) {
              return <Projects {...props} />;
            } else return <Redirect to="/" />;
          }}
        />

        <Route
          exact
          path="/projects/:id"
          render={(props) => (
            <ProjectDetails user={this.state.user} {...props} />
          )}
        />

        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />

        <Route
          exact
          path="/"
          render={(props) => {
            if (this.state.user) {
              return <CreateRoom {...props} />;
            } else
              return (
                <div className="not-signed-up">
                  <h1>Welcome to the DaNaKe</h1>
                  <p>
                    Here at DaNaKe, we care about learning languages. A passion
                    for education, coupled with new normal of COVID, which means
                    we can't travel as much as normal, motivated us to make our
                    groundbreaking language learning platform available to the
                    public. Connect with normal people from all over the world
                    and learn the language of your choosing, whilst
                    simultaneously sharing your own culture.
                  </p>
                  <p>
                    <em>We are DaNaKe, we are community</em>
                  </p>
                  <a href="/signup">
                    <Button variant="primary" size="lg">
                      Join us now
                    </Button>
                  </a>
                </div>
              );
          }}
        />
        <Route path="/room/:roomID" component={Room} />
      </div>
    );
  }
}

export default App;
