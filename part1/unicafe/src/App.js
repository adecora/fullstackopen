import React, { useState } from "react";

const Statistics = ({ feedback: [good, neutral, bad] }) => {
    const all = good + neutral + bad;
    const avg = (good * 1 + bad * -1) / all;

    return (
        <div>
            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {all}</div>
            <div>average {avg}</div>
            <div>positive {good / all}%</div>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics feedback={[good, neutral, bad]} />
        </div>
    );
};

export default App;
