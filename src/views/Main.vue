<template>
  <ShowUserName></ShowUserName>
  <div>
    main
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowUserName from "@/components/ShowUserName.vue";

export default defineComponent({
  name: "Main",
  components: {
    ShowUserName
  }
});
</script>

<style scoped></style>
