import * as TS                          from "@/../types/myTypes"
import * as storage                     from "@/mixins/storage"
import { asma, Quran }                  from "@/db/Q/Quran"
// import { Hadith }                       from "@/db/H/Al-Hadith"
// import { c_map }                        from "@/db/H/info"
// * tns plugin add nativescript-toast
// import * as Toast                       from "nativescript-toast"

// -- =====================================================================================

export function ya_ali (): "Q"|"H" {
    let saat = new Date();
    let rand: number;
    rand = saat.getTime() % 2;
    let answer: "Q"|"H" = !!rand ? "Q" : "H";
    return answer;
}

// -- =====================================================================================

export function saheb ( from: "Q"|"H" ) {
    let saat = new Date();
    let rand: number;
    if ( from === "Q" ) rand = saat.getTime() % Quran.length;
    // if ( from === "H" ) {
    //     let tmp = [];
    //     for ( let p of Hadith.filter( x => x ) ) tmp.push( p.n );
    //     rand = tmp[ saat.getTime() % tmp.length ];
    // };
    return rand;
}

// -- =====================================================================================

// let toaster_TO: NodeJS.Timeout | any;
// let toasty;
// export function toaster ( msg: string ="" , duration: "short" | "long" = "short" ) {

//     if ( toaster_TO ) clearTimeout( toaster_TO );
//     try{ toasty.cancel() } catch {}
//     if ( !msg ) return 0;

//     let pad = "";
//     if ( msg.length < 7 ) for( let i=0; i< 7-msg.length; i++ ) pad += " ";

//     if ( pad ) msg = '\n' + pad + msg.replace( "\n", "" ) + pad + '\n';
//     else msg = '\n' + pad + msg + pad + '\n';

//     toasty = Toast.makeText( msg, duration );

//     toaster_TO = setTimeout( () => toasty.show() , 200 );

// }

// -- =====================================================================================

export function arabicDigits ( str: string ) {
    const base = [ '۰','۱','۲','۳','۴','۵','۶','۷','۸','۹' ];
    return str.replace( /[0-9]/g, w => base[+w] );
}

// -- =====================================================================================

export function erabTrimmer ( str: string ) {
    if ( !str ) return "";
    const erabs = [
        "ٕ", "ٓ", "ٖ", "ۡ", "ۚ", "ۢ", "ۖ", "ۗ", "ٌۚ", "ۥ", " ٌ",
        "ً", "ٌ", "ٍ",  "َ", "ُ",  "ِ",  "ّ",  "ْ", "‎ٓ", "ٔ",  "ٰ", 
        "ـ",
    ];
    for ( const erab of erabs ) str = str.replace( new RegExp( erab, 'g' ), "" );
    str = str.replace( /ٱ/g, 'ا' );
    return str;
}

// -- =====================================================================================

export function inFarsiLetters ( str: string ) {

    if ( !str ) return "";

    str = erabTrimmer( str );
    str = str
        .replace( /ء/g, 'ا' )
        .replace( /إ/g, 'ا' )
        .replace( /أ/g, 'ا' )
        .replace( /آ/g, 'ا' )
        .replace( /ة/g, 'ه' )
        .replace( /ؤ/g, 'و' )
        .replace( /ك/g, 'ک' )
        .replace( /ي/g, 'ی' )
        .replace( /ﺉ/g, 'ی' )
        .replace( /ئ/g, 'ی' )
        .replace( /ى/g, 'ی' );
        // .replace( /ڑ/g, 'ر' );

    return str;

}

// -- =====================================================================================

// export function getItem ( source:TS.Source, id: number ): TS.ItemFound {

//     let info = getInfo( source, id );

//     let item: TS.ItemFound = {
//         id: id,
//         source: source,
//         text: info.previewText,
//         flags: {
//             address: info.address,
//             // .. default values
//             isHeader: false,
//             isCached: false,
//             isBounded: false,
//         }
//     };
 
//     return item;

// }

// -- =====================================================================================

// export function getItemPlus ( code: string, flags: TS.Flags ={} ): TS.ItemFound {

