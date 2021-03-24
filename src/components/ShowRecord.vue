<template>
  <div>
    <button @click="prev">prev</button>
    {{ date }}
    <button @click="next">next</button>
  </div>

  <hr />

  <div v-if="record">
    <div>
      <div>身体情報</div>
      <pre v-show="!editting">{{ record["body"] }}</pre>
      <div v-show="editting">
        <textarea v-model="record['body']" cols="40" rows="2"></textarea>
      </div>
    </div>

    <hr />

    <div>
      <div>食事情報</div>
      <pre v-show="!editting">{{ record["meals"] }}</pre>
      <div v-show="editting">
        <textarea v-model="record['meals']" cols="40" rows="10"></textarea>
      </div>
    </div>

    <hr />

    <div>
      <div>運動</div>
      <pre v-show="!editting">{{ record["exercises"] }}</pre>
      <div v-show="editting">
        <textarea v-model="record['exercises']" cols="40" rows="2"></textarea>
      </div>
    </div>

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

export default defineComponent({
  name: "ShowRecord",
  components: {},
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
    }
  },
  computed: {}
});
</script>

<style scoped></style>
