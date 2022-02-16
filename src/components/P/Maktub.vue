<template>
<Page @navigatedTo="pageLoaded()">

<!---------------------------------------------------------------------------------------->

    <GridLayout class="fx">
        <ScrollView verticalAlignment="middle" scrollBarIndicatorVisible="true">
            <FlexboxLayout
                flexWrap="wrap"
                flexDirection="row-reverse"
                justifyContent="center"
            >

                <Label :text=hadith.from    class="name"    />
                <Label :text=hadith.salam   class="name_e"  />
                <Label :text="''"           class="divider" />
                <Label :text=hadith.arabi   class="arabi"   />
                <Label :text=hadith.farsi   class="farsi"   />

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
import { Hadith }                       from "@/db/H/Al-Hadith"
import * as TS                          from "@/../types/myTypes"
import store                            from "@/store/store"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Maktub extends Vue {

// -- =====================================================================================

@Prop() id: number;

// -- =====================================================================================

str = "";
hadith: TS.Hadith = {} as any;

// -- =====================================================================================

mounted () {
    this.init( this.id );
}

// -- =====================================================================================

pageLoaded() {
    store.state.here = 'Maktub';
}

// -- =====================================================================================
init ( id?: number ) {

    // .. get a random Hadith Id
    if ( typeof id === "undefined" ) id = tools.saheb( "H" );
    this.hadith = tools.getHadith( id );

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
.name, .name_e {
    font-family: Amiri-Regular;
    text-align: center;
    font-size: 12;
    margin-top: 20;
    color: #62922b;
    margin-bottom: 5;
}

.name_e {
    margin-top: 28;
    margin-right: 3;
    font-size: 21;
    font-family: Alaem;
    color: #5b8814;
}

.arabi, .farsi {
    color: #99a5a8;
    font-family: Homa;
    padding: 10;
    text-wrap: true;
    text-align: center;
    font-size: 16;
}

.farsi {
    color: #5a5c53;
    padding: 3 14 40 14;
    font-size: 10;
}

.divider {
    width: 100%;
    height: 1;
}

</style>