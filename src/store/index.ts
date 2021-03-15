/*
 * TypeScriptでVuexを使う方法(simple版)
 * https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
 */

import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  name?: string; // 表示名
  role?: string; // ロール文字列
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    name: undefined,
    role: undefined
  },
  mutations: {
    init: (state, json) => {
      state.name = json.name;
      state.role = json.role;
    },
    clear: state => {
      state.name = undefined;
      state.role = undefined;
    }
  },
  actions: {
    loggedIn: context => {
      return context.state.name && context.state.role;
    }
  }
});

export function useStore() {
  return baseUseStore(key);
}

//export default createStore({
//  state: {},
//  mutations: {},
//  actions: {},
//  modules: {}
//});
