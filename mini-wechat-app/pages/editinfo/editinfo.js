var app = getApp()
const api = require('../../utils/request')
const baseUrl = app.globalData.httpUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    pwd: "",
    tel: "",
    img: "",
    name: "",
    sex: "男",
    idcard: "",
    age: "",
    fileList: [],
    autosize: {
      maxHeight: 80, minHeight: 80
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onChange(e) {
    this.setData({
      sex: e.detail
    })
  },

  // 上传
  afterRead(event) {
    const { file } = event.detail;
    wx.uploadFile({
      url: baseUrl + '/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data)
        this.setData({
          fileList: [{ url: data.data }],
          img: data.data
        })
      },
    });
  },

  //保存
  register() {
    //验证是否填入所有信息
    try {
      Object.keys(this.data).forEach(k => {
        if (this.data[k] == "" && k != 'fileList' && k != 'autosize') {
          throw new Error("请填写所有信息");
        }
      });
    } catch (err) {
      wx.showToast({
        title: '请填写所有信息',
        icon: 'none',
        duration: 1000
      })
      return;
    }


    api._post('user/save', {
      id: wx.getStorageSync('id'),
      user: this.data.user,
      pwd: this.data.pwd,
      name: this.data.name,
      img: this.data.img,
      tel: this.data.tel,
      idcard: this.data.idcard,
      age: this.data.age,
      sex: this.data.sex,
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '修改成功,重新登录后生效!',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000
        })
      }
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
    api._post('user/getone?id=' + wx.getStorageSync('id')).then(res => {
      this.setData({
        user: res.data.user,
        pwd: res.data.pwd,
        name: res.data.name,
        img: res.data.img,
        tel: res.data.tel,
        idcard: res.data.idcard,
        sex: res.data.sex,
        age: res.data.age,
        fileList: [{ url: res.data.img, type: "image" }]
      })
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