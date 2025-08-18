
import { useState } from "react";
import "./index.css"

// Botón simple
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

// Fila de estadísticas
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Tabla de estadísticas
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p className="no-feedback">No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Total" value={total} />
        <StatisticsLine text="Average" value={average.toFixed(2)} />
        <StatisticsLine text="Positive" value={positive.toFixed(1) + " %"} />
      </tbody>
    </table>
  );
};

// App principal
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [reset, setReset] = useState(0);


  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  const handleReset = () => {
  setGood(0);
  setNeutral(0);
  setBad(0);
};

  const total = good + neutral + bad;
  const score = good * 1 + neutral * 0 + bad * -1;
  const average = total === 0 ? 0 : good / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
    <div className="app-container">
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={handleGood} text="Good" />
        <Button handleClick={handleNeutral} text="Neutral" />
        <Button handleClick={handleBad} text="Bad" />

        <Button handleClick={handleReset} text="Reset" />
      </div>

      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
