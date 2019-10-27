import React from 'react';
const useState = (React as any).useState;
const useEffect = (React as any).useEffect;
import styled from 'styled-components'
import * as Types from '../../store/Types'
import { Store } from '../../store/Store'

import Audio from '../MenuBar/AudioPlayer/Audio'

const Container = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 6vh;
`

const PlayerStateContainer = styled.div`

    width: 40vw;
    height: 100%;
    background-color: green;
`

const MenuBar = () => {

    return (
        <>
        <Container>
            <PlayerStateContainer>
                <Audio />
            </PlayerStateContainer>
        </Container>
        <div style={{height: "4vh"}}></div>
        </>
    )
}

export default MenuBar 