<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>

    <!-- list -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- form -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqMenuList } from "../../utils/http";
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add(){
      this.info.isShow = true
    },
    // 请求数据
    init(){
      reqMenuList().then(res=>{
        this.list=res.data.list
      })
    },
    // 编辑
    edit(id){
      this.info.isShow=true;
      this.info.title='编辑菜单';
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    // 请求数据
    this.init();
  },
  data() {
    return {
      // 父传子
      info: {
        isShow: false,
        title:'添加菜单'
      },
      list:[]
    };
  },
  components: {
    vList,
    vForm,
  },
};
</script>
<style scoped>
.el-button {
  margin-top: 20px;
}
</style>