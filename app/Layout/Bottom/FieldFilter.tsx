import React from 'react';
import styled from 'styled-components'
import SearchBar from '../../Components/SearchBar'
import { Store } from '../../store/Store'

const FieldLabel = styled.span`

    position: absolute;
    opacity: .1;
    font-size: 5vh;
    bottom: 0;
    right: 5vh;
    z-index: 1;
`

const Selector = styled.div`
    width: 90%;
    height: 80%;
    padding: 2px;
    border: 1px solid ${props=>props.theme.boxColor};
    margin-top: 5px;
    overflow: scroll;
    font-size: 1.5vh;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items; center;

    .selected {

        background-color: ${props=>props.theme.logoColor};
    }

    span {

        display: block;
        width: 100%;
        margin-top: 2px;
        &:hover {
            text-decoration: underline;
        } 
    }
`

const FieldFilter = (props: any) => {
    
    const { state, dispatch } = React.useContext(Store);

    const { Songs, SearchBarText, FilterState } = state 

    const { field, text } = SearchBarText[props.field]

    const handleClick = (e) => {

        const { id } = e.target

        dispatch({type: "MUTATE_FILTERSTATE", payload: { field, value: id }})

    }

    let deduplicated_field_set 

    if(Songs){

        deduplicated_field_set = Array.from(new Set(Object.values(Songs).map(song=>song[field])))
    }

    if(text){

        deduplicated_field_set = deduplicated_field_set.filter( field => field && field.includes(text) )
    }

    return (
        <>
            <SearchBar target={props.field}/>
            <Selector>

                {Songs && deduplicated_field_set.map(this_field=>{

                    let isSelected = false 

                    if( FilterState[field] ){

                        if(FilterState[field][this_field]){
                            isSelected = true 
                        }
                    }

                    return (
                        <span
                            key={this_field}
                            id={this_field}
                            onClick={handleClick}
                            className={isSelected ? "selected": undefined}
                        >{this_field}</span>
                    )
                    
                })}

            </Selector>
            <FieldLabel>{field}</FieldLabel>
        </>
    )
}

export default FieldFilter
