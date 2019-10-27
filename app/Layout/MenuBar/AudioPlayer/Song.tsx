import React from 'react';
import styled from 'styled-components'

const SongContainer = styled.div`

    user-select: none;
    margin: 0 20px;

    .song__title {
      text-align: left;
      margin: 0;
      color: white;
      font-family: "Permanent Marker", cursive;
      font-weight: normal;
      font-size: 3.5em;

      &:hover {
        color: greenyellow;
      }
    }

    .song__artist {
      margin: 0;
      color: white;
      font-family: "Rock Salt", cursive;
      font-weight: normal;
      font-size: 1em;

      &:hover {
        color: greenyellow;
        cursor: pointer;
      }
    }
`

function Song(props) {

  const { songName, songArtist } = props;
  
  return (
    <SongContainer>
    
      <h1 className="song__title">{songName}</h1>
      <h2 className="song__artist">{songArtist}</h2>
    
    </SongContainer>
  )
}

export default Song;
