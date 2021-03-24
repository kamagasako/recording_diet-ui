<template>
  <show-user-name></show-user-name>
  <show-record></show-record>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowUserName from "@/components/ShowUserName.vue";
import ShowRecord from "@/components/ShowRecord.vue";

export default defineComponent({
  name: "Main",
  components: {
    ShowUserName,
    ShowRecord
  }
});
</script>

<style scoped></style>
