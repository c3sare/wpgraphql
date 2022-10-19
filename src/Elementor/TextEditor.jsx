import React from 'react';

const TextEditor = ({editor, text_columns}) => {

    return (
        <div style={{columnCount: text_columns}} dangerouslySetInnerHTML={{__html: editor}}/>
    )
}

export default TextEditor;