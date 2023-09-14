import React, { useEffect, useState } from "react";
import Result from './Result'

const Quiz = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const URL = "https://opentdb.com/api.php?amount=100";

 //Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const jsonData = await response.json();
        setData(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  //for try again
  function startQuiz() {
    setCount(0);
    setSelectedAnswer(null);
  };

 //timer
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setSeconds(59);
        if (count < data.length - 1) {
          setCount(count + 1);
          setSelectedAnswer(null);
        } else {
          setCount(count + 1);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  });

//after clicking the correct answer
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setSeconds(59);
    }
    if (count < data.length - 1) {
      setCount(count + 1);
      setSelectedAnswer(null);
      setSeconds(59);
    } else {
      setCount(count + 1);
    }
  };
//  when the data not fetch
  if (data.length === 0) {
    return <p>Loading...</p>;
  }
 //transfer pair of question & options
  const currentQuestion = data[count];

  return (
    <div className="outterContainer">
      <div className="innerQuiz">
        <h1>Quiz App</h1>
        {count < data.length ? (
          <>
            <p>
              Question {count + 1} of {data.length}
            </p>
            
            <div className="question">
              <h3>{currentQuestion.question}</h3>
            </div>
            <div className="option">
              {currentQuestion.incorrect_answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  className={
                    selectedAnswer === answer
                      ? "selected"
                      : selectedAnswer === currentQuestion.correct_answer
                      ? "correct"
                      : ""
                  }
                >
                  {answer}
                </button>
              ))}
              <button
                onClick={() =>
                  handleAnswerClick(currentQuestion.correct_answer)
                }
              >
                {currentQuestion.correct_answer}
              </button>
            </div>
            <p>{seconds} sec</p>
          </>
        ) : (
            <Result
              data={data.length}
              score={score}
              function={startQuiz}
            />
        )}
      </div>
    </div>
  );
};

export default Quiz;
