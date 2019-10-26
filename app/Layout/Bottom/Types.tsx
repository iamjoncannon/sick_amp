export interface SongObject {
    ID: number 
    ALBUM: string 
    TITLE: string 
    ARTIST: string 
    TRACKNUMBER: string
}

export interface Playlist {
    Title: string
    id: number
    ids: number[]
}

export interface Store {
    isHydrated: boolean
    SelectedPlaylist: number
    PlayLists : Playlist[] | void 
    Songs: SongObject[] | void 
}

