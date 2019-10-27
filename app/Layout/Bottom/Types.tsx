export interface SongObject {
    ID: number 
    ALBUM: string 
    TITLE: string 
    ARTIST: string 
    TRACKNUMBER: string
}

export interface songStateType {
    [ key: number ] : SongObject
}

export interface Playlist {
    Title: string
    id: number
    ids: number[]
}

export interface PlaylistState {
    [key : number] : Playlist
}

export interface Store {
    SelectedPlaylist: number | void
    PlayLists : PlaylistState | void 
    Songs: songStateType | void 
    ColumnHash : { [ Column : string] : Boolean} | void 
}
