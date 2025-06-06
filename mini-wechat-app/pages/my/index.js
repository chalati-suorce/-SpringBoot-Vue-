// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    img: "",
    role: ""
  },

  onLoad() {

  },


  //跳转
  jump(e) {
    let url = e.target.dataset.url
    wx.redirectTo({
      url: url
    })
  },

  //跳转-进入
  jumpin(e) {
    let url = e.target.dataset.url
    wx.navigateTo({
      url: url
    })
  },

  //退出
  loginout() {
    wx.showToast({
      title: '退出登录',
      icon: 'none',
      duration: 1000
    })
    wx.clearStorageSync()
    wx.reLaunch({
      url: "/pages/login/index"
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
    this.setData({
      img: wx.getStorageSync('img'),
      name: wx.getStorageSync('name'),
      role: wx.getStorageSync('role')
    })
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