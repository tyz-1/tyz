<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" >
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择分类名称">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0">
          <!-- 1.原生js上传图片 -->
          <!-- 1.绘制html +css  -->
          <!-- 如果添加成功，此时，input上的文件应该清掉，所以直接将input节点清除 -->
          <!-- <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />

            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>-->

          <!-- 2.element-ui 上传文件 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加分类'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
  reqRoleList,
} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        catename: "",
        pid: "",
        img: null,
        status: 1,
      },
      // 图片路径
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    add() {
      reqCateAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    // 获取表格的信息并渲染
    getOne(id) {
      reqCateDetail(id).then((res) => {
        this.user = res.data.list;
        this.imgUrl = this.$imgPre + this.user.img;
        this.user.id = id;
      });
    },
    // 修改信息
    update() {
      reqCateUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    // 原生js的方法写上传文件和显示 changeFile
    // changeFile(e) {
    //   let file = e.target.files[0];
    //   // 文件大小大于2M
    //   if (file.size > 2 * 1024 * 1024) {
    //     errorAlert('请传送一个小于2M的图片')
    //     return;
    //   }

    //   // extname获取文件类型
    //   let extname = path.extname(file.name);
    //   let arr = ['.jpg','.jpeg','.png','.gif'];
    //   if(!arr.includes(extname)){
    //     errorAlert("请上传正确的图片格式！")
    //     return;
    //   }

    //   //URL.createObjectURL(file) 将一个文件生成一个URL地址
    //   this.imgUrl = URL.createObjectURL(file);
    //   // 给user.img赋值
    //   this.user.img = file;
    // },

    // element-ui的方式写  element-ui的上传文件
    changeFile2(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    empty() {
      this.user = {
        catename: "",
        pid: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑分类") {
        this.empty();
      }
    },
  },
  mounted() {
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>
<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

/* 穿透 */
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader .el-upload img {
  width: 100px;
  height: 100px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
