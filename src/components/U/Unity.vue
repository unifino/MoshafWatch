<template>
<Page @navigatedTo="pageLoaded()">
<GridLayout class="unityBox" ref="unityBox" rows="*,auto,auto,auto,*">

<!---------------------------------------------------------------------------------------->

    <StackLayout row=1 orientation="horizontal" horizontalAlignment="center">

        <myButton
            v-for="(button,i) in morning_buttons"
            :key="i"
            :bClass="'button fas ' + button.class"
            :icon="button.icon"
            @tap="button.f1()"
            @longPress="button.f2()"
        />

    </StackLayout>

    <StackLayout row=2 orientation="horizontal" horizontalAlignment="center">

        <myButton
            v-for="(button,i) in main_buttons"
            :key="i"
            :bClass="'button fas ' + button.class"
            :icon="button.icon"
            @tap="button.f1()"
            @longPress="button.f2()"
        />

    </StackLayout>

    <StackLayout row=3 orientation="horizontal" horizontalAlignment="center">

        <myButton
            v-for="(button,i) in night_buttons"
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
import store                            from "@/store/store"

// -- =====================================================================================

@Component ( {
    components: { Saheb, myButton }
} )

// -- =====================================================================================

export default class Unity extends Vue {

// -- =====================================================================================

morning_buttons = [
    { icon: 'f684', class: '', f1: () => this.f( 3, "Paper", 1 ),  f2: () => {} },
    { icon: 'f185', class: '', f1: () => this.f( 4, "Paper", 6 ),  f2: () => {} },
];

main_buttons = [
    { icon: 'f5bb', class: '', f1: () => this.f( 0, "Maktub" ), f2: () => {} },
    { icon: 'f687', class: '', f1: () => this.f( 1, "Qertas" ), f2: () => {} },
    { icon: 'f684', class: 'deactivated', f1: () => {},  f2: () => {} }
];

night_buttons = [
    { icon: 'f683', class: '', f1: () => this.f( 5, "Qertas", -2 ), f2: () => {} },
    { icon: 'f186', class: '', f1: () => this.f( 6, "Qertas", -3 ), f2: () => {} },
];

f ( buttonId: number, page: TS.here, prop? ) {
    let buttons = [ ...this.main_buttons, ...this.morning_buttons, ...this.night_buttons ];
    buttons[ buttonId ].class = "pressed";
    setTimeout( () => buttons[ buttonId ].class = "", 300 );
    route( page, { id: prop } );
}

// -- =====================================================================================

mounted () {

}

// -- =====================================================================================

pageLoaded() {
    store.state.here = 'Unity';
}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

/* ------------------------------------------- */
.unityBox { padding: 0 7 }

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

.deactivated {
    background-color: #383838;
    color: black
}

</style>