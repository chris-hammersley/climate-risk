import React, { useState } from 'react';
import './App.css';

const industryQuestions = {
  "Agriculture": [
    {
      text: "Which crops are most important to your agricultural business? (Select all that apply)",
      options: ["Corn", "Wheat", "Soybeans", "Cotton", "Cocoa", "Coffee", "Other"],
      multiSelect: true
    },
    {
      text: "Which weather events significantly impact your crop yield? (Select all that apply)",
      options: ["Drought", "Extreme heat", "Floods", "Frost", "Hail"],
      multiSelect: true
    },
    {
      text: "How often do these weather events impact your crop yield?",
      options: ["Every season", "Once a year", "Every few years", "Rarely"],
      multiSelect: false
    }
  ],
  "Energy Supply": [
    {
      text: "What type of energy does your company primarily produce?",
      options: ["Solar", "Wind", "Hydroelectric", "Other"],
      multiSelect: false
    },
    {
      text: "Which weather events affect your energy production? (Select all that apply)",
      options: ["Extreme heat", "Storms", "Drought", "Freezing temperatures", "High winds"],
      multiSelect: true
    },
    {
      text: "How often do extreme weather events disrupt your energy production?",
      options: ["Frequently", "Occasionally", "Rarely", "Never"],
      multiSelect: false
    }
  ],
  "Insurance": [
    {
      text: "What type of insurance does your company primarily provide?",
      options: ["Property", "Crop", "Flood", "General liability", "Other"],
      multiSelect: false
    },
    {
      text: "Which climate-related risks most affect your risk assessments? (Select all that apply)",
      options: ["Hurricanes", "Floods", "Droughts", "Wildfires", "Sea level rise", "Freezes"],
      multiSelect: true
    },
    {
      text: "How has climate change affected your risk assessments?",
      options: ["Significantly", "Moderately", "Slightly", "Not at all"],
      multiSelect: false
    }
  ],
  "Trading": [
    {
      text: "What commodities do you primarily trade?",
      options: ["Agricultural", "Energy", "Metals", "Financial instruments", "Other"],
      multiSelect: false
    },
    {
      text: "Which climate factors most influence your trading decisions? (Select all that apply)",
      options: ["Temperature trends", "Precipitation patterns", "Extreme weather events", "Long-term climate projections"],
      multiSelect: true
    },
    {
      text: "How often do climate events impact your trading decisions?",
      options: ["Daily", "Weekly", "Monthly", "Rarely"],
      multiSelect: false
    }
  ],
  "Disaster Prevention": [
    {
      text: "What type of disasters does your organization primarily focus on?",
      options: ["Floods", "Hurricanes", "Wildfires", "Earthquakes", "Multiple types"],
      multiSelect: false
    },
    {
      text: "Which climate-related factors most challenge your prevention efforts? (Select all that apply)",
      options: ["Increased frequency of events", "Intensity of events", "Unpredictability", "Long-term environmental changes"],
      multiSelect: true
    },
    {
      text: "How far in advance do you typically plan for potential disasters?",
      options: ["Days", "Weeks", "Months", "Years"],
      multiSelect: false
    }
  ],
  "Other": [
    {
      text: "How frequently does your business consider climate-related risks?",
      options: ["Daily", "Weekly", "Monthly", "Yearly", "Rarely"],
      multiSelect: false
    },
    {
      text: "Which climate-related factors most affect your business? (Select all that apply)",
      options: ["Temperature changes", "Precipitation changes", "Extreme weather events", "Sea level rise"],
      multiSelect: true
    },
    {
      text: "What's your primary motivation for assessing climate risks?",
      options: ["Regulatory compliance", "Financial planning", "Operational resilience", "Corporate responsibility"],
      multiSelect: false
    }
  ]
};

