<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="名称:">
        <el-input v-model="searchForm.name" placeholder="" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
        <el-button @click="showDialog = true" icon="el-icon-plus" plain>新增</el-button>
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" stripe style="width: 100%; min-height: 60vh" border>
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70" />
        <el-table-column prop="img" label="头像" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.img" style="width:50px;height:50px;border-radius:50%">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" header-align="center" align="center" />
        <el-table-column prop="user" label="账号" header-align="center" align="center" />
        <el-table-column prop="tel" label="手机号" header-align="center" align="center" />
        <el-table-column prop="idcard" label="身份证号" header-align="center" align="center" />
        <el-table-column prop="age" label="年龄" header-align="center" align="center" />
        <el-table-column prop="sex" label="性别" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <div>
              <a style="margin-left: 20px; color: rgb(31, 144, 254)" @click="edit(scope.row)">编辑</a>
              <a style="margin-left: 20px; color: rgb(31, 144, 254)" @click="del(scope.row)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

    <!-- 增加编辑 -->
    <Dialog :showDialog.sync="showDialog" title="" :appendBody="true" @cancal="close" @confirm="confirm" width="500">
      <div slot>
        <el-form ref="addForm" :model="addForm" label-width="80px" class="addForm" label-position="left" size="small">
          <el-form-item label="头像:">
            <el-upload class="avatar-uploader" :action="url" :show-file-list="false" :on-success="imgSuccess" accept=".png,.jpg,.jpeg">
              <img v-if="addForm.img" :src="addForm.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="addForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="账号:">
            <el-input v-model="addForm.user" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="addForm.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="addForm.user" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="身份证号:">
            <el-input v-model="addForm.idcard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="年龄:">
            <el-input v-model="addForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio v-model="addForm.sex" value="男" label="男"></el-radio>
            <el-radio v-model="addForm.sex" value="女" label="女"></el-radio>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Middle from "@/components/Middle/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Enduit from "@/components/WangEnduit/index.vue";
import * as api from "@/api/api";

export default {
  components: { Middle, Dialog, Pagination, Enduit },
  data() {
    return {
      url: process.env.VUE_APP_BASE_FILE,
      offset: 1, //当前页
      limit: 10, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      searchForm: {
        name: "",
      },
      addForm: {
        name: "",
        user: "",
        tel: "",
        pwd: "",
        img: "",
        idcard: "",
        age: "",
        sex: "男",
      },
      list: [],
      showDialog: false,
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    //大图上传
    imgSuccess(file) {
      this.addForm.img = file.data;
    },

    //获取列表
    getData() {
      api
        .userlist({
          name: this.searchForm.name,
          offset: this.offset,
          limit: this.limit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        });
    },

    //模态框-关闭
    close() {
      this.showDialog = false;
      let time = setTimeout(() => {
        this.resetData("addForm", this); //重置数据
      }, 300);
    },

    //删除
    async del(item) {
      await api
        .userdel({
          id: item.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
          } else {
            this.$message.error(res.msg);
          }
        });

      await this.getData();
    },

    // 新增/编辑-提交
    async confirm() {
      //验证是否填入所有信息
      /* try {
        Object.keys(this.addForm).forEach((k) => {
          if (this.addForm[k] == "") {
            throw new Error("请填写所有信息");
          }
        });
      } catch (err) {
        this.$message.error("请填写所有信息");
        return;
      } */

      await api.usersave(this.addForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功!");
          this.showDialog = false;
        } else {
          this.$message.error(res.msg);
        }
      });

      await this.getData();
    },

    //编辑
    edit(item) {
      this.addForm = JSON.parse(JSON.stringify(item)); //对象拷贝防止重置对象时污染
      this.showDialog = true;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
>>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px #c7c7c7 dashed;
  border-radius: 10px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

.searchForm {
  ::v-deep .el-form-item__label {
    color: #efefef;
  }
}
</style>
