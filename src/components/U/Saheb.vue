<template>
<GridLayout class="saheb" rows="*,auto">

<!---------------------------------------------------------------------------------------->

    <ScrollView row=0 @tap="tapped">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
            <Label :text="str" class="text" :fontFamily="$store.state.font" />
        </StackLayout>
    </ScrollView>

    <Label row=1 :text=adr class="address" :fontFamily="$store.state.font" />

<!---------------------------------------------------------------------------------------->

</GridLayout>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
import * as tools                       from "@/mixins/tools"
import { route }                        from '@/mixins/router'
import { asma, Quran }                  from "@/db/Q/Quran"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Saheb extends Vue {

// -- =====================================================================================

str: string = "";
adr: string = "";
id: number = -1;

// -- =====================================================================================

@Prop() source: TS.Source;

// -- =====================================================================================

mounted () {
    // this.refresh();
}

// -- =====================================================================================

// refresh () {
//     this.id = tools.saheb( this.source as "Q"|"H" );
//     if ( this.source === "H" ) {
//         let hadith = tools.getHadith( this.id );
//         this.str = hadith.arabi;
//         this.adr = hadith.from + " " + hadith.salam ;
//     }
//     if ( this.source === "Q" ) {
//         this.str = Quran[ this.id ].text;
//         this.adr = tools.quranAddress( this.id );
//     }
// }

// -- =====================================================================================

tapped () {
    let address: TS.here = this.source === "Q" ? "Qertas" : "Paper";
    route( address, { id: this.id } );
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .saheb {
        padding: 7 17 5 17;
        width: 240;
        height: 144;
        border-radius: 7;
        margin: 5;
    }

    .CoolGreen  .saheb { background-color: #1a1d1d }
    .Smoky      .saheb { background-color: #dfe2e2 }
    /* .Black      .saheb { background-color: #dfe2e2 } */

    .text {
        font-size: 14;
        line-height: 14;
        text-wrap: true;
    }

    .CoolGreen  .saheb { color: #9bc0c0 }
    .Smoky      .saheb { color: #243333 }
    .Black      .saheb { color: #979797 }

    .address {
        font-size: 7;
        color: #585858;
        padding: -2 3 -1 0;
        text-wrap: true;
    }

</style>