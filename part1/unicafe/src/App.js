import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ feedback: [good, neutral, bad] }) => {
    const all = good + neutral + bad;
    const avg = (good * 1 + bad * -1) / all;
    const positive = (good / all) * 100;

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <div>No feedback given</div>
            </div>
        );
    }
    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={avg.toFixed(2)} />
                    <StatisticLine
                        text="positive"
                        value={`${positive.toFixed(1)} %`}
                    />
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <Statistics feedback={[good, neutral, bad]} />
        </div>
    );
};

export default App;
