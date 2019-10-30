export interface SongObject {

    album_artist?: string | void    // null
    artist: string                  // "Jennifer Vanilla-0"
    bit_rate: number                // 320
    bpm: number | void              // 125
    bytes: number                   // 13499904
    created_at: string              // "2019-10-29T16:22:59.137105-04:00"
    download_url: string            // "http://localhost:3030/files/1/download"
    duration: number                // 337.44
    ext: number | void              // null
    fingerprint: string             // "AQADtAuVZJm0BH2wH3kgPij049GF_BF6NDHxsDnODxfCXDk0MkO-E83IFx-LW2jU4h_OFb-C_kS0PMch6kd39DyatDH2PbiU40efIqZ2WE1QacV1_EnRC82L40ZzHfmR8GuHF_5x6fhxvLzgaiUqrQ8KM9IRSod69EdTLUFefEkeXBf-o4lePNvQHw-O_NBIBvng00hvXBaF6x88tkWe4zCPkrpws0TP0nAuvDCPskuD6A_0Y8qR5_jRNZFxLcc_XM9wH2GOysWrI9eN08R9Df3RnCfyQDvC7BfxM6jhow-OSqqwycMVhBeSP-gl48Pk4cmJPkaT1sKf4hFKy0X6Dtp1xBeJH39QCr8Om0JFHr9xnEcpH3mK_7BuVM8QXolxH2WSFDkzIzmq3EYT5ziPfvCPK8sXpA30H3nxXzjuHOfx5Ph4_EcavYb2IzjqNBWaikcOLXmO8MmPOiK8ZLByVB_yQXuIptsD_Cv05gjJ8LCj4zcc6-gycbgRZj3uwz9q8bgOrdEOf4gtHFZ0eEt2PPaGVPmhJzJc7cgn40eXcEYOFaH1BI2DEz9KScpRObNwIT-0JwrSGP1xfDt64_g4RCIPeQ6aNDSyXLiW68gvaOWFLNnxF3uPUkdDwjuS8wquI50c415wDke9IZV0nNyh-0hzXJqD7zBRnqgl5YLTLzjCJIPOBT_Cq2gm8Yjz4Me1o-GPPyn0oMKzQ90e_Efzo1d2vOjh5ErhaUelqNDzIN9xHV5wrfgkBXd-NH0QvYeXHBpJC_vxC30Kh4sOUdmFasuRn_jhiCE-3BfC5D3EH7UyH3l0obzRhBKuZY9R0XmE5siDcjqaqrihHvlRBU-CUsalGHl0-A_0Bdf24iIqHc1zXEfTE9qlB00kp0W7RCceHqFM-Beu7XguHGGKk3nwCOKPH-OVwAol_Mh1XHgWH0ePJj_OIz-SOQk54rSPZseTLCWO3gKTLsZ7Ck9GhJYEjcxRJVkupHm0BU0rPEL2A2L84UmO9wXPIPVkPEmC5keWMx9eHU92SIr0ICcenDhC-WiSC4cu7QgzSin6BP2C5jLeZMnxTBfS5Thp6EkSnDi0g0n8Gc9xhccbZLoOPhIcS8fb4zmqPQhz6BmO40d1oRml4x30I4zCodeMxsmEUBcl4c7yoL-gZS-eRcmQS0dXIq8g_niiWkIoHT-qD34S_Al-pGOOLtnxFD20PDmOL8fRfDm6dEY8PcgbC1ocHv2GPhmak7jzoQsfNDz0Lgg_-BbST4d2H90RZulxHdVnovmOKw-OkEsOLaqOq0FO6egjGL1S5D36o4luQT_yxkJz4hF8VD_yfOjyQMtyPESuE9WRHjqPSj_yHj_6yEKT4Dr6rghzHvp0fEcTPQgfhXh5vMmDHPWio9EcqApzvAjzEf2EPkHzHLHzoQsfaCHOELmCIjdxQdwvdPrwHqFuofFw5UIfBmEuHVdPyNrheUcu_Oh1ID-s3IKm6chzNOOCC37QB7FzoVH4BFqRMwsuoWeQyTWEB-GSHt_RR0bzCx--I8yYo-uh1Y_wI9fxw0f4JmiUTDuqP_gP7VEywTORjgTzLMiFu07QqDlK6FmIR0Fz8IbowBe6ZBeuI_w8NB-u4EHz5KjE4_qHfAq8QvqRO-hF-EF3xNKeYFdkaImkJQgfovKPJrSFPLnQaDpKKM7CI7QE50GKH-KPSumH_Oi2yEITXCHR8whTMfgO_UGTjUFILriPKyXyG_3R6BVUHa-MkJ_gBz76jIideej6oBn0LESuoMiNQ7yOLvnwD-FnNDku9D3CnFA15cd7NKyCkJOC48rxoxETHqHu4Q_-I1GyTURdBU_g4zlOmWiU6AilW9CjHD8-SBcqH80OLsKn6EHzfQitROgRps7xZMeT7GimL9DkREGuBT-OUD4afcO1B7q0IMwoGT2-KHB93OFx5oKXB8klxFQSofiFHI4uVBH0H32yoCmPXEmKMM-O2sed5ZCzfGii5OglI4-S48RR-WjED7H64A-SUZJ8NA-aZ6iNJwRnWNGRTVkOXYoqZMenFYGWNB-64OODrGgcEbWSxGhu9Ec2KgvILIeWKEdoMRqeJDiO6kWT9EPeQ1ePkJSCpo3RRwmaH6ey5DhzOEoe5Ie-DDlyQEt8oUqOcw_OIvUk4lqC5omEPkdMZQ-e5Wii5IR2ycgVJTh-hL_RRJ-gH0-jIMxp9EfzKOgd8MmMLjzC_NDD5ciPPkF2k9CRHl1OHO_R3OilBzmh_WjGHMctB-FS_IH1VMiNv0KjH18f6EsRfsEpCcwX_MgZo3KGRjn0JcpxLhfOBBCaHa2KPC9-NM_BXBlyQpN4hIlz_McDhg2aHx-VI0eyvOh-vE_w6JgSbUpQKwqPHw1CK0eTRkcXHfo0nDmmtMmhXkhPwznKmziePkdz9NoR_tASF-9eZDPaJ0IzRiHO40FeaI-ORs_xPgddhFkX9EeoE80p6GFxC1aOfFKOM3rwIJQJ9UZ6lDdxvXiPxjV6od8RxmF6yOnxIQwtlH1QPMhfWO2h6TsensJ7hHGIfuPxHGk_XDRUJ7COZzxyJjOaN0aaH5qOHqlytMf7CE2OXsF-pNdwMTPyoZHUHBMbIQ8e4kN_aNF-5D8AKxQj0BmDkAAMIUcAMQABAIhhQhCgCADCAEUQJEoZRKAFjhREEbBAAWaYIEQIKxTwxCBjACDACBGGZ0ABAYgyRBABBAEIIUWgAQgowwiDBhEBAAICMAAkFkIRS8CxQApHlHLIACIEocYJgAgRziBiAJAECCQENIghSyQCgABqAGBGAKCoMEYIogQDJBgDBAgGACiIQMIIgQQwhgAlIHQAGAKQQAgIhCQQQgIhoEKCkwAJEUAhIhAgQEkiFAWGGwYMwMgBAQwHhiFgHQEIAAKUQIgIIggAiAADgUHIAAEIcEQARKRQBEnDmPDCGKCEQAIIAEASkDhCmCJIKEAEAYYJBwgQRhCiFEIFOICYAcYbo4xhTBijhACCAbEUkQIAR5QBkBjCgBICIGEUg4g0SAQwBAEAjCMIKW2EBEYBQYQQDDGqJFmICqOMEEAIY4kCVAkBoQDEIaYIokpIEgUTQgkoBAIEAQAQEAAQASAgwAnGhBFAGKCYEMIJBIURikDGlCAUCUGIIJA4IoAAxCAhhFBACUIMAAgQRJRkQjBijBMAEEAQYAoZoZhQTDCgCBIMKEEUUcAxg4wgBCloOABGEAGE0AABBRgxABLiFKBGAIAUMAJBAohAyChCmEFCCOgEIUgZASACRBlogAAKASUZEYxAIpwQQBCBQARYAEOgYYQhBoASSkhCEXAEACCEEsAQA6lSCiiBkABCGAagUBAIAagCggAAmFAOkSaMAcQIpQzxCgADlDCOIciMQAIQJAAQSglHoDPUAIKAAkIYIgxUTDAknABICiAUAkA4g4hExhCDCFBCEWEgIooQQgBRghBmlBSCCEaAccQIoIw1AFADBLGAEEKMQUwQ4gRRwAAkjDAAESYUMYABCoggghiAAAAISCKIsEYJQQgighDDDEUAAUIAMYIwCBAlRAACkHKEGEmMAgA8aJVQQAghAA"
    genre: string                   // "disco physics"
    id: number                      // 1
    key: string                     // "Fm"
    mimetype: string                // "audio/mpeg"
    name: string                    // "foo-bar"
    path: string                    // "track/05f9c3b1-7d74-410d-86ce-603b124088da.None"
    sample_rate: number             // 48000
    slug: string                    // "foo-bar"
    source_file_id: number | void   // null
    stereo: boolean | void          // true
    stream_url: string              // "http://localhost:3030/files/1/stream"
    title: string                   // "Space TIme Motion"
    track: number | void            // null
    type: string                    // "track"
    updated_at: string              // "2019-10-29T16:30:13.272837-04:00"
    uuid: string                    // "05f9c3b1-7d74-410d-86ce-603b124088da"
    year: number | void             // null 
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

