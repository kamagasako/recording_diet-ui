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
      http
        .post("/login", params)
        .then(result => {
          switch (result.status) {
            case 200:
              if (result.data["result"] == "success") {
                this.$store.commit("init", result.data);
                this.$router.push("/main");
              } else {
                console.log("login failed");
                // 画面に何か出す?
              }
              break;
            case 401:
              console.log("unauthorized");
              // 画面に何か出す?
              break;
            default:
              console.error("unknown status", result.status);
              // 画面に何か出す?
              break;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});
</script>
