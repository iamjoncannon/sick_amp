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

// highlightedSong
// select up and down with keys 

export interface Store {
    SelectedPlaylist: number
    PlayLists : Playlist[] | void 
    Songs: songStateType | void 
}

