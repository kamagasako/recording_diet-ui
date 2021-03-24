<template>
  <div>
    <div>{{ title }}</div>
    <pre v-show="!editing">{{ text }}</pre>
    <div v-show="editing">
      <textarea
        v-model="text"
        @change="$emit('changeText', textValue, name)"
        :cols="cols"
        :rows="rows"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Record",
  data() {
    return {
      textValue: ""
    };
  },
  props: {
    name: String,
    title: String,
    editing: Boolean,
    cols: Number,
    rows: Number,
    value: String
  },
  computed: {
    text: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.textValue = newValue;
      }
    }
  }
});
</script>

<style scoped></style>
