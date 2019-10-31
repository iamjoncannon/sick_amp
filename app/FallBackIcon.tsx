import React from 'react';
import styled from 'styled-components'

const GlobalContainer = styled.div`
    background-color: #3F3F3F;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const IconContainer = styled.div`

    color: #E0E0E0;
    font-size: 10vw;
    font-weight: bold;
    cursor: default;
    background-color: rgba(255, 0, 0, .25);
    padding: .5vh 1vh .5vh 1vh;
    border-radius: 1vh;
`

const FallbackIcon = () => {

    return (
        <GlobalContainer>

            <IconContainer>
                <span>rekord_pool</span>
            </IconContainer>

        </GlobalContainer>

    )
}

export default FallbackIcon 