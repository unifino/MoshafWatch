<template>
<Page @navigatedTo="pageLoaded()">

<!---------------------------------------------------------------------------------------->

    <GridLayout class="fx">
        <ScrollView verticalAlignment="middle" scrollBarIndicatorVisible="true" ref="paper">
            <StackLayout class="text">
                <Label
                    v-for="(str,i) of strBOX"
                    :key=i
                    :ref="'textRow_' + i"
                    :text="str"
                    class="textRow"
                    @tap="scrollTo(+1)"
                    @doubleTap="scrollTo(-1)"
                />
            </StackLayout>
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
import { Najawa }                       from "@/db/N/Al-Najawa"
import store                            from "@/store/store"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Paper extends Vue {

// -- =====================================================================================

@Prop() id: number;

// -- =====================================================================================

strBOX: string[] = [];

// -- =====================================================================================

mounted () {
    this.init( this.id );
}

// -- =====================================================================================

pageLoaded() {
    store.state.here = 'Paper';
}

// -- =====================================================================================

init ( id: number ) {

    this.strBOX = Najawa[ id ].content.split( "\n\n" );

}

// -- =====================================================================================

scrollStep = 0;
scrollTo ( step: 1|-1 ) {

    let paper = ( this.$refs as any ).paper.nativeView;

    // .. apply step
    this.scrollStep += step;

    // .. limit step corrector
    let k_s = Object.keys( this.$refs ).filter( x => x.includes( "textRow" ) );
    if ( this.scrollStep < 0 ) this.scrollStep = 0;
    if ( this.scrollStep > k_s.length -1 ) this.scrollStep = k_s.length -1;

    let sigma = 44;
    for ( let i=0; i<this.scrollStep; i++ )
        sigma += ( this.$refs[ "textRow_" + i ][0] as any ).nativeView.getActualSize().height;

    let max_H = paper.getActualSize().height;
    let el = this.$refs[ "textRow_" + this.scrollStep ][0].nativeView;
    let h = el.getActualSize().height;
    // .. corrector
    if ( h <= max_H ) sigma -= (max_H - h) /2;
    if ( this.scrollStep < 1 ) sigma = 0;

    paper.scrollToVerticalOffset( sigma, step > 0 );

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */

.text {
    font-family: Homa;
    /* white-space: pre; */
    padding: 12;
    padding-top: 44;
    padding-bottom: 44;
    text-align: center;
    color: white;
    font-size: 16;
}

.textRow {
    text-wrap: true;
    padding: 12 0 12 0;
}

</style>