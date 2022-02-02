declare var android; // required if tns-platform-declarations is not installed

// -- =====================================================================================

import Vue                              from 'nativescript-vue'
import App_Basement                     from '@/components/Basement.vue'
import store from './store'
import * as NS                          from "@nativescript/core"
import { route }                        from '@/mixins/router'

// -- =====================================================================================

// import VueDevtools                      from 'nativescript-vue-devtools'
// if ( TNS_ENV !== 'production' ) {
    // Vue.use( VueDevtools );
    // console.log = function ( ...data: any[] ) {
    //     const unwanted: any[] = [
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> AppendChild(",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> CreateElement",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> CreateComment()",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> ParentNode(",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> InsertBefore(",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> RemoveChild(",
    //         "{NSVue (Vue: 2.6.12 | NSVue: 2.9.0)} -> NextSibling("
    //     ];
    //     let permission = true;
    //     for ( let x of unwanted )
    //         if ( typeof data[0] === "string" && data[0].includes(x) )
    //             permission = false;
    //     if ( permission ) console.info(data);
    // };
// }
// Vue.config.silent = ( TNS_ENV === 'production' );

// -- =====================================================================================

if ( NS.isAndroid ) {

  NS.TextBase.prototype[ NS.fontSizeProperty.setNative ] = function ( v ) {

      if ( !this.formattedText || typeof v !== "number" ) {

          const typ = android.util.TypedValue;
          const dip = typ.COMPLEX_UNIT_DIP;
          const pix = typ.COMPLEX_UNIT_PX;
          const cnd = typeof v === "number";

          if ( cnd )      this.nativeTextViewProtected.setTextSize( dip, v );
          else this.nativeTextViewProtected.setTextSize( pix, v.nativeSize );

      }

  }

}

// -- =====================================================================================

Vue.mixin( {
    methods: {
        route: route
    },
} )

new Vue( {
    store,
    components: { App_Basement },
    template: `<GridLayout> <App_Basement /> </GridLayout>`,
} ).$start();

// -- =====================================================================================
