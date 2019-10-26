import React from 'react';
import {Store} from './Store'
import styled from 'styled-components'
import * as Types from './Types'

const SongSectionContainer = styled.div`
    height: 100vh;
    width: 75vw;
    background-color: grey;
    border: 1px solid black;
    display: flex;
    flex-direction: column;


`

const Songs = (props : any) => {

    const { state, dispatch } = React.useContext(Store);

    return (
        <SongSectionContainer>
            
            { !!state.Songs 
                && Object.entries(state.Songs)
                    .map( (song : [string, Types.SongObject] ) =>{

                return <span key={song[0]}>{song[1].TITLE}</span>
            })}

        </SongSectionContainer>
    )
}

export default Songs
