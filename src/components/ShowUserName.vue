<template>
  <div>{{ name }}さん</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { http } from "@/axios.ts";

export default defineComponent({
  name: "ShowUserName",
  data: () => {
    return {
      name: ""
    };
  },
  created() {
    if (!this.$store.dispatch("loggedIn")) {
      console.log("not logged in???");

      // ログアウトの共通化
      http.post("/logout").finally(() => {
        this.$store.commit("clear");
        this.$router.push("/");
      });
      return;
    }
    this.name =
      this.$store.state.name != null ? this.$store.state.name : "名無し"; // アホっぽい
  }
});
</script>

<style scoped></style>