//     let source = code.slice(0, 1) as TS.Source,
//         id = Number( code.slice(2) ) as number,
//         item: TS.ItemFound;

//     item = getItem( source, id );
//     // .. overwrite | add flags
//     item.flags = { ...item.flags, ...flags };
//     // .. patch for T
//     if ( isNaN( id ) ) item.text = code;

//     return item;

// }

// -- =====================================================================================

// export function getHistory ( src: TS.Source ): TS.ItemFound[] {

//     let items: TS.ItemFound[] = [];
//     if ( src !== "Q" && src !== "H" ) return items;
//     for ( const m of store.state.memo[ src ] ) items.unshift( getItem( src, m ) );
//     return items;

// }

// -- =====================================================================================

// export function getFavorite ( src: TS.Source ): TS.ItemFound[] {

//     let items: TS.ItemFound[] = [];
//     if ( src !== "Q" && src !== "H" ) return items;
//     for ( let m of store.state.fav[ src ] ) items.unshift( getItem( src, m ) );
//     return items;

// }

// -- =====================================================================================

// export function getPhrase ( src: TS.Source, str: string ) {  
//     if ( src === "Q" ) return search_Q( str );
//     if ( src === "H" ) return search_H( str );
//     return null;
// }

// -- =====================================================================================

// function search_Q ( phrase: string ): TS.ItemFound[] {

//     let items: TS.ItemFound[] = [];

//     for ( let i = 0; i < Quran.length; i++ )
//         if ( Quran[i].simpleInFarsiLetters.includes( phrase ) )
//             items.push( getItem( "Q", i ) );

//     return items;

// }

// -- =====================================================================================

// function search_H ( phrase: string ): TS.ItemFound[] {

//     let items: TS.ItemFound[] = [];
//     let words = phrase.split( " " );
//     let matrix: number[][] = [];
//     let tmpRow:number[];
//     let matches: number[] = [];

//     for ( let word of words ) {
//         tmpRow = [];
//         if ( word ) {
//             // .. Hadith N index starts from 1!
//             for ( let n = 1; n < Hadith.length; n++ ) {
//                 if ( Hadith[n] && Hadith[n].cDB ) {
//                     // .. search in arabic|farsi text
//                     if ( Hadith[n].aF.includes( word ) || Hadith[n].bF.includes( word ) ) {
//                         tmpRow.push(n);
//                     }
//                 }
//             }
//         }
//         matrix.push( tmpRow );
//     }

//     // .. remove empty rows
//     for ( let i in matrix ) if ( !matrix[i].length ) matrix.splice( Number(i), 1 );

//     // .. check if it contains in all rows ( all words found in one Hadith )
//     let permission: number;
//     for ( let row of matrix ) {
//         for ( let cell of row ) {
//             permission = 0;
//             for ( let re_row of matrix ) if ( re_row.includes( cell ) ) permission++;
//             if ( permission === matrix.length ) matches.push( cell );
//         }
//     }

//     // .. remove duplicated
//     matches = [ ...new Set(matches) ];

//     for ( let id of matches ) items.push( getItem( "H", id ) );

//     return items.filter( (x,i) => i<50 );

// }

// -- =====================================================================================

// export function getBounds ( source: TS.Source, id: number ): TS.ItemFound[] { 

//     let items: TS.ItemFound[] = [],
//         code_O = source + "_" + id,
//         x_codes = store.state.cakeBound[ code_O ] || [],
//         isBounded: boolean;

//     // .. convert codes to the content
//     for ( let code_X of x_codes ) {
//         isBounded = store.state.cakeBound[ code_X ].includes( code_O );
//         items.push( getItemPlus( code_X, { isBounded: isBounded } ) );
//     }

//     if ( items ) {
//         // .. add Header
//         items.unshift( getItemPlus( code_O, { isHeader: true } ) );
//         // .. append cached Items
//         items = [ ...items, ...appendCachedBounds( code_O ) ];
//     }

//     return items.filter( x => x );

// }

// -- =====================================================================================

// export function getTagItems ( source: TS.Source, id: number ) {

