<template>
  <div>
    <!-- 29.封装删除组件 -->
    <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del() {
      this.$confirm("你确定删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit('confirm')
        })
        .catch(() => {
          console.log("你点了取消");
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>