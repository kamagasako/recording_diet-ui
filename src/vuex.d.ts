/*
 * https://next.vuex.vuejs.org/guide/typescript-support.html
 */

import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // store/index.tsとの同期を忘れずに
  interface State {
    name?: string;
    role?: string;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
