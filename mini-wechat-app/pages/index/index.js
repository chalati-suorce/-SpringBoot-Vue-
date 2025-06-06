const api = require('../../utils/request');
const app = getApp();
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const moment = require('../../utils/moment');
moment.locale('zh-cn');

Page({
  data: {
    list: [],
    slides: [
      "../../static/1.jpg",
      "../../static/2.jpg",
    ]
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  onShow() {
    // 判断是否登录
    if (!wx.getStorageSync('id')) {
      wx.reLaunch({
        url: '/pages/login/index'
      });
      return;
    }
    this.getData();
  },

  getData() {
    // 显示加载提示
    wx.showLoading({
      title: '加载中...',
    });

    api._post('doctor/getlist', {
      limit: 999,
      offset: 1
    }).then(res => {
      // 隐藏加载提示
      wx.hideLoading();
      this.setData({
        list: res.data.list // 后台获取的医生信息放进list里
      });
    }).catch(error => {
      // 隐藏加载提示
      wx.hideLoading();
      // 显示错误提示
      Dialog.alert({
        title: '错误',
        message: '数据加载失败，请稍后重试！'
      });
      console.error('数据加载失败:', error);
    });
  },

  // 跳转
  jump(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
});    