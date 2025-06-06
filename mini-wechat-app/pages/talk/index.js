const api = require('../../utils/request')
const app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const moment = require('../../utils/moment')
moment.locale('zh-cn');

Page({
  data: {
    list: [],
    role: ""
  },


  onLoad() {

  },

  onShow() {
    if (!wx.getStorageSync('id')) {
      wx.reLaunch({
        url: '/pages/login/index'
      })
      return
    }
    this.getData()
  },
//判断谁登录
  getData() {
    api._post('talk/queryBox', {
      uid: wx.getStorageSync('role') == '用户' ? wx.getStorageSync('id') : '',
      did: wx.getStorageSync('role') == '医生' ? wx.getStorageSync('id') : ''
    }).then(res => {
      this.setData({
        list: res.data,
        role: wx.getStorageSync('role')
      })
    })
  },


  //跳转
  jump(e) {
    let url = e.currentTarget.dataset.url//获取view中定义的值
    wx.navigateTo({
      url: url
    })
  }
})