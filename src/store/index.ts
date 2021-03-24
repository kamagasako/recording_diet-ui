/*
 * TypeScriptでVuexを使う方法
 * https://next.vuex.vuejs.org/guide/typescript-support.html
 */

import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";

// vuex.d.tsとの同期を忘れずに
export interface State {
  name?: string;
  role?: string;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    name: undefined,
    role: undefined
  },
  mutations: {
    init(state, json) {
      console.log(json);
      state.name = json.name;
      state.role = json.role;
    },
    clear(state) {
      state.name = undefined;
      state.role = undefined;
    }
  },
  actions: {
    loggedIn({ state }) {
      console.log(state.name, state.role);
      return state.name != null && state.role != null;
    }
  },
  plugins: [createPersistedState({ storage: sessionStorage })]
});
