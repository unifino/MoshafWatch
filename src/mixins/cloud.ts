import * as NS                          from "@nativescript/core"
import * as TS                          from "@/../types/myTypes"
import store                            from "@/store/store"
import * as storage                     from "@/mixins/storage"
import * as tools                       from "@/mixins/tools"

// -- =====================================================================================

export const cloudURL = "https://serene-falls-03482.herokuapp.com/"; 

// -- =====================================================================================

export function sync( mode: "down"|"up" ): Promise<void> {

    switch ( mode ) {
        case "down" : return down_Cloud();
        case "up"   : return up_Cloud();
    }

}

// -- =====================================================================================

export function down_Cloud( filter: boolean = true ): Promise<void> {

    // .. get rows!
    let alreadyGotIDs: number[] = [];

    if ( filter ) {
        // .. get IDs of already downloaded rows
        alreadyGotIDs = Object.keys( store.state.cloud ).reduce( (soFar,nxtOne) => {
            if ( store.state.cloud[ nxtOne ].length ) soFar.push( Number(nxtOne) +1 );
            return soFar;
        }, [] );
    }

    let url = cloudURL + "download?i=" + alreadyGotIDs.join( "," );

    return new Promise( (rs, rx) => {

        NS.Http.getJSON( url ).then(
            ( res: TS.cloud_response ) => {

                if ( res.status === 200 ) {
                    // .. soft registration of data
                    for ( let y of <TS.Architecture[]>res.answer ) {
                        // ! test it with a better way
                        try {
                            if ( y.patch ) {
                                let str = JSON.parse( JSON.stringify( y.patch ) );
                                store.state.cloud[ y.id -1 ] = str;
                            }
                        }
                        catch (e) { console.log(e) }
                    }
                    // .. hard registration of data
                    storage.saveDB( storage.cloud_File, store.state.cloud );
                    // .. resolve
                    rs();

                }
                else rx( res.status );

            },
            e => rx( e + ' : 002 Server Collections!' )
        )
        .catch( e => rx( e + ' : 001 Server Collections!' ) );

    } );

}

// -- =====================================================================================

export function up_Cloud(): Promise<void> {

    let url = cloudURL + "upload";

    return new Promise( (rs, rx) => {

        NS.Http.request( {
            url: url ,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify( {
                d: JSON.stringify( store.state.earth )
            } )
        } )
        .then(
            res_x => {

                let res = res_x.content.toJSON() as TS.cloud_response;

                if ( res.status === 200 ) {
                    // .. merge earth into the cloud
                    store.state.cloud.push( store.state.earth );
                    // .. purge earth
                    store.state.earth = [];
                    // .. hard registration of data
                    storage.saveDB( storage.cloud_File, store.state.cloud );
                    storage.saveDB( storage.earth_File, store.state.earth );
                    // .. resolve
                    rs();
                }
                else rx( res.status );

            },
            e => rx( e + ' : 004 Server Collections!' )
        )
        .catch( e => rx( e + ' : 003 Server Collections!' ) );

    } );

}

// -- =====================================================================================
