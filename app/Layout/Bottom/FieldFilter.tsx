import React from 'react';
import styled from 'styled-components'
import SearchBar from '../../Components/SearchBar'
import { Store } from '../../store/Store'

const FieldLabel = styled.span`

    position: absolute;
    opacity: .1;
    font-size: 4vh;
    bottom: 0;

`

const FieldFilter = (props: any) => {
    
    const { state, dispatch } = React.useContext(Store);

    const { field } = SearchBarText[props.field]

    return (
        <>
            <SearchBar target={props.field}/>
            <FieldLabel>{field}</FieldLabel>
        </>
    )
}

export default FieldFilter
