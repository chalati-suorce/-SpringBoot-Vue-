const api = require('../../utils/request')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    // 获取列表
    getData() {
        api._post('collects/getlist', {
            limit: 9999,
            offset: 1,
            uid: wx.getStorageSync('id')
        }).then(res => {
            this.setData({
                list: res.data.list
            })
        })
    },

    //删除
    del(e) {
        console.log(e);
        let id = e.currentTarget.dataset.id
        api._post('collects/del?id=' + id).then(res => {
            wx.showToast({
                title: '取消收藏成功!',
                icon: "none"
            })

            setTimeout(() => {
                this.getData()
            }, 1500)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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