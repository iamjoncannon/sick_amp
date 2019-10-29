import React from 'react';
const useState = (React as any).useState;
const useEffect = (React as any).useEffect;
import styled from 'styled-components'
import * as Types from '../../store/Types'
import { StoreProvider, Store } from '../../store/Store'
const Songs = React.lazy(() => import('./Songs'))
// import Songs from './Songs'
import PlayLists from './PlayLists'

import Audio from '../MenuBar/AudioPlayer/Audio'

const Container = styled.div`
    color: ${props=>props.theme.fontColor}
    display: flex;
    flex-direction: row;
`

const PlayListDND = () => {

    return (
        <Container>

            <PlayLists />      
            
            <Songs />
        
        </Container>
    )
}

export default PlayListDND
