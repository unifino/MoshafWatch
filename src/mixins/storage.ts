declare var android; // required if tns-platform-declarations is not installed

// -- =====================================================================================

import * as NS                          from "@nativescript/core"
import * as TS                          from "@/../types/myTypes"
import store                            from "@/store/store"
import { asma, Quran }                  from "@/db/Q/Quran"
// import { Hadith }                       from "@/db/H/Al-Hadith"

// -- =====================================================================================

const exStorage = android.os.Environment.getExternalStorageDirectory();
const SDCard: string = exStorage.getAbsolutePath().toString();

let myFolder            : NS.Folder;// * do not initiate it
export let trace_q_File : NS.File;  // * do not initiate it
export let trace_h_File : NS.File;  // * do not initiate it
export let cloud_File   : NS.File;  // * do not initiate it
let earth_File          : NS.File;  // * do not initiate it

let trace_q     : number[];
let trace_h     : number[];
let cloud: TS.earthRaw[][];
let earth: TS.earthRaw[];

// -- =====================================================================================

export function db_check (): Promise<void> {

    return new Promise ( (rs, rx) => {

        // .. permission policy has been meet, so assign necessarily Folders!
        myFolder  = NS.Folder.fromPath( NS.path.join( SDCard, "Moshaf" ) );

        // .. init
        let bp = myFolder.path;
        trace_q_File = NS.File.fromPath ( NS.path.join( bp, "trace_q.json"  ) );
        trace_h_File = NS.File.fromPath ( NS.path.join( bp, "trace_h.json"  ) );
        cloud_File   = NS.File.fromPath ( NS.path.join( bp, "cloud.json"    ) );
        earth_File   = NS.File.fromPath ( NS.path.join( bp, "earth.json"    ) );

        // .. get Contents
        try { trace_q = JSON.parse( trace_q_File.readTextSync() ) } catch { trace_q = [] }
        try { trace_h = JSON.parse( trace_h_File.readTextSync() ) } catch { trace_h = [] }
        try { cloud   = JSON.parse( cloud_File.readTextSync() )   } catch { cloud   = [] }
        try { earth   = JSON.parse( earth_File.readTextSync() )   } catch { earth   = [] }

        // .. check integrity
        if ( !trace_q ) saveDB( trace_q_File,  [] );
        if ( !trace_h ) saveDB( trace_h_File,  [] );
        if ( !cloud   ) saveDB( cloud_File,    [] );
        if ( !earth   ) saveDB( earth_File,    [] );

        // .. convert cloud and earth DBs to the old format
        let data = db_Parser( [ ...cloud, earth ] );

        store.state.memo.Q    = trace_q;
        store.state.memo.H    = trace_h;
        store.state.fav.Q     = data.fav.Q;
        store.state.fav.H     = data.fav.H;
        store.state.cloud     = cloud;
        store.state.earth     = earth;
        store.state.cakeBound = rawBoundConvertor( data.rawBound );

        // bound_transfer( rawBound );

        // .. resolve
        rs();

    } );

}

// -- =====================================================================================

export async function saveDB ( file: NS.File, data: any[], limit?: number ) {

    if ( limit ) data = data.filter( (x,i) => i > data.length - limit );
    // .. write down file
    file.writeText( JSON.stringify( data ) );

}

// -- =====================================================================================

export function saveTest ( name: string, ext: "html"|"json"|"ts", text: string ) {
    // .. init
    let bp = myFolder.path;
    let testFile = NS.File.fromPath ( NS.path.join( bp, name + "." + ext  ) );
    testFile.writeText( text );
}

// -- =====================================================================================

