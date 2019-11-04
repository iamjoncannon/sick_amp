import React from 'react';
import styled from 'styled-components'
import { Store } from '../../store/Store'
import { postPlayList, putPlayList } from '../../store/Thunks'

const EditablePlayListContainer = styled.div`

    margin-top:${props=> props.new && "1vh"}
    padding: .5rem;
    
    input {
        border: none
    }
`

interface EditorProps {
    readonly isEditing : Boolean
    size: number
    value: string
    autoFocus : Boolean
}

const Editor = styled.input<EditorProps>`
    background-color: transparent;
    color: white;
    display: inline-block;
    margin: 0;
    padding: 0;
    font-size: 1.75vh;
`

interface ComponentProps {

    initialValue : string 
    new : boolean
}

const EditablePlayList = (props: ComponentProps) => {

    const whichStore = process.env.NODE_ENV === 'test' ? require('./EditablePlayList.test').MockStore : Store ;

    const { state, dispatch } = React.useContext(whichStore);
    const [ value, handleChange ] = React.useState(props.initialValue)

    const handleKeyPress = (e) => {

        if(e.key === "Enter"){

            if(props.new){

                postPlayList( e.target.value, state.token, dispatch)
            }
            else{

                putPlayList( e.target.value, state.token, dispatch)
            }
        }
    }

    return (

        <EditablePlayListContainer new={props.new}>

            <Editor
                autoFocus
                onKeyPress={handleKeyPress}
                onChange={(e : any)=> handleChange(e.key) }
                value={value}
                onFocus={(e: any)=> e.target.select() }
                onMouseLeave={()=>dispatch({type:"CANCEL_UPDATE_PLAYLISTS"})}
            />

        </EditablePlayListContainer>
    )
}

export default EditablePlayList