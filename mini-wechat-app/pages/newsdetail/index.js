const api = require('../../utils/request')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    id: ''
  },

  onLoad(e) {
    this.setData({
      id: e.id
    })
    this.getData()
  },

  getData() {
    api._post('news/getlist', {
      offset: 1,
      limit: 999,
      id: this.data.id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          info: res.data.list[0]
        })
      }
    })
  },

  //跳转
  jumpin(e) {
    let url = e.target.dataset.url
    wx.redirectTo({
      url: url
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