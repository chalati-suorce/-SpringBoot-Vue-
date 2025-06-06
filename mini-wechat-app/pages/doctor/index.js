const api = require('../../utils/request')
const app = getApp()
const _ = require('../../utils/lodash.min')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        id: "",
        type: "简介",
    },


    // 获取医生详情
    getData() {
        api._post('doctor/getone?id=' + this.data.id, {
        }).then(res => {
            this.setData({
                info: res.data,
            })
        })
    },

    // 进入预约时间页面
    register() {
        wx.navigateTo({
            url: '/pages/submit/index?did=' + this.data.info.id,
        })
    },

    // 提交预约咨询
    async submit() {
        //    查询是否有正在咨询的单子
        let talk = await api._post('talk/getlist', {
            did: this.data.info.id,
            uid: wx.getStorageSync('id'),
            
            limit: 1,
            offset: 1
        })

        if (talk.data.total) {
            wx.navigateTo({
                url: `/pages/content/index?uid=${wx.getStorageSync('id')}&did=${this.data.info.id}`,
            })
            return
        }

        api._post('talk/save', {
            did: this.data.info.id,
            uid: wx.getStorageSync('id'),
            type: '医生',
            content: "您好,请描述您的问题",
            code: _.random(12659874512, 98754623582)
        }).then(res => {
            wx.navigateTo({
                url: `/pages/content/index?uid=${wx.getStorageSync('id')}&did=${this.data.info.id}`,
            })
            return
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getData()
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