import React from 'react';
import styled from 'styled-components'

const IconContainer = styled.div`
    color: ${props=>props.theme.fontColor}
    position: absolute;
    left: 5vh;
    font-size: 2vh;
    font-weight: bold;
    cursor: default;
`

const Icon = () => {

    return (

        <IconContainer>
            <span>sick_amp</span>
        </IconContainer>
    )
}

export default Icon 