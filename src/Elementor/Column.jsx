import React from 'react';

const Column = ({children, _column_size, _inline_size}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: `${_column_size}%`}}>
            {children}
        </div>
    )
}

export default Column;