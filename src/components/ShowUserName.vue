<template>
  <div>{{ name }}さん</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { http } from "@/axios.ts";
import { useStore } from "@/store";

export default defineComponent({
  name: "ShowUserName",
  data: () => {
    return {
      name: ""
    };
  },
  created() {
    const store = useStore();
    if (!store.dispatch("loggedIn")) {
      // ログアウトの共通化
      http.post("/logout").finally(() => {
        store.commit("clear");
        this.$router.push("/");
      });
      return;
    }
    this.name = store.state.name != null ? store.state.name : "名無し"; // アホっぽい
  }
});
</script>

<style scoped></style>
