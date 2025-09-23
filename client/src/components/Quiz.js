import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Quiz() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  
