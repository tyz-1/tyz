<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <!-- 侧边栏导航 
        background-color 背景色
        text-color 字体颜色
        active-text-color 激活的文字的颜色
        unique-opened 只有一个子菜单展开
        router 路由模式
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{userInfo.username}}</span>
          <el-button type="primary" @click="logout">退出登录</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="#">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          
          <!-- 二级路由出口 -->
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",

    }),
  },
  
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    // 点击退出
    logout() {
      this.changeUser({});
      this.$router.push("/login");
    },
  },
  mounted() {

  },
};
</script>
<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.main {
  padding-top: 20px;
}
</style>