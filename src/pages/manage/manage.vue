<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- v-list -->
    <v-list :list="list" @init="newInit" @edit="edit"></v-list>

    <!--  分页 
    total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination
      background
      @current-change="changePage"
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
    ></el-pagination>

    <!-- v-form -->
    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
import { reqUserList, reqUserCount } from "../../utils/http";
export default {
  components: {
    vForm,
    vList,
  },
  data() {
    return {
      info: {
        title: "添加管理员",
        isshow: false,
      },
      list: [],
      //   页数
      page: 1,
      //  一页数量
      size: 2,
      //  总数
      total: 0,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加管理员",
      };
    },
    edit(id) {
      this.info = {
        title: "编辑管理员",
        isshow: true,
      };
      this.$refs.form.getOne(id);
    },
    // 请求数据
    init() {
      reqUserList({ page: this.page, size: this.size }).then(res=> {
        let list = res.data.list ? res.data.list : [];
        if (list.length == 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    // 刷新取得总数
    newInit() {
      this.init();
      this.getCount();
    },
    // 页码发生改变
    changePage(page) {
      this.page = page;
      this.init();
    },
    // 获取数据总数
    getCount() {
      reqUserCount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
  },
  mounted() {
    this.init();
    this.getCount();
  },
};
</script>
<style scoped>
</style>