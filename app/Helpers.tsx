import * as Types from '../../store/Types'

/* 

we have to sort through the songs and find 
all the possible categories- later we will build
out a feature to allow the user to filter the  
columns

*/

export function sortColumns( data : Types.songStateType ){
    
    interface ColumnHashType {
        [ ColumnName : string] : Boolean  
    }

    const ColumnHash : ColumnHashType = {}

    Object.entries(data).forEach( ( item : [string, Types.SongObject]) =>{

        Object.entries(item[1]).forEach(( song : [string, string])=>{

            if(song[0] !== "ID" && typeof song[1] === "string"){

                ColumnHash[song[0]] = true
            }
        })
    })

    return ColumnHash
}

export const getDevice = () => {

    if( window.outerWidth > 1100){

        return 'desktop'
    }
    
    if(window.outerWidth < 601){
        
        return 'cell'
    }

    return 'tab'
}