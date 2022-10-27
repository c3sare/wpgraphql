import React from 'react';
import styled from 'styled-components';

const TextEditor = (props) => {
    const {editor, text_columns, column_gap, column_gap_tablet, column_gap_mobile, drop_cap} = props;

    const TextEditorStyled = styled.div`
        columns: ${text_columns};
        @media (min-width: 1024px) {
            column-gap: ${column_gap?.size || 0}${column_gap?.unit || "px"};
        }

        @media (max-width: 1023.99px and min-width: 768px) {
            column-gap: ${column_gap_tablet?.size || 0}${column_gap_mobile?.unit || "px"};
        }

        @media (max-width: 767.99px) {
            column-gap: ${column_gap_mobile?.size || 0}${column_gap_mobile?.unit || "px"};
        }

        ${drop_cap === "yes" &&`p:first-child:first-letter {
            float: left;
            text-align: center;
            line-height: 1;
            font-size: 50px;
        }`}
    `
    console.log(props);

    return (
        <TextEditorStyled dangerouslySetInnerHTML={{__html: editor}}/>
    )
}

export default TextEditor;