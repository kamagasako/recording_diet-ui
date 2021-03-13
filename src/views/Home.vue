<template>
  <div>
    <h1>recording diet</h1>
    <div>
      <label for="username">username</label>
      <input
        type="text"
        v-model="username"
        id="username"
        placeholder="username"
      />
    </div>
    <div>
      <label for="password">password</label>
      <input
        type="password"
        v-model="password"
        id="password"
        placeholder="password"
      />
    </div>
    <div>
      <button type="button" @click="login">login</button>
    </div>
    <hr />
    <div>
      <button type="button" @click="logout">logout</button>
    </div>
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
  created: () => {
    http.get("/");
  },
  methods: {
    login() {
      console.log(this.username);
      const params = new URLSearchParams({
        username: this.username,
        password: this.password
      });
      http.post("/login", params);
    },
    logout() {
      http.post("/logout");
    }
  }
});
</script>
