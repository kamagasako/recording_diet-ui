<template>
  <div>{{ name }}さん <button @click="logout">logout</button></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { http } from "@/axios.ts";

export default defineComponent({
  name: "ShowUserName",
  data() {
    return {
      name: this.$store.state.name != null ? this.$store.state.name : "名無し" // アホっぽい
    };
  },
  methods: {
    logout() {
      http.post("/logout").finally(() => {
        this.$store.commit("clear");
        this.$router.push("/");
      });
    }
  }
});
</script>

<style scoped></style>
