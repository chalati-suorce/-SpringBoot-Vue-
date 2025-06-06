// pages/teachercard/index.js
Component({
  properties: {
    name: String
  },
  /**
   * 页面的初始数据
   */
  data: {
    active: 'index',
    type:"用户"
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        type: wx.getStorageSync('role'),
        active: this.data.name
      })
    },
  },

  ready: function () {

  },

  methods: {
    onChange(e) {
      this.setData({
        active: e.detail
      })
    },

    //跳转
    jump(e) {
      let url = e.currentTarget.dataset.url
      wx.reLaunch({
        url: url
      })
    },

    // 购物车跳转
    carjump() {
      wx.navigateTo({
        url: '/pages/car/index'
      })
    }

  }

})