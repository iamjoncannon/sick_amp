import React from 'react';
import styled from 'styled-components'
import SearchBar from '../../Components/SearchBar'
import { Store } from '../../store/Store'

const FieldLabel = styled.span`

    position: absolute;
    opacity: .1;
    font-size: 4vh;
    bottom: 0;
    right: 5vh;
`

const Selector = styled.div`
    width: 90%;
    height: 68%;
    padding: 2px;
    border: 1px solid rgba( 255, 255, 255, 0.25 );
    margin-top: 5px;
    overflow: scroll;

    display: flex;
    flex-direction: column;
    align-items; center;
`

const FieldFilter = (props: any) => {
    
    const { state, dispatch } = React.useContext(Store);

    const { Songs, SearchBarText } = state 

    const { field } = SearchBarText[props.field]

    let deduplication_field_set 

    if(Songs){

        deduplication_field_set = Array.from(new Set(Object.values(Songs).map(song=>song[field])))
    }

    return (
        <>
            <SearchBar target={props.field}/>
            <Selector>

                {Songs && deduplication_field_set.map(field=>{
                    
                    console.log(field)

                    return (
                        <span>{field}</span>
                    )
                    
                })}

            </Selector>
            { !SearchBarText[props.field].text && <FieldLabel>{field}</FieldLabel> }
        </>
    )
}

export default FieldFilter
