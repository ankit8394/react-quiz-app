import React, { useState } from 'react';

// Sample quiz questions organized by subject
const quizData = {
  Math: [
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'What is 5 * 3?',
      options: ['10', '12', '15', '18'],
      correctAnswer: '15',
    },
  ],
  Science: [
    {
      question: 'What is the chemical symbol for water?',
      options: ['Wa', 'H2O', 'Wo', 'HO2'],
      correctAnswer: 'H2O',
    },
    {
      question: 'What is the force that pulls objects towards each other?',
      options: ['Magnetism', 'Electricity', 'Gravity', 'Friction'],
      correctAnswer: 'Gravity',
    },
  ],
  History: [
    {
      question: 'In what year did World War II end?',
      options: ['1939', '1945', '1950', '1941'],
      correctAnswer: '1945',
    },
    {
      question: 'Who was the first president of the United States?',
      options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
      correctAnswer: 'George Washington',
    },
  ],
};

function QuizQuestion({
  questionData,
  currentQuestionIndex,
  onAnswer,
  selectedAnswer,
}) {
  const currentQuestion = questionData[currentQuestionIndex];

  return (
    <div>
      <h3>Question {currentQuestionIndex + 1}: {currentQuestion.question}</h3>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => onAnswer(e.target.value)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuizApp() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const subjects = Object.keys(quizData);
  const currentQuestions = selectedSubject ? quizData[selectedSubject] : [];
  const totalQuestions = currentQuestions.length;

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizStarted(true);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestartQuiz = () => {
    setSelectedSubject(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div>
      <h2>Select a Subject to Start Quiz</h2>
      <div style={{ display: 'flex', alignItems:"center", justifyContent: "space-between", margin:"10px" }}>
        {subjects.map((subject) => (
          <button key={subject} onClick={() => handleSubjectSelect(subject)}>
            {subject}
          </button>
        ))}
      </div>
    </div>
    );
  }

  if (currentQuestionIndex < totalQuestions) {
    return (
      <div>
        <h2>{selectedSubject} Quiz</h2>
        <QuizQuestion
          questionData={currentQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          Next Question
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your final score for {selectedSubject} is: {score} out of {totalQuestions}</p>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }
}

export default QuizApp;