export function db_Parser ( data: TS.earthRaw[][] ) {

    let fav = { Q: [], H: [] };
    let rawBound: TS.rawBound = [];
    let p: TS.earthParcel;

    for ( let row of data ) {
        for ( let parcel of row ) {

            // ! why we need a declaration over here?!
            p = <TS.earthParcel>parcel[1];

            // .. parcel[0]: TS.earthActions
            switch ( parcel[0] ) {

                case "Fav+":
                case "Fav-": fav = db_PA1( parcel[0], p, fav ); break;

                case "Bound":
                case "Unbound": rawBound = db_PA2( parcel[0], p, rawBound ); break;

                case "Comment":
                    // .. add Comment-Text to the store
                    let id = store.state.comments.push( parcel[1][2] ) -1;
                    rawBound = db_PA3( parcel[0], [ p, [ "C", id ] ], rawBound );
                    break;

                case "BugReport":
                    break;

                default: console.log(parcel); break;

            }

        }
    }

    fav.Q = [ ...new Set( fav.Q ) ];
    fav.H = [ ...new Set( fav.H ) ];

    return { fav, rawBound };

}

// -- =====================================================================================

function db_PA1 ( action: TS.earthActions, pcl: TS.earthParcel, fav ) {

    switch ( action ) {
        case "Fav+": fav[ pcl[0] ].push( pcl[1] ); break;
        case "Fav-": fav[ pcl[0] ] = fav[ pcl[0] ].filter( x => x !== pcl[1] ); break;
    }

    return fav;

}

// -- =====================================================================================

function db_PA2 ( action: TS.earthActions, pcl: TS.earthValue, rawBound: TS.rawBound ) {

    let d: [ string, string ] = [
        (<any>pcl[0]).join( "_" ),
        (<any>pcl[1]).filter( x => x !== null ).join( "_" )
    ];

    switch ( action ) {
        case "Bound": rawBound.push( d ); break;
        case "Unbound":
            rawBound = rawBound.filter( x =>
                !(
                    ( x[0] === d[0] && x[1] === d[1] ) ||
                    ( x[0] === d[1] && x[1] === d[0] )
                )
            );
            break;
    }

    return rawBound;

}


// -- =====================================================================================

function db_PA3 (
    action: TS.earthActions,
    pcl: [TS.earthParcel, TS.earthParcel], rawBound: TS.rawBound
) {

    let d: [ string, string ] = [ pcl[0].slice(0,2).join( "_" ), pcl[1].join( "_" ) ];

    switch ( action ) {
        case "Comment": rawBound.push( d ); break;
    }

    return rawBound;

}

// -- =====================================================================================

export function rawBoundConvertor ( rawBound: TS.rawBound ): TS.CakeBound {

    let cake: TS.CakeBound = {};

    let a: number,
        b: number;

    for ( let r of rawBound ) {

        a = 0; b = 1;
        // .. Add new Taste into the Cake
        if ( !( r[a] in cake ) ) cake[ r[a] ] = [ r[b] ];
        // .. Already-Tastes takes new Data ( Unique )
        else if ( !cake[ r[a] ].includes( r[b] ) ) cake[ r[a] ].push( r[b] );

        a = 1; b = 0;
        // .. Add new Taste into the Cake
        if ( !( r[a] in cake ) ) cake[ r[a] ] = [ r[b] ];
        // .. Already-Tastes takes new Data ( Unique )
        else if ( !cake[ r[a] ].includes( r[b] ) ) cake[ r[a] ].push( r[b] );

    }

    return cake;

}

// -- =====================================================================================

export function earthActionREC ( action: TS.earthActions, value: TS.earthValue ) {

    switch ( action ) {

        case "BugReport":
            earth.push( [ "BugReport", [ "H", <number>value[1] ] ] );
            break;

        case "Fav+": case "Fav-":
        case "Bound": case "Unbound":
        case "Comment":
            earth.push( [ action, value ] );
            break;

    }

    // ..  hard register the temp file
    saveDB( earth_File, earth );

}

// -- =====================================================================================

export function re_calculation () {
    let data = [ ...store.state.cloud, store.state.earth ];
    let rawBound = db_Parser( data ).rawBound;
    store.state.cakeBound = rawBoundConvertor( rawBound );
}

// -- =====================================================================================
