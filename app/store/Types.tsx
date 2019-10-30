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

export interface HydrationHash {
    [ key: number ] : boolean
}

export interface PlayList {

    created_at: string  // "2019-10-29T20:22:51.949220+00:00"
    files: number[]     // (67) [1, 6, 13, 15, 22, 24, 27, 28, 33, 34, 36, 44, 46, 47, 48, 49, 57, 59, 62, 64, 67, 68, 72, 75, 79, 85, 90, 91, 96, 97, 103, 105, 106, 107, 108, 110, 111, 112, 114, 116, 117, 120, 124, 129, 134, 136, 137, 138, 140, 143, 146, 152, 157, 161, 163, 164, 168, 170, 172, 177, 179, 180, 187, 188, 190, 197, 200]
    id: number          // 1
    name: string        // "Sick Jams 3"
    slug: string        // "sick-jams-3"
    updated_at: string  // "2019-10-29T20:22:52.255682+00:00"
    user: number        // 1
    hydrated: HydrationHash  // holds the pages that have been loaded 
}

export interface PlaylistState {
    [key : number] : PlayList
    All : number[]
}

export interface Transport {
    previous: number | void 
    current: number | void
    next: number | void
}

export interface Column {
    created_at: string    // "2019-10-29T19:50:51.090719+00:00",
    id: number            // 15,
    name: string          // "year",
    options: string[]     // 
    searchable: boolean   // false
    type: string          // "int",
    updated_at: string    // "2019-10-29T19:50:51.090736+00:00"
}

export interface Store {
    Transport : Transport 
    isPlaying: Boolean
    draggedOverPlaylist: Boolean    

    Columns : Column[]
    
    PlayLists : PlaylistState | void 
    SelectedPlaylist: number | string | void
    RunningPlaylist: number | string | void
    
    Songs: songStateType | void 
}

