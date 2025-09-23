import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Quiz() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Example fetch or setup
    const sampleQuestions = [
      { id: 1, question: "What is 2+2?", options: ["3", "4", "5"], answer: "4" },
      { id: 2, question: "Capital of France?", options: ["Rome", "Paris", "Berlin"], answer: "Paris" },
    ];
    setQuestions(sampleQuestions);
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      // quiz finished → redirect
      history.push("/leaderboard");
    }
  };

  if (!questions.length) return <p>Loading...</p>;

  return (
    <div>
      <h2>Quiz</h2>
      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <h3>{questions[currentQuestion].question}</h3>
      <ul>
        {questions[currentQuestion].options.map((opt, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
    </div>
  );
}

export default Quiz;
