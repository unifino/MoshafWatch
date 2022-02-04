// -- =====================================================================================

export type ThemeName = 
      'White' 
    | 'Smoky' 
    | 'Milky' 
    | 'Black' 
    | 'CoolGreen' 
    | 'DarkGreen' 
    | 'WarmBlue' 
    | 'CozyBlue' 
    | 'AppBlue' 
    ;

export type ThemeNameName_Light = 
      'White'
    | 'Smoky'
    | 'Milky'
    ;

export type ThemeName_Dark = 
      'Black'
    | 'CoolGreen' 
    | 'DarkGreen' 
    | 'GreatGray' 
    | 'WarmBlue' 
    | 'CozyBlue' 
    | 'AppBlue'
    ;

export enum BGColors { 

    White       = "#FFFFFF" ,
    Smoky       = "#e6e6e6" ,
    Milky       = "#fcefe6" ,
    Black       = "#000000" ,
    CoolGreen   = "#08332f" ,
    DarkGreen   = "#0a1c20" ,
    GreatGray   = "#1e2c2f" ,
    WarmBlue    = "#125689" ,
    CozyBlue    = "#3181a6" ,
    AppBlue     = "#135f82" ,

}

// .. the value use for className
export enum B_W {
    Black = "light",
    White = "dark"
}

export enum contentColorType { 

    White       = B_W.Black ,
    Smoky       = B_W.Black ,
    Milky       = B_W.Black ,
    Black       = B_W.White ,
    CoolGreen   = B_W.White ,
    DarkGreen   = B_W.White ,
    GreatGray   = B_W.White ,
    WarmBlue    = B_W.White ,
    CozyBlue    = B_W.White ,
    AppBlue     = B_W.White ,

}

// -- =====================================================================================

export type here =

      'Welcome'
    | 'Unity'

    | 'Base_00'
    | 'Qertas'

    | 'Base_01'
    | 'Paper'

    | 'Base_10'
    | 'Najwa'

    | 'Lookup'
    ;

// -- =====================================================================================

export type vahy = {
    aID: number,
    text: string,
    type: Kalam
}[];

// -- =====================================================================================

export type Kalam =
      "quran"
    | "number"
    | "ESM"
    | "sajdeh"
    | "hadith"
    | "salam"
    | "green"
    | "alaem"
    | "najwa"
    | "BREAKLINE"
    | "BIG_BREAKLINE"
    ;

// -- =====================================================================================

export type Source = "Q" | "H" | "N" | "T" | "C";

// -- =====================================================================================

export type searchChannels = "phrase" | "history" | "favorite" | "tag";

// -- =====================================================================================

export type RawBound = [ string, string ][];

// -- =====================================================================================

export type ItemFound = {
    id              : number    ,
    text            : string    ,
    source          : Source    ,
    flags           : Flags     ,
};

export type Flags = {
    isBounded?      : boolean   ,
    isHeader?       : boolean   ,
    isCached?       : boolean   ,
    count?          : number    ,
    address?        : string    ,
}

// -- =====================================================================================

export type CakeBound = {
    [key: string]: string[],
}

// -- =====================================================================================

export type Path = { 
    [ K in here ]?: { 
        page: any,
        transition: TransitionNames,
        duration: number,
    } 
}

export type TransitionNames = AndroidTransitionNames;
// {
//     ios: AndroidTransitionNames | IOSTransitionNames,
//     android: AndroidTransitionNames
// }
// type IOSTransitionNames = "curlUp" | "curlDown";
type AndroidTransitionNames = 
      "explode" 
    | "fade"
    | "flipRight"
    | "flipLeft"
    | "slideLeft"
    | "slideRight"
    | "slideTop"
    | "slideBottom"
    ;

// -- =====================================================================================

export type hadithCell = {
    0: string,
    9: string,
    a: string,
    b: string,
    c: number,
    d: string,
    n: number,
    cDB: number[],

    aF?: string,    // a in farsiLetters
    bF?: string,    // b in farsiLetters
}
export type HDB = hadithCell[];

export type Hadith = {
    from: string,
    salam: string,
    kalamat: { text: string, isGreen: boolean }[],
    arabi: string,
    farsi: string,
    source: string,
    toShare: string,
    obj: hadithCell,
};

// -- =====================================================================================

export type DisplayTypes = "List_1" | "List_2" | "Flex_T" | "Flex_B";

// -- =====================================================================================

export type earthActions =
      "BugReport"
    | "Fav+"
    | "Fav-"
    | "Bound"
    | "Unbound"
    | "Comment"
    ;

export type earthParcel = [ "H"|"Q", number, string? ];
export type earthValue = earthParcel | [ earthParcel, earthParcel ];

export type earthRaw = [ earthActions, earthValue ]