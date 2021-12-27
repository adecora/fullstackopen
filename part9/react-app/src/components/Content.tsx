import React from 'react';

interface coursePart {
    name: string;
    exerciseCount: number
}

const Content = ({ course }: { course: coursePart[] }) => {

    return (
        <div>
            {course.map((part, id) => (
                <p key={`${part.name}-${id}`}>{part.name} {part.exerciseCount}</p>
            ))}
        </div>
    );
}

export default Content;