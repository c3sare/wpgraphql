import React from 'react';

const Section = ({children}) => {

    return (
        <div style={{width: '100%', display: 'flex'}}>
            {children}
        </div>
    )
}

export default Section;