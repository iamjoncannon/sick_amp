import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import * as Types from '../../store/Types'
import SongTable from './SongTable'
import { sortColumns } from './Helpers'

const SongSectionContainer = styled.div`
    width: 86vw;
    font-size: 2vh;
    overflow-x: scroll;
    background-color: grey;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`

const Songs = () => {

    const { state, dispatch } = React.useContext(Store);

    return (

        <SongSectionContainer>

            <div style={{height: "15vh"}}></div>
            
            { !!state.ColumnHash && <SongTable /> }

        </SongSectionContainer>
    )
}

export default Songs

