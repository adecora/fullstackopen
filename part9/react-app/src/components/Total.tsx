import React from 'react';

const Total = ({ total }: { total: number }) => {
    const totalStyle = {
        marginTop: 50
    }

    return (
        <p style={totalStyle}>Number of exercises {total}</p>
    )
}

export default Total;