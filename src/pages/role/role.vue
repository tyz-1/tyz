<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <!-- list -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- form -->
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqRoleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info = {
        isshow: true,
        title: "添加角色",
      };
    },

    init() {
      reqRoleList().then((res) => {
        this.list = res.data.list;
      });
    },

    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑角色",
      };
      this.$refs.form.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped>
</style>