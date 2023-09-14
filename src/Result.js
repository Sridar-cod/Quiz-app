import React from "react";

const Result = (props) => {
  return (
    <>
      <section>
        <p>Quiz finished!</p>
        <b>
          Your score is {props.score} out of {props.data}
        </b>
        <button className="start" onClick={props.function}>
          Try Again
        </button>
      </section>
    </>
  );
};

export default Result;
