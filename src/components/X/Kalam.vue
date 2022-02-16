<template>
<!---------------------------------------------------------------------------------------->

    <!-- Just Number Part -->
    <GridLayout v-if="theType.includes( 'number' )" columns="*,auto,auto,*">
        <Label
            :visibility="isFav ? 'visible' : 'collapsed'"
            col=1
            :text="String.fromCharCode( '0x' + 'f004' )"
            class="heart fas"
            @tap="hearthBeat"
        />
        <Label col=2 :text="myText" :class="'kalam ' + theType" @doubleTap="toggleFav" />
    </GridLayout>

    <!-- this Part is the Main -->
    <Label v-else :text="myText" :class="'kalam ' + theType" />

<!---------------------------------------------------------------------------------------->

</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as tools                       from "@/mixins/tools"
import store                            from "@/store/store"
import { route }                        from '@/mixins/router'
import * as storage                     from "@/mixins/storage"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Kalam extends Vue {

// -- =====================================================================================

isFav = false;
isBounded = false;
isPressed = false;

// -- =====================================================================================

@Prop() aID: number;
@Prop() myText: string;
@Prop() myType: TS.Kalam;

// -- =====================================================================================

mounted () {}

// -- =====================================================================================

get theType (): string {

    let theType = this.myType;

    let salam = [
        "عليها‌السلام",
        "عليه‌السلام",
        "صلى‌الله‌عليه‌وآله‌وسلم",
        "عليهما‌السلام",
        "عليهم‌السلام",
        "رحمه‌الله",
        "رحمهم‌الله",
        "رضي‌الله‌عنه",
        "عزوجل"
    ];

    let alaem = [ "(", ")" ]

    for ( const x of salam ) if ( x === this.myText ) theType = "salam";
    for ( const x of alaem ) if ( x === this.myText ) theType = "alaem";

    if ( this.myText === "؛" ) theType = "BREAKLINE";
    if ( this.myText === "!BREAKLINE!" ) theType = "BREAKLINE";
    if ( this.myText === "!BIG_BREAKLINE!" ) theType = "BIG_BREAKLINE";

    if ( this.myType === "number" ) {
        // .. highlight marked ayat
        this.isFav = store.state.fav.Q.includes( this.aID ) ? true : false;
        // .. highlight bounded ayat
        this.isBounded = "Q_" + this.aID in store.state.cakeBound ? true : false;
    }

    // .. build it
    theType += this.isFav ? ' fav' : '';
    theType += this.isBounded ? ' bounded' : '';
    theType += this.isPressed ? ' pressed' : '';

    return theType;

}

// -- =====================================================================================

touched ( args ) {

    // .. press effect
    switch ( args.action ) {

        case "down":
            this.isPressed = true;
            setTimeout( () => this.isPressed = false, 1000 );
        break;

        case "move":
        case "up":   this.isPressed = false; break;

    }

}

// -- =====================================================================================

autoTranslate () {
    if ( this.myType === "quran" || this.myType === "hadith" || this.myType === "najwa" )
        this.lookup( this.myText );
}

// -- =====================================================================================

lookup ( text: string ): void {
    route( "Lookup", { word : tools.erabTrimmer( text ) } )
}

// -- =====================================================================================

hearthBeat () {
    tools.toaster( "Hearth Beat :)" );
}

// -- =====================================================================================

// ! --------------------------------------
source = "";
toggleFav () {

    this.source = "Q";

    let trace = store.state.fav[ this.source ].indexOf( this.aID );

    // .. add to Favorite && hard registration
    if ( !~trace ) {
        store.state.fav[ this.source ].push( this.aID );
        storage.earthActionREC( "Fav+", [ <"Q"|"H">this.source, this.aID ] );
    }
    // .. pop out of Favorite && hard registration
    else {
        store.state.fav[ this.source ].splice( trace, 1 );
        storage.earthActionREC( "Fav-", [ <"Q"|"H">this.source, this.aID ] );
    }

}

// -- =====================================================================================

destroyed () {}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
.CoolGreen  .pressed { background-color: #333636 }
.Smoky      .pressed { background-color: #c2c2c2 }
.Black      .pressed { background-color: #3a3a3a }

.BREAKLINE, .BIG_BREAKLINE {
    width: 100%;
    opacity: 0;
}

.BREAKLINE {
    height: 1;
    margin-top: -1;
}

.BIG_BREAKLINE { height: 25 }

.kalam { color: white }

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
    margin: 12 3 12 3;
    width: 23;
    height: 23;
    align-self: center;
    border-radius: 99;
    font-weight: bold;
    background-color: #242424;
    color: #26596d;
}

.heart {
    text-align: center;
    font-size: 16;
    padding-top: 1.2;
    width: 23;
    height: 23;
    margin: 14 3 10 3;
    font-weight: bold;
    color: #db0606;
}

</style>