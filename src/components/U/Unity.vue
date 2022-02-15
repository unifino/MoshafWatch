<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout class="unityBox" ref="unityBox" rows="*,auto,auto,1">

<!---------------------------------------------------------------------------------------->

    <StackLayout row=1 orientation="horizontal" horizontalAlignment="center">

        <myButton
            v-for="(button,i) in main_buttons.slice(0,3)"
            :key="i"
            :bClass="'button fas ' + button.class"
            :icon="button.icon"
            @tap="button.f1()"
            @longPress="button.f2()"
        />

    </StackLayout>

    <StackLayout row=2 orientation="horizontal" horizontalAlignment="center">

        <myButton
            v-for="(button,i) in main_buttons.slice(3)"
            :key="i"
            :bClass="'button fas ' + button.class"
            :icon="button.icon"
            @tap="button.f1()"
            @longPress="button.f2()"
        />

    </StackLayout>

<!---------------------------------------------------------------------------------------->

</GridLayout>
</Page>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import * as TS                          from "@/../types/myTypes"
// import * as TM                          from "@/themes/themeManager"
import * as tools                       from "@/mixins/tools"
// import store                            from "@/store/store"
import Saheb                            from "@/components/U/Saheb.vue"
import myButton                         from "@/components/X/myButton.vue"
import { route }                        from "@/mixins/router"

// -- =====================================================================================

@Component ( {
    components: { Saheb, myButton }
} )

// -- =====================================================================================

export default class Unity extends Vue {

// -- =====================================================================================

main_buttons = [
    { icon: 'f5bb', class: '', f1: () => this.f( 0, "Maktub" ), f2: () => {} },
    { icon: 'f687', class: '', f1: () => this.f( 1, "Qertas" ), f2: () => {} },
    { icon: 'f684', class: '', f1: () => this.f( 2, "Paper" ),  f2: () => {} },

    { icon: 'f683', class: '', f1: () => this.f( 3, "Qertas", -2 ), f2: () => {} },
    { icon: 'f186', class: '', f1: () => this.f( 4, "Qertas", -3 ), f2: () => {} },
];

f ( buttonId: number, page: TS.here, prop? ) {
    this.main_buttons[ buttonId ].class = "pressed";
    setTimeout( () => this.main_buttons[ buttonId ].class = "", 300 );
    route( page, { id: prop } );
}

// -- =====================================================================================

// @tap="route( 'Paper', null, false )" @doubleTap="route( 'Paper', null, false )"

// -- =====================================================================================

mounted () {

}

// -- =====================================================================================

pageLoaded () {

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
.unityBox { padding: 44 7 }

.CoolGreen  .unityBox { background-color: #08332f }
.Smoky      .unityBox { background-color: #e6e6e6 }
.Black      .unityBox { background-color: #000000 }

/* ------------------------------------------- */
.button {
    text-align: center;
    font-size: 27;
    width: 55;
    height: 55;
    margin: 3;
    color:#e6f0cf;
    background-color: #08332f;
    border-radius: 55;
}

/* ------------------------------------------- */

.pressed {
    background-color: #333636;
    color: white;
}

.side {
    margin: 5;
}

</style>