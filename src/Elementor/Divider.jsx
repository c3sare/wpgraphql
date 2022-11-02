import React from 'react';
import styled from 'styled-components';

const DividerWrapper = styled.div`
    width: 100%;
    text-align: ${props => props.align};
    padding: 15px 0;
`;

const DividerStyled = styled.div`
    width: ${props => `${props.width.size}${props.width.unit}`};
    position: relative;
    height: 20px;
    &:before {
        content: "";
        width: 100%;
        height: 1px;
        border-top: 1px solid black;
        position: absolute;
        top: 9px;
    }
`

const Divider = (props) => {
    const {width, align} = props;
    console.log(props);

    return (
        <DividerWrapper align={align}>
            <DividerStyled width={width}/>
        </DividerWrapper>
    )
}

export default Divider;