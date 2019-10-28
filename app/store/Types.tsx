export interface SongObject {
    ID: number 
    ALBUM: string 
    TITLE: string 
    ARTIST: string 
    TRACKNUMBER: string
    FILENAME: string
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

export interface Transport {
    previous: number | void 
    current: number | void
    next: number | void
}

export interface Store {
    Transport : Transport 
    isPlaying: Boolean
    SelectedPlaylist: number | string | void
    RunningPlaylist: number | string | void
    PlayLists : PlaylistState | void 
    Songs: songStateType | void 
    ColumnHash : { [ Column : string] : Boolean} | void 
    draggedOverPlaylist: Boolean    
}

