<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="订单号:">
        <el-input v-model="searchForm.name" placeholder="" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" border stripe style="width: 100%;height: 70vh;overflow-y:scroll">
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
        </el-table-column>
        <el-table-column prop="code" label="订单号" header-align="center" align="center" />
        <el-table-column prop="img" label="用户照片" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.uimg" style="width:50px;height:50px;">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="uname" label="挂号用户" header-align="center" align="center" />
        <el-table-column prop="dname" label="挂号医生" header-align="center" align="center" />
        <el-table-column prop="day" label="挂号日期" header-align="center" align="center" />
        <el-table-column prop="status" label="状态" header-align="center" align="center" />
        <el-table-column prop="reply" label="诊断结果" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <div>
              <a style="color:rgb(31, 144, 254);" @click="del(scope.row.id)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

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
      limit: 999, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      defaultCode: "", //默认展开的code
      searchForm: {
        name: "",
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
    //获取列表
    getData() {
      api
        .orderslist({
          code: this.searchForm.name,
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
    async del(id) {
      await api
        .ordersdel({
          id: id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
          } else {
            this.$message.error(res.message);
          }
        });

      await this.getData();
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
}

.row {
  background-color: #fff;
  border-radius: 2px;
  padding: 10px;
  font-size: 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.row-de {
  img {
    width: 100px;
    height: 100px;
  }
}

.row-de:not(:last-child) {
  border-bottom: 1px #e3e3e3 solid;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.title {
  width: 90%;
}
.searchForm {
  ::v-deep .el-form-item__label {
    color: #efefef;
  }
}
</style>
