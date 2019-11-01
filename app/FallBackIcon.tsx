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

const generateXBlinker = (num) => {

    return Array(num).fill(null).map((x,i)=> {
        return `
        span:nth-child(${i+1}){
            animation: blink ${ (i+1) * .5}s;
        }
    `
    }).join(" ")
}

const LoadingDots = styled.div`

    height: auto;
    width: auto;
    font-size: 20vh;

    @keyframes blink {

        0% {

          opacity: 0;
        }
        100% {

          opacity: 1;
        }
    }
    
    ${generateXBlinker("rekord_pool".split("").length)}
`

const FallbackIcon = () => {

    const icon = "rekord_pool".split("").map( (x,i) => <span key={i}>{x}</span>)

    return (
        <GlobalContainer>

            <IconContainer>
                <LoadingDots>
                {icon}
                </LoadingDots>
            </IconContainer>
        </GlobalContainer>

    )
}

export default FallbackIcon 