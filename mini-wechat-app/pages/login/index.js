const api = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    pwd: "",
    type: "用户"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onChange(e) {
    this.setData({
      type: e.detail
    })
  },

  //登录
  login() {
    if (this.data.user == "" || this.data.pwd == '') {
      wx.showToast({
        title: '请输入账号密码',
        icon: 'none',
        duration: 1000
      })
      return
    }

    if (this.data.type == '用户') {
      api._post('user/getlist', {
        user: this.data.user,
        pwd: this.data.pwd,
        offset: 1,
        limit: 1
      }).then(res => {
        if (res.code == 200 && res.data.list.length > 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1000
          })
          Object.keys(res.data.list[0]).map(item => {
            wx.setStorageSync(item, res.data.list[0][item]);
          });
          wx.setStorageSync('role', '用户');

          setTimeout(() => {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 1000
          })
        }
      })

    } else {
      api._post('doctor/getlist', {
        user: this.data.user,
        pwd: this.data.pwd,
        offset: 1,
        limit: 1
      }).then(res => {
        if (res.code == 200 && res.data.list.length > 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1000
          })
          Object.keys(res.data.list[0]).map(item => {
            wx.setStorageSync(item, res.data.list[0][item]);
          });
          wx.setStorageSync('role', '医生');
          setTimeout(() => {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }

  },

  //注册
  register() {
    wx.reLaunch({
      url: "/pages/register/index"
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})