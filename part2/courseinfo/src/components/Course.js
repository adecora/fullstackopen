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

export default Course;