//     let t_bounds = getBounds( source, id ).filter( x => x.source === "T" ),
//         tags: string[],
//         tagItems: TS.ItemFound[] = [],
//         isBounded: boolean;

//     tags = Object.keys( store.state.cakeBound ).filter( x => x[0].slice(0,1) === "T" );

//     tagItems = tags.map( (x,i) => {
//         // .. get bound status
//         isBounded = false;
//         try { isBounded = t_bounds.find( b => b.text === x ).flags.isBounded } catch {}
//         return { source: "T", id: i, text: x, flags: { isBounded: isBounded } };

//     } );

//     return tagItems;

// }

// -- =====================================================================================

// export function getTagListItems (): TS.ItemFound[] {

//     let rawTags: string[],
//         count: number,
//         data: TS.ItemFound[];

//     rawTags = Object.keys( store.state.cakeBound ).filter( t => t.slice(0, 1) === "T" );

//     data = Object.values( rawTags ).map( (x, i) => {
//         count = store.state.cakeBound[x].length;
//         for ( let p of store.state.cakeBound[x] )
//             for ( let q of store.state.cakeBound[p] )
//                 if ( !q.includes( "T_" ) )
//                     count++;
//         count = arabicDigits( count +'' ) as any;
//         return { id: i, text: x.slice(2), source: "T", flags: { count: count } }
//     } );

//     return data;

// }

// -- =====================================================================================

// export function appendCachedBounds ( code_O: string ): TS.ItemFound[] { 

//     let cache: string[],
//         append: TS.ItemFound[] = [];

//     cache = store.state.cacheBound.reduce( (soFar, nextOne) => {
//         if ( nextOne[0] === code_O ) soFar.push( nextOne[1] );
//         else if ( nextOne[1] === code_O ) soFar.push( nextOne[0] );
//         return soFar;
//     }, [] as string[] );

//     for ( let c of cache ) append.push( getItemPlus( c, { isCached: true } ) );

//     return append;

// }

// -- =====================================================================================

// export function setHistory ( source: TS.Source, id: number ) {
//     // .. add trace ( unique! )
//     let old = store.state.memo[ source ].findIndex( x => x === id );
//     if ( ~old ) store.state.memo[ source ].splice( old, 1 );
//     store.state.memo[ source ].push( id );
//     // .. hard registration
//     let traceName = 'trace_' + source.toLowerCase();
//     storage.saveDB( storage[ traceName + "_File" ], store.state.memo[ source ], 110 );
// }

// -- =====================================================================================

// export function toggleBound ( code_O: string, code_X: string ): TS.CakeBound { 

//     // .. determine current BoundStatus
//     let isBounded: boolean;
//     isBounded = !!store.state.cakeBound[ code_X ];
//     if ( isBounded ) isBounded = store.state.cakeBound[ code_X ].includes( code_O );

//     // .. insert New Bound Info!
//     if ( !isBounded ) storage.rawBound.push( [ code_O, code_X ] );
//     // .. remove CrossBound Info
//     else {
//         let r: number;
//         r = storage.rawBound.findIndex( x => x[0] === code_O && x[1] === code_X );
//         if ( ~r ) storage.rawBound.splice( r, 1 );
//         r = storage.rawBound.findIndex( x => x[1] === code_O && x[0] === code_X );
//         if ( ~r ) storage.rawBound.splice( r, 1 );
//         // .. cache Bound Info!
//         store.state.cacheBound.push( [ code_O, code_X ] );
//     }

//     // .. trim cacheBound
//     if ( !isBounded ) {
//         store.state.cacheBound = store.state.cacheBound.filter( x => {
//             if ( x[0] === code_O && x[1] === code_X ) return false;
//             if ( x[1] === code_O && x[0] === code_X ) return false;
//             return true;
//         } );
//     }

//     // .. re-calculation
//     return storage.rawBoundConvertor( storage.rawBound );

// }

// -- =====================================================================================

// export function getHadith ( id: number ) {

//     let hadith: TS.Hadith = { obj: Hadith[ id ] } as any;

