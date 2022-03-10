<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout>

<!---------------------------------------------------------------------------------------->

    <ScrollView 
        verticalAlignment="middle"
        scrollBarIndicatorVisible="false"
    >

<!---------------------------------------------------------------------------------------->

        <FlexboxLayout
            padding="44 14"
            flexWrap="wrap"
            flexDirection="row-reverse"
            justifyContent="space-around"
            alignItems="center"
        >
            <Label
                v-for="(x,i) in asma"
                :key=i
                :ref="i"
                :text=x[1]
                class="sura"
                @tap="openItem(x[2])"
            />
        </FlexboxLayout>

<!---------------------------------------------------------------------------------------->

    </ScrollView>

<!---------------------------------------------------------------------------------------->

</GridLayout>
</Page>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as tools                       from "@/mixins/tools"
import store                            from "@/store/store"
import { route }                        from '@/mixins/router'
import { asma, Quran }                  from "@/db/Q/Quran"

// -- =====================================================================================

@Component ( {
    components: {}
} )

// -- =====================================================================================

export default class Base_00 extends Vue {

// -- =====================================================================================

asma = asma;

// -- =====================================================================================

mounted () {
}

// -- =====================================================================================

pageLoaded () {
    store.state.here = "Base_00";
}

// -- =====================================================================================

openItem ( num: number ): void {
    route( "Qertas", { id: num } );
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
    .sura {
        color: blanchedalmond;
        font-family: Amiri-Regular;
        text-align: center;
        font-size: 14;
        padding: -4 3 0 3;
        margin: 2 .5;
        height: 30;
        border-radius: 5;
    }

    .CoolGreen  .sura { color: #cccccc }
    .Smoky      .sura { color: #222324 }
    .Black      .sura { color: #90918d }

</style>