<template>
  <div class="dashboard-container">
    <h2 class="font-white">欢迎进入管理后台</h2>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
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
.card {
  width: 50%;
  background: #fff;
  color: #fff;
  border-radius: 10px;
  height: 300px;
}
</style>
<style>
.echarts {
  width: 100%;
  height: 500px;
}
</style>
