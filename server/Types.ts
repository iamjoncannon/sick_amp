export interface SongObject {
    ID: number 
    ALBUM: string 
    TITLE: string 
    ARTIST: string 
    TRACKNUMBER: string
    FILENAME? : string
}

export interface songStateType {
    [ key: number ] : SongObject
}

export interface Playlist {
    Title: string
    id: number
    ids: number[]
}

export interface returnDataType {
    Songs: songStateType
    PlayLists: Playlist[]
}