const commonQuestions = [
  {
    text: "How prepared do you feel for future climate-related risks?",
    options: ["Very prepared", "Somewhat prepared", "Not very prepared", "Not at all prepared"],
    multiSelect: false
  },
  {
    text: "Do you currently use weather or climate forecasting data? (Select all that apply)",
    options: ["National Weather Service", "ECMWF Forecasts", "NOAA Forecasts", "In-house Meteorological Service", "Other Third-Party Provider", "No, we don't use any"],
    multiSelect: true
  },
  {
    text: "Where does extreme weather impact your business operations? (Select all that apply)",
    options: ["Agricultural Productivity", "Energy Production and Consumption", "Infrastructure Damage, Repairs, and Resilience", "Supply Chain Disruptions", "Insurance Claims and Payouts", "Financial Investments", "Regulatory Compliance", "Other"],
    multiSelect: true
  },
  {
    text: "Which of your current processes are ready for extreme weather events? (Select all that apply)",
    options: ["Operational Processes", "Supply Chain Management", "Risk Management Strategies", "Emergency Response Protocols", "None"],
    multiSelect: true
  },
  {
    text: "Which of the following services would be most beneficial for your business in mitigating climate risk? (Select all that apply)",
    options: ["Adaptive Risk Management", "Advanced Site Selection Intelligence", "Energy Production/Demand Forecasting", "Other", "None of the Above"],
    multiSelect: true
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [industry, setIndustry] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    if (currentQuestion === 0) {
      setIndustry(answer);
      setAnswers({ ...answers, 0: answer });
      setCurrentQuestion(1);
    } else {
      const question = getCurrentQuestion();
      if (question.multiSelect) {
        const currentAnswers = answers[currentQuestion] || [];
        const updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        setAnswers({ ...answers, [currentQuestion]: updatedAnswers });
      } else {
        setAnswers({ ...answers, [currentQuestion]: answer });
        moveToNextQuestion();
      }
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < getTotalQuestions() - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getTotalQuestions = () => {
    return industry ? industryQuestions[industry].length + commonQuestions.length + 1 : Object.keys(industryQuestions).length;
  };

  const getCurrentQuestion = () => {
    if (currentQuestion === 0) {
      return {
        text: "What industry is your business in?",
        options: Object.keys(industryQuestions),
        multiSelect: false
      };
    } else if (currentQuestion <= industryQuestions[industry].length) {
      return industryQuestions[industry][currentQuestion - 1];
    } else {
      return commonQuestions[currentQuestion - industryQuestions[industry].length - 1];
    }
  };

  const getRecommendation = () => {
    const preparedness = answers[industryQuestions[industry].length + 1];
    if (preparedness === "Very prepared" || preparedness === "Somewhat prepared") {
      return `Your ${industry.toLowerCase()} business seems to have a good foundation for climate resilience. Consider exploring our advanced forecasting tools to further enhance your preparedness.`;
    } else {
      return `Your ${industry.toLowerCase()} business may benefit from more robust climate risk planning. Our forecasting tools can help you anticipate and prepare for future weather-related challenges specific to your industry.`;
    }
  };

  const exportToCSV = () => {
    const csvContent = Object.entries(answers).map(([questionNumber, answer]) => {
      const question = questionNumber == 0 
        ? "Industry" 
        : (industryQuestions[industry][questionNumber - 1] || commonQuestions[questionNumber - industryQuestions[industry].length - 1]).text;
      return `"${question}","${Array.isArray(answer) ? answer.join(';') : answer}"`;
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "climate_risk_assessment.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (showResults) {
    return (
      <div className="App">
        <h1>Assessment Results for {industry}</h1>
        <div className="result">
          <h2>Recommendation</h2>
          <p>{getRecommendation()}</p>
        </div>
        <div className="next-steps">
          <h2>Next Steps:</h2>
          <ul>
            <li><a href="https://www.planette.ai/energy">See how we forecast environmental variables for {industry}</a></li>
            <li><a href="https://www.planette.ai/forecasts">Explore our AI-enhanced forecast details</a></li>
            <li><a href="https://www.planette.ai/contact-us">Contact us for a discovery call and demo</a></li>
          </ul>
        </div>
        <button onClick={exportToCSV} className="next-button">Export Answers to CSV</button>
      </div>
    );
  }

  const question = getCurrentQuestion();

  return (
    <div className="App">
      <h1>5-Minute Climate Risk Assessment</h1>
      <p>Question {currentQuestion + 1} of {getTotalQuestions()}</p>
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswer(option)}
            className={question.multiSelect && answers[currentQuestion]?.includes(option) ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      {question.multiSelect && (
        <button onClick={moveToNextQuestion} className="next-button">Next</button>
      )}
    </div>
  );
}

export default App;