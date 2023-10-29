import React from 'react';

interface Props {
    deg: number;
}

const Circle: React.FC<Props> = ({ deg }) => {
    return (
        <img
            src="/circle1.svg"
            style={{
                transform: `rotate(${deg}deg)`,
                width: '103px',
                height: '103px',
            }}
        />
    );
}

export default Circle;
