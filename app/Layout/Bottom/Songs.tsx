import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import * as Types from '../../store/Types'
import SongTable from './SongTable'
import { sortColumns } from './Helpers'
import { hydrateColumns } from '../../store/Thunks'

const SongSectionContainer = styled.div`
    width: 86vw;
    font-size: 2vh;
    overflow-x: scroll;
    background-color: ${props=>props.theme.primaryColor};
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`

const PlayListFilterContainer = styled.div`
    height: 15vh;
    background-color: ${props=>props.theme.tertiaryColor}
`

const Songs = () => {

    const { state, dispatch } = React.useContext(Store);
    
    React.useEffect( ()=>{
    
        if(state.Columns === null){
    
            hydrateColumns(state.token, dispatch)
            
          }
    })
    
    return (

        <SongSectionContainer>

            <PlayListFilterContainer>

            </PlayListFilterContainer>
            
            { !!state.Columns && 
              !!state.PlayLists && 
              !!state.Songs && 
              <SongTable /> }

        </SongSectionContainer>
    )
}

export default Songs

