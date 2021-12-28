import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ course }: { course: CoursePart[] }) => {

    return (
        <div>
            {course.map(part => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
}

export default Content;