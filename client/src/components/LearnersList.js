import React from "react";
import { Link } from "react-router-dom";

export default function LearnersList(props) {
  return (
    <div>
      {props.learners.length > 0 && <h2>Find your fellow learners:</h2>}

      {props.learners.map((learner) => {
        return (
          <div key={learner._id}>
            <h3>
              <Link to={`/leaners/${learner._id}`}>{learner.title}</Link>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
