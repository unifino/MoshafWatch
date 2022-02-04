declare var android; // required if tns-platform-declarations is not installed

// -- =====================================================================================

import * as NS                          from "@nativescript/core"
import * as TS                          from "@/../types/myTypes"
// import store                            from "@/store/store"
import { asma, Quran }                  from "@/db/Q/Quran"
// import { Hadith }                       from "@/db/H/Al-Hadith"

// -- =====================================================================================

let trace_q : number[];
let trace_h : number[];
let fav_q   : number[];
let fav_h   : number[];
let comments: string[];
let cloud   : TS.earthRaw[][];
let earth   : TS.earthRaw[];
export let rawBound: TS.RawBound;

const exStorage = android.os.Environment.getExternalStorageDirectory();
const SDCard: string = exStorage.getAbsolutePath().toString();

let myFolder : NS.Folder;           // * do not initiate it
export let cloud_File   : NS.File;  // * do not initiate it
export let trace_q_File : NS.File;  // * do not initiate it
export let trace_h_File : NS.File;  // * do not initiate it
export let earth_File   : NS.File;  // * do not initiate it

// -- =====================================================================================

// export function db_check (): Promise<void> {

//     return new Promise ( (rs, rx) => { 

//         // .. permission policy has been meet, so assign necessarily Folders!
//         myFolder  = NS.Folder.fromPath( NS.path.join( SDCard, "Moshaf" ) );

//         // .. init
//         let bp = myFolder.path;
//         trace_q_File = NS.File.fromPath ( NS.path.join( bp, "trace_q.json"  ) );
//         trace_h_File = NS.File.fromPath ( NS.path.join( bp, "trace_h.json"  ) );

//         // .. get Contents
//         fav_q    = [];
//         fav_h    = [];
//         rawBound = [];
//         comments = [];

//         try { cloud   = JSON.parse( cloud_File.readTextSync())    } catch { cloud   = [] }
//         try { trace_q = JSON.parse( trace_q_File.readTextSync() ) } catch { trace_q = [] }
//         try { trace_h = JSON.parse( trace_h_File.readTextSync() ) } catch { trace_h = [] }
//         try { fav_q   = JSON.parse( fav_q_File.readTextSync()   ) } catch { fav_q   = [] }
//         try { fav_h   = JSON.parse( fav_h_File.readTextSync()   ) } catch { fav_h   = [] }
//         try { rawBound= JSON.parse( bound_File.readTextSync()   ) } catch { rawBound= [] }
//         try { comments= JSON.parse( comments_File.readTextSync()) } catch { comments= [] }
//         try { earth   = JSON.parse( earth_File.readTextSync())    } catch { earth   = [] }


//         // .. check integrity 
//         if ( !trace_q ) saveDB( trace_q_File,  [] );
//         if ( !trace_h ) saveDB( trace_h_File,  [] );
//         if ( !cloud   ) saveDB( temp_File,     [] );
//         if ( !earth   ) saveDB( temp_File,     [] );

//         store.state.fav.Q     = []//! ----------------------;
//         store.state.fav.H     = []//! ----------------------;
//         store.state.memo.Q    = trace_q;
//         store.state.memo.H    = trace_h;
//         store.state.comments  = comments;
//         store.state.temp      = temp;
//         store.state.cakeBound = rawBoundConvertor( rawBound );

//         // bound_transfer( rawBound );

//         // .. resolve
//         rs();

//     } );

// }

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

export function rawBoundConvertor ( rawBound: [ string, string ][] ): TS.CakeBound {

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

// function bound_transfer ( data: TS.RawBound ) {

//     let inf = [];
//     let tmp;
//     let a;
//     let b;

//     for ( let p of data ) {
//         tmp = {};
//         if ( p[0].slice(0,1) === "H" || p[1].slice(0,1) === "H"  ) {
//             tmp.ref =  p;

//             switch ( p[0].slice(0,1) ) {
//                 case "Q": a = Quran[ p[0].slice(2) ].text; break;
//                 case "H": 
//                     a = Hadith[ Number( p[0].slice(2) ) ]; 
//                     delete a.aF;
//                     delete a.bF;
//                     a.x = Number( p[0].slice(2) );
//                     break;
//                 default: console.log( p[0].slice(0,1) ); break;
//             }

//             switch ( p[1].slice(0,1) ) {
//                 case "Q": b = Quran[ p[1].slice(2) ].text; break;
//                 case "H": 
//                     b = Hadith[ Number( p[1].slice(2) ) ]; 
//                     delete b.aF;
//                     delete b.bF;
//                     b.x = Number( p[1].slice(2) );
//                     break;
//                 case "T": break;
//                 default: console.log( p[1].slice(0,1) ); break;
//             }

//             tmp.a = a;
//             tmp.b = b;

//             inf.push( tmp );

//         }

//     }

//     saveTest( "test", "json", JSON.stringify( inf, null, "\t" ) );

// }

// -- =====================================================================================

// export function earthActionREC ( action: TS.earthActions, value: TS.earthValue ) {

//     switch ( action ) {

//         case "BugReport": temp.push( [ "BugReport", [ "H", <number>value[1] ] ] );  break;
//         case "Fav+"     :
//         case "Fav-"     : temp.push( [ action, value ] );                           break;
        
//         case "Comment"  : temp.push( [ "Comment", value ] );                        break;
//         case "Bound"    : temp.push( [ "Bound", value ] );                          break;

//     }

//     // ..  hard register the temp file
//     saveDB( temp_File, temp );

// }

// -- =====================================================================================