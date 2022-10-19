import React from 'react';

const Image = ({image:{alt, url}}) => {

    return (
        <img src={url} alt={alt}/>
    )
}

export default Image;