//     // .. mini patch
//     if ( !Hadith[ id ].c || Hadith[ id ].c === null || Hadith[ id ].c > 19 )
//         Hadith[ id ].c = 19;
//     if ( !Hadith[ id ].b ) Hadith[ id ].b = "";

//     // .. assign the from whom
//     hadith.from = c_map[ Hadith[ id ].c ][0];
//     hadith.salam = c_map[ Hadith[ id ].c ][1];
//     // .. assign arabic part
//     hadith.kalamat = [];
//     // .. assign arabi part
//     hadith.arabi = simpleText( Hadith[ id ].a );
//     // .. assign farsi part
//     hadith.farsi = Hadith[ id ].b || "";
//     // .. assign source
//     hadith.source = Hadith[ id ].d || "";

//     let tmpBox = Hadith[ id ].a.replace( / +/g, " " ).trim().split( ' ' );
//     let gFuse = false;
//     for ( let tmp of tmpBox ) {
//         if ( ( tmp.match( /<.?Q>/ ) || [] ).length ) {
//             gFuse = !gFuse;
//             tmp = tmp.replace( /<.?Q>/g, '' );
//         }
//         if ( tmp ) hadith.kalamat.push( { text: tmp, isGreen: gFuse } );
//     }

//     hadith.toShare = getInfo( "H", id ).text;

//     return hadith;

// }

// -- =====================================================================================

function simpleText ( str ) {
    str = str.replace( /<.?Q>/g, ' ' );
    str = str.replace( /\(/g, 'HBT_v1' );
    str = str.replace( /\)/g, '(' );
    str = str.replace( /HBT_v1/g, ')' );
    str = str.replace( / +/g, ' ' );
    return str;
}

// -- =====================================================================================

// export function getInfo ( source: TS.Source, id: number ) {

//     let tmp: string,
//         limit = 440,
//         info: {
//             source: TS.Source,
//             id: number,
//             text: string,
//             previewText: string,
//             address: string,
//         } = <any>{};

//     info.source = source;
//     info.id = id;

//     if ( source === "Q" ) {
//         info.address = quranAddress( id );
//         info.text = Quran[ id ].text + "\n\n" + info.address;
//         tmp = Quran[ id ].text;
//         if ( tmp.length > limit ) tmp = tmp.slice( 0, limit ) + " ...";
//         info.previewText = tmp;
//     }

//     if ( source === "H" ) {
//         // ! .. not found ID causes ERROR!
//         info.address = Hadith[ id ].d || "";
//         info.text = textOfHadith( id );
//         tmp = Hadith[ id ].a.replace( /<.?Q>/g, "" );
//         if ( tmp.length > limit ) tmp = tmp.slice( 0, limit ) + " ...( المزيد )";
//         info.previewText = tmp;
//     }

//     if ( source === "C" ) {
//         info.text = store.state.comments[ id ];
//         info.previewText = store.state.comments[ id ];
//     }

//     return info;

// }

// -- =====================================================================================

export function quranAddress ( id: number ) {

    const i = Quran[ id ];
    const suraName = asma[ i.sura -1 ][1];
    const suraNumber = arabicDigits( asma[ i.sura -1 ][0] +"" );

    return ( suraName + "(" + suraNumber + ") | " + arabicDigits( i.ayah +"" ) );

}

// -- =====================================================================================

// export function textOfHadith ( id: number ) {

//     let str: string = "";

//     // ! reset all Hadith
//     // .. mini patch
//     if ( !Hadith[ id ].c || Hadith[ id ].c === null || Hadith[ id ].c > 19 ) 
//         Hadith[ id ].c = 19;

//     str += c_map[ Hadith[ id ].c ][0];
//     str += " )" + c_map[ Hadith[ id ].c ][1] + "(:\n\n";
//     str += Hadith[ id ].a.replace( /<.?Q>/g, '' );

//     if ( Hadith[ id ].b ) str += "\n\n" + Hadith[ id ].b;
//     if ( Hadith[ id ].d ) str += "\n\n" + Hadith[ id ].d;


//     str = simpleText( str );

//     return str;

// }

// -- =====================================================================================
