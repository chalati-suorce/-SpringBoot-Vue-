const api = require('../../utils/request')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    slides: [
      "../../static/1.jpg",
      "../../static/2.jpg",
    ]
  },

  onLoad() {

  },

  getData() {
    api._post('news/getlist', {
      offset: 1,
      limit: 999
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          list: res.data.list
        })
      }
    })
  },

  //跳转
  jumpin(e) {
    let url = e.target.dataset.url
    console.log(url);
    wx.navigateTo({
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
    this.getData()
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