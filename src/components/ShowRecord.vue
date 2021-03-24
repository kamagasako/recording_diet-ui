<template>
  <div>
    <button @click="prev">prev</button>
    {{ date }}
    <button @click="next">next</button>
  </div>

  <hr />

  <div v-if="record">
    <record
      :name="'body'"
      :title="'身体情報'"
      :editing="editting"
      :cols="40"
      :rows="3"
      :value="record['body']"
      @change-text="changeText"
    ></record>
    <hr />

    <record
      :name="'meals'"
      :title="'食事'"
      :editing="editting"
      :cols="40"
      :rows="10"
      :value="record['meals']"
      @change-text="changeText"
    ></record>
    <hr />

    <record
      :name="'exercises'"
      :title="'運動'"
      :editing="editting"
      :cols="40"
      :rows="3"
      :value="record['exercises']"
      @change-text="changeText"
    ></record>
    <hr />

    <div>
      <form id="form" name="form"></form>
      <button v-show="!editting" type="button" @click="edit">編集</button>
      <button v-show="editting" type="button" @click="save">保存</button>
      <button v-show="editting" type="button" @click="cancel">取消</button>
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { http } from "@/axios.ts";
import moment from "moment";
import Record from "@/components/Record.vue";

export default defineComponent({
  name: "ShowRecord",
  components: {
    Record
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      record: null,
      editting: false
    };
  },
  props: {},
  created() {
    this.fetch();
  },
  methods: {
    prev() {
      console.log("prev");
      this.date = moment(this.date)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.fetch();
    },
    next() {
      console.log("next");
      this.date = moment(this.date)
        .add(1, "days")
        .format("YYYY-MM-DD");
      this.fetch();
    },
    fetch() {
      http
        .get("/api/record/" + this.date)
        .then(res => {
          this.record = res.data;
        })
        .catch(e => {
          console.error(e);
        });
    },
    edit() {
      this.editting = true;
    },
    save() {
      const param = {};
      param.body = this.record.body;
      param.meals = this.record.meals;
      param.exercises = this.record.exercises;
      console.log(param);
      http
        .post("/api/record/" + this.date, param)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          this.editting = false;
        });
    },
    cancel() {
      this.editting = false;
      this.fetch(); // もうちょっとスマートに編集内容をリセットしたい
    },
    changeText(text, name) {
      console.log(text, name);
      this.record[name] = text;
    }
  },
  computed: {},
  emits: ["change"]
});
</script>

<style scoped></style>
