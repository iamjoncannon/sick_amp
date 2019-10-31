import React from 'react';
import styled from 'styled-components'

const IconContainer = styled.div`

    color: ${props=>props.theme.fontColor};
    position: absolute;
    left: 5vh;
    font-size: 2vh;
    font-weight: bold;
    cursor: default;
    background-color: ${props=>props.theme.logoColor};
    padding: .5vh 1vh .5vh 1vh;
    border-radius: 1vh;
`

const Icon = () => {

    return (

        <IconContainer>
            <span>rekord_pool</span>
        </IconContainer>
    )
}

export default Icon 