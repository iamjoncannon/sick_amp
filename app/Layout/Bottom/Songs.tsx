import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import SongTable from './SongTable'
import { hydrateColumns } from '../../store/Thunks'
import PlayListFilters from './PlayListFilters'

const SongSectionContainer = styled.div`
    width: 86vw;
    font-size: 2vh;
    overflow-x: scroll;
    background-image: ${props=>props.theme.primaryColor};
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`

const Songs = (props: any) => {

    const { state, dispatch } = React.useContext(Store);
    
    React.useEffect( ()=>{
    
        if(state.Columns === null){
    
            hydrateColumns(state.token, dispatch)
            
          }
    })
    
    return (

        <SongSectionContainer>

            <PlayListFilters />
            
            { !!state.Columns && 
              !!state.PlayLists && 
              !!state.Songs && 
              <SongTable /> }

        </SongSectionContainer>
    )
}

export default Songs

