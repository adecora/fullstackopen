import React from "react";

const Course = ({ course: { name, parts } }) => (
    <div>
        <Header course={name} />
        <Content parts={parts} />
    </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, exercises }) => (
    <p>
        {part} {exercises}
    </p>
);

const Content = ({ parts: [part1, part2, part3] }) => (
    <div>
        <Part part={part1.name} exercises={part1.exercises} />
        <Part part={part2.name} exercises={part2.exercises} />
        <Part part={part3.name} exercises={part3.exercises} />
    </div>
);

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
        ],
    };

    return <Course course={course} />;
};

export default App;
