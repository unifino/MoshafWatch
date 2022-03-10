<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout rows="*,auto" class="fx">

<!---------------------------------------------------------------------------------------->

    <ScrollView
        row=0
        verticalAlignment="middle"
        scrollBarIndicatorVisible="true"
        ref="qertas"
    >
        <FlexboxLayout
            id="rail"
            flexWrap="wrap"
            flexDirection="row-reverse"
            justifyContent="space-around"
            @tap="scrollTo(+1)"
            @doubleTap="scrollTo(-1)"
        >
            <Kalam
                v-for="(kalam,i) in vahy"
                :key="i"
                :ref="'kalam_' + i"
                :aID=kalam.aID
                :myText=kalam.text
                :myType="kalam.type"
            />
        </FlexboxLayout>
    </ScrollView>

<!---------------------------------------------------------------------------------------->

    <Label row=1 class="suraName">
        <FormattedString>
            <Span :text="suraName" />
            <Span :text="suraIDx" fontFamily="MADDINA" fontSize=8 fontWeight="bold" />
        </FormattedString>
    </Label>

<!---------------------------------------------------------------------------------------->

</GridLayout>
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
import store                            from "@/store/store"

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
suraName: string = "";
suraIDx: string = "";

// -- =====================================================================================

mounted () {
    this.init( this.id );
}

// -- =====================================================================================

pageLoaded() {
    store.state.here = 'Qertas';
}

// -- =====================================================================================

init ( id?: number ) {

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
    // .. Sura | Random & Simple Mode
    else {
        if ( typeof id === "undefined" ) ayat = [ tools.saheb( "Q" ) ];
        else {
            // .. make a copy
            let aID = id;
           // .. get the name
            const sura = Quran[ id ].sura;
            // .. get list
            while ( Quran[ aID ].sura === sura ) {
                ayat.push( aID ); aID++; if ( aID >= Quran.length ) break;
            }
        }
    }

    // .. get message
    this.vahy = this.rouh( ayat );

    // .. get the name
    if ( true ) {
        const sura = Quran[ ayat[0] ].sura;
        // .. title of sura
        this.suraName = asma[ sura -1 ][1];
        // .. IDx of sura
        this.suraIDx = "  ( " + sura + " ) ";
    }

    // .. always has Besmellah
    if ( this.vahy[0].text !== ";" )
        this.vahy.unshift( { aID: 0, text: ";", type: "ESM" } );

}

// -- =====================================================================================

rouh ( ayat: number[] ) {

    let vahy: TS.vahy = [];

    // .. loop on ayat
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

scrollStep = 1;
scrollTo ( step: 1|-1 ) {

    let qertas = ( this.$refs as any ).qertas.nativeView;

    // .. apply step
    this.scrollStep += step;
    // .. limit step corrector
    let k_s = Object.keys( this.$refs ).filter( x => x.includes( "kalam" ) );
    if ( this.scrollStep < 0 ) this.scrollStep = 0;
    if ( this.scrollStep > k_s.length -1 ) this.scrollStep = k_s.length -1;

    // .. skip number
    if ( this.$refs[ "kalam_" + this.scrollStep ][0].myType === "number" ) 
        step === 1 ? this.scrollStep++ : this.scrollStep--;

    let sigma = 23;
    for ( let i=0; i<this.scrollStep-1; i++ )
        sigma += ( this.$refs[ "kalam_" + i ][0] as any ).nativeView.getActualSize().height;

    let max_H = qertas.getActualSize().height;


    let el = this.$refs[ "kalam_" + this.scrollStep ][0].nativeView;
    let h = el.getActualSize().height;

    // .. corrector
    if ( h <= max_H ) sigma -= (max_H - h) /2;
    if ( this.scrollStep < 1 ) sigma = 0;

    qertas.scrollToVerticalOffset( sigma, step > 0 );

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */

#rail {
    padding: 23 14 44 14;
}

.suraName {
    font-family: Homa;
    font-size: 7;
    width: 100%;
    text-align: center;
    color: #8f8e8c;
    padding-top: 15;
    /* background-color: red; */
}

</style>