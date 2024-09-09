import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    text: "What industry is your business in?",
    options: ["Agriculture", "Energy Supply", "Insurance", "Trading", "Disaster Prevention", "Other"]
  },
  {
    text: "Do you currently use any weather or climate forecasting data?",
    options: ["Yes, regularly", "Sometimes", "No", "Not sure"]
  },
  {
    text: "How often do extreme weather events impact your operations or business?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"]
  },
  {
    text: "Which weather events are you most concerned about?",
    options: ["Heatwaves", "Floods", "Hurricanes", "Droughts", "Freezes", "Other"]
  },
  {
    text: "How prepared do you feel for future climate-related risks?",
    options: ["Very prepared", "Somewhat prepared", "Not very prepared", "Not at all prepared"]
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendation = () => {
    const preparedness = answers[4];
    if (preparedness === "Very prepared" || preparedness === "Somewhat prepared") {
      return "Your business seems to have a good foundation for climate resilience. Consider exploring our advanced forecasting tools to further enhance your preparedness.";
    } else {
      return "Your business may benefit from more robust climate risk planning. Our forecasting tools can help you anticipate and prepare for future weather-related challenges.";
    }
  };

  if (showResults) {
    return (
      <div className="App">
        <h1>Assessment Results</h1>
        <div className="result">
          <h2>Recommendation</h2>
          <p>{getRecommendation()}</p>
        </div>
        <div className="next-steps">
          <h2>Next Steps:</h2>
          <ul>
            <li><a href="https://www.planette.ai/energy">See how we forecast residential power demand over ERCOT</a></li>
            <li><a href="https://www.planette.ai/forecasts">Explore our AI-enhanced forecast details</a></li>
            <li><a href="https://www.planette.ai/contact-us">Contact us for discovery call and demo</a></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>5-Minute Climate Risk Assessment</h1>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
      <h2>{questions[currentQuestion].text}</h2>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;