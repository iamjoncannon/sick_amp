import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { Store } from '../../store/Store'

const Container = styled.div`

    position: absolute;
    left: 22vh;

    svg {
        margin-right: 2vh;
        color: ${props=>props.theme.fontColor};
        cursor: pointer; 

        &:hover {
            opacity: .5;
        }
    }
`

const Transport = ( ) => {

    const { state, dispatch } = React.useContext(Store);

    const handleTransport = (action: string) => {

        dispatch({ type: action, payload: null})
    }

    return ( 
        <Container>
            
            <FontAwesomeIcon 
                icon={faBackward} 
                onClick={()=>handleTransport("PLAY_PREVIOUS_TRACK")}
            />
            
            <FontAwesomeIcon 
                icon={ !state.isPlaying ? faPlay : faPause} 
                onClick={()=>handleTransport("TOGGLE_PLAYERSTATE")}
            />
                        
            <FontAwesomeIcon 
                icon={faForward} 
                onClick={()=>handleTransport("PLAY_NEXT_TRACK")}
            />

        </Container>
    )
}

export default Transport