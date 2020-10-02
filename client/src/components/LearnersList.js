import React from "react";
import { Link } from "react-router-dom";

export default function LearnersList(props) {
  return (
    <div>
      {props.users.length > 0 && <h2>Find your fellow learners:</h2>}

      {props.users.map((user) => {
        return (
          <div key={user._id}>
            <h3>
              <Link to={`/leaners/${user._id}`}>{user.title}</Link>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
