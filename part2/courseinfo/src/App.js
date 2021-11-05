import React from "react";

const Course = ({ course: { name, parts } }) => (
    <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total exercises={parts.map((part) => part.exercises)} />
    </div>
);

const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part, exercises }) => (
    <p>
        {part} {exercises}
    </p>
);

const Content = ({ parts }) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
    </div>
);

const Total = ({ exercises }) => {
    const total = exercises.reduce((total, act) => (total += act), 0);

    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    );
};

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
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
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    );
};

export default App;
