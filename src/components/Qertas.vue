<template>
<Page>

<!---------------------------------------------------------------------------------------->

    <GridLayout class="fx">
        <ScrollView verticalAlignment="middle" scrollBarIndicatorVisible="true">
            <FlexboxLayout
                id="rail"
                flexWrap="wrap"
                flexDirection="row-reverse"
                justifyContent="space-around"
            >
                <Kalam
                    v-for="(kalam,i) in vahy"
                    :key="i"
                    :aID=kalam.aID
                    :myText=kalam.text
                    :myType="kalam.type"
                />
            </FlexboxLayout>
        </ScrollView>
    </GridLayout>

<!---------------------------------------------------------------------------------------->

</Page>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as tools                       from "@/mixins/tools"
import { asma, Quran }                  from "@/db/Q/Quran"
import Kalam                            from "@/components/X/Kalam.vue"
import * as TS                          from "@/../types/myTypes"

// -- =====================================================================================

@Component ( {
    components: { Kalam }
} )

// -- =====================================================================================

export default class Qertas extends Vue {

// -- =====================================================================================

@Prop() id: number;

// -- =====================================================================================

vahy: TS.vahy = [];

// -- =====================================================================================

mounted () {
    this.init( this.id );
}

// -- =====================================================================================

init ( id: number ) {

    let ayat: number[] = [];

    // .. Special-Favorite List
    if ( id === -3 ) ayat = [
        0,261,
        6225,6226,6227,6228,6229,
        6230,6231,6232,6233,6234,6235,
        3788,3789,3790,3791,3792,3793,3794,3795,3796,3797,
        3960,3961,3962,3963,3964,3965,3966,3967,3968,3969
    ];
    // .. Special-Favorite List
    else if ( id === -2 ) ayat = [ 0,261,0,3425,3426,3427,0,3967,3968,3969 ];
    // .. Random & Simple Mode
    else ayat = [ tools.saheb( "Q" ) ];

    // .. get message
    this.vahy = this.rouh( ayat );

    // .. always has Besmellah
    if ( this.vahy[0].aID !== 0 ) this.vahy.unshift( { aID: 0, text: ";", type: "ESM" } );

}

// -- =====================================================================================

rouh ( ayat: number[] ) {

    let vahy: TS.vahy = [];

    // .. loop until end of sura
    for ( let aID of ayat ) {

        let q = Quran[ aID ];

        // .. all new sura except ONE has the ESM
        if ( q.ayah === 1 && q.sura !== 9 && q.sura !== 1 )
            vahy.push( { aID: aID, text: ";", type: "ESM" } );

        // .. handling ...
        if ( q.sura === 1 && q.ayah === 1 )
            vahy.push( { aID: aID, text: ";", type: "ESM" } );

        else {

            // .. add text
            vahy.push( { aID: aID, text: q.text, type: q.sajdeh ? "sajdeh" : "quran" } );

            // .. add number
            vahy.push( { aID: aID, text: q.ayah.toString(), type: "number" } );

        }

    }

    return vahy;

}

// -- =====================================================================================

saheb () {
    let id = tools.saheb( "Q" );
    this.vahy = this.rouh( [id] );
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */

#rail {
    padding: 44 14 44 14;
}

.ESM {
    font-size: 110;
    font-family: Besmellah_2;
    margin-top: -40;
    text-align: center;
    color: #548505
}

.quran, .sajdeh {
    font-family: Amiri-Regular;
    font-family: Homa;
    text-align: center;
    font-size: 16;
    color: white;
    text-wrap: true;
}

.quran { color: #9e9e9e }
.sajdeh { color: #1296ee }
.number {
    font-family: MADDINA;
    text-align: center;
    font-size: 16;
    padding-top: 1.2;
    margin: 14 30% 14 30%;
    width: 23;
    height: 23;
    align-self: center;
    border-radius: 99;
    font-weight: bold;
    background-color: #242424;
    color: #26596d;
}

</style>