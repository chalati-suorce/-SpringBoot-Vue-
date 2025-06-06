const api = require('../../utils/request')
const _ = require('../../utils/lodash.min')
const app = getApp()
const moment = require('../../utils/moment')
moment.locale('zh-cn');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        did: '',
        minDate: moment(moment().subtract(-1, "days").format('YYYY-MM-DD')).valueOf(),
        time: moment().subtract(-1, "days").format('YYYY-MM-DD')
    },

    // 提交预约
    async submit() {
//传到后台查数据库中订单信息
        let data = await api._post('orders/getlist', {
            did: this.data.did,
            day: this.data.time,
            uid: wx.getStorageSync('id'),
            limit: 1,
            offset: 1
        })
        if (data.data.total) {//已存在
            wx.showToast({
                title: '当天已有预约,请不要重复预约',
                icon: 'none'
            })
            return
        }

        api._post('orders/save', {
            uid: wx.getStorageSync('id'),
            did: this.data.did,
            day: this.data.time,
            status: "已预约",
            code: _.random(1245874593, 9874563582),
        }).then(res => {
            if (res.code === 200) {
                wx.showToast({
                    title: '预约成功!',
                    icon: 'none',
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000)
            }
        })
    },



    // 选中
    confirm(e) {
        this.setData({
            time: moment(e.detail).format('YYYY-MM-DD')
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            did: options.did
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
    onShow: function () { },

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