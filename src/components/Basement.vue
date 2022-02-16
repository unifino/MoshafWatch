<template>
<AbsoluteLayout class="fx" ref="root" id="root">
<!---------------------------------------------------------------------------------------->

    <Frame class="fx" id="_base_" ref="_base_" >
        <Welcome />
    </Frame>

<!---------------------------------------------------------------------------------------->
</AbsoluteLayout>
</template>

// -- =====================================================================================

<script lang="ts">

// -- =====================================================================================

import { Vue, Component, Prop }         from "vue-property-decorator"
import Welcome                          from "@/components/Welcome.vue"
import { asma, Quran }                  from "@/db/Q/Quran"
import * as tools                       from "@/mixins/tools"
import * as NS                          from "@nativescript/core"
import * as Cloud                       from "@/mixins/cloud"
import * as storage                     from "@/mixins/storage"
import { route }                        from '@/mixins/router'
import store                            from "@/store/store"
// * npm i nativescript-exit
import { exit }                         from "nativescript-exit";

// -- =====================================================================================

@Component ( {
    components: { Welcome }
} )

// -- =====================================================================================

export default class Base extends Vue {

// -- =====================================================================================

mounted () {

    this.init();

    // .. back Button Ctl
    NS.Application.android.on(
        NS.AndroidApplication.activityBackPressedEvent,
        e => this.backButtonCtl(e),
    );

}

// -- =====================================================================================

init (): void {

    // .. checking existence && structure of mandatory files
    storage.db_check().then( () => this.setup() )
    // .. not resolvable situation
    .catch( msg => tools.toaster( msg ) );

}

// -- =====================================================================================

setup (): Promise<void> {

    return new Promise ( async (rs, rx) => {

        // .. get cloud => re-calculation
        Cloud.sync( "down" )
        // .then( () => storage.re_calculation() )
        .catch( e => console.log(e) );

        // .. first actual step! bring-up the Unity
        this.to_Unity();

        // .. basic steps has been resolved!
        rs();

    } )

}

// -- =====================================================================================

to_Unity ( init = false ): void {
    route( "Unity", null, init );
}

// -- =====================================================================================

backButtonCtl ( e: NS.AndroidActivityEventData|any ) {

    // .. somewhere else controls this actions
    if ( e.cancel ) return 0;

    // todo .. page stack could be defined!

    // .. prevent more actions by default
    e.cancel = true;

    switch ( store.state.here ) {

        case "Welcome": exit(); break;

        case "Unity":
            if ( store.state.routeStack.length > 1 ) e.cancel = false;
            else {
                // .. Go to Page
                route( "Welcome" );
                // .. do we need an upload?
                if ( store.state.earth.length ) {
                    // .. notify
                    tools.toaster( "SYNCING ..." );
                    // .. syncing ...
                    Cloud.sync( "up" )
                    .then( () => storage.re_calculation() )
                    .catch( e => console.log(e) );
                }
            }
            break;

        // case "Base_00": e.cancel = false; break;
        // case "Base_01": e.cancel = false; break;
        // case "Base_10": e.cancel = false; break;
        case "Paper"  : e.cancel = false; break;
        case "Maktub" : e.cancel = false; break;
        case "Qertas" : e.cancel = false; break;

        // .. let do more actions
        default: e.cancel = false; break;

    }

    // .. reduce pageStack
    if ( !e.cancel )
        if ( store.state.routeStack.length > 1 ) 
            store.state.routeStack.pop();

}

// -- =====================================================================================

}

// -- =====================================================================================

</script>

// -- =====================================================================================

<style scoped>

#root {
    width: 212;
    height: 212;
    background-color: #187015;
}

</style>
