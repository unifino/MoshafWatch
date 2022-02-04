<template>
<!---------------------------------------------------------------------------------------->

    <!-- <Label :class="'kalam ' + theType">
        <FormattedString>
            <Span :text="myText"  />
            <Span :text="aID"  />
        </FormattedString>
    </Label> -->

    <Label
        ref="kalam"
        :text="myText"
        :class="'kalam ' + theType"
    />

<!---------------------------------------------------------------------------------------->

</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as tools                       from "@/mixins/tools"
import { route }                        from '@/mixins/router'

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
        // this.isFav = store.state.fav.Q.includes( this.aID ) ? true : false;
        // .. highlight bounded ayat
        // this.isBounded = "Q_" + this.aID in store.state.cakeBound ? true : false;
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
    if
    (
        this.myType === "quran" ||
        this.myType === "hadith" ||
        this.myType === "najwa"
    )
        this.lookup( this.myText );
}

// -- =====================================================================================

lookup ( text: string ): void {
    route( "Lookup", { word : tools.erabTrimmer( text ) } )
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

.BIG_BREAKLINE {
    height: 25;
}

.kalam {
    color: white
}
</style>