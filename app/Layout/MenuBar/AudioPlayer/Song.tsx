import React from 'react';
import styled from 'styled-components'
import { Store } from '../../../store/Store'

const SongInfoContainer = styled.div`

    user-select: none;
    color: ${props=>props.theme.fontColor};
    display: flex;
    flex-direction: column;
    
    span:first-child{
      font-weight: bold;
      font-size: 1.6vh;
    }

    span:last-child{
      font-weight: 100;
      font-size: 1.6vh;
    }

`

function Song() {

  const { state, dispatch } = React.useContext(Store);
  
  let selectedTrackObject
  
  if(!!state.Songs){

    selectedTrackObject = state.Songs[state.Transport.current]
  } 

  return (
    <SongInfoContainer>

      {
        !!state.Songs &&
        <> 
          <span>{selectedTrackObject.TITLE || selectedTrackObject.FILENAME}</span>
          <span>{selectedTrackObject.ARTIST || selectedTrackObject.FILENAME} - {selectedTrackObject.ALBUM} </span>
        </>
      }
    
    </SongInfoContainer>
  )
}

export default Song;
