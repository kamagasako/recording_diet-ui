<template>
  <div>
    <h1>recording diet</h1>
    <form>
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="button" @click="login">login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { http } from "@/axios.ts";
import "url";

export default defineComponent({
  name: "Home",
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log(this.username);
      const params = new URLSearchParams({
        username: this.username,
        password: this.password
      });
      http.post("/login", params);
    }
  }
});
</script>
