import React from 'react';
const useState = (React as any).useState;
const useEffect = (React as any).useEffect;
import styled from 'styled-components'
import * as Types from './Types'
import { StoreProvider, Store } from './Store'
import Songs from './Songs'
import PlayLists from './PlayLists'
import Player from '../MenuBar/Player'

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const PlayListDND = () => {

    return (

        <StoreProvider>
            <Container>
                <Player />
                <PlayLists />      
             
                <Songs />
           
            </Container>
        </StoreProvider>
    )
}

export default PlayListDND
