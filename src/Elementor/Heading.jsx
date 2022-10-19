import React from 'react';

const Heading = ({align, title}) => {

    return (
        <h2 style={{textAlign: align}}>{title}</h2>
    )
}

export default Heading;