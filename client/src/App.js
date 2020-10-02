import React, { Component } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Users from "./components/User";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LearnerDetails from "./components/LearnerDetails";
import Navbar from "./components/Navbar";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";

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
          path='/learners'
          component={Users}
        /> */}

        <Route
          exact
          path="/learners"
          render={(props) => {
            if (this.state.user) {
              return <Users {...props} />;
            } else return <Redirect to="/" />;
          }}
        />

        <Route
          exact
          path="/learners/:id"
          render={(props) => (
            <LearnerDetails user={this.state.user} {...props} />
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
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreateRoom} />
            <Route path="/room/:roomID" component={Room} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
