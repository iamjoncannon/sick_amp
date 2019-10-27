import React from 'react';
import { Store } from './Store'
import styled from 'styled-components'
import * as Types from './Types'
import SongTable from './SongTable'
import { sortColumns } from './Helpers'

const SongSectionContainer = styled.div`
    height: 100vh;
    width: 90vw;
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
            
            { !!state.ColumnHash && <SongTable /> }

        </SongSectionContainer>
    )
}

export default Songs

