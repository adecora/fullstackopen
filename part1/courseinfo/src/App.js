import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
);

const Content = (props) => {
    const [part1, part2, part3] = props.parts;

    return (
        <div>
            <Part part={part1.name} exercises={part1.exercises} />
            <Part part={part2.name} exercises={part2.exercises} />
            <Part part={part3.name} exercises={part3.exercises} />
        </div>
    );
};

const Total = (props) => {

    const total = props.parts.reduce((acc, act) => acc + act["exercises"], 0);

    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10,
        },
        {
            name: "Using props to pass data",
            exercises: 7,
        },
        {
            name: "State of a component",
            exercises: 14,
        },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default App;
