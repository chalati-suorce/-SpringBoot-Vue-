const api = require('../../utils/request')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        role: "",
        content: "",
        autosize: {
            maxHeight: 100,
            minHeight: 100
        },
        show: false,
    },

    // 打开诊断意见
    open(e) {
        this.setData({
            content: "",
            goods: e.currentTarget.dataset.goods,
            show: true
        })
    },

    // 提交诊断意见
    async save() {
        if (this.data.content == "") {
            wx.showToast({
                title: '诊断意见为空!',
                icon: "none"
            })
            return
        } else {
            api._post('orders/save', {
                id: this.data.goods[0]['id'],
                reply: this.data.content,
                status: '诊断结束'
            }).then(res => {
                wx.showToast({
                    title: '诊断完成!',
                    icon: "none"
                })
                setTimeout(() => {
                    this.getData()
                }, 1000)
            })

        }
    },

    // 获取列表
    getData() {
        api._post('orders/getlist', {
            offset: 1,
            limit: 999,
            uid: wx.getStorageSync('role') == '用户' ? wx.getStorageSync('id') : "",
            did: wx.getStorageSync('role') !== '用户' ? wx.getStorageSync('id') : "",
        }).then(res => {
            let arr = {};
            let newarr = [];
            this.setData({
                // 排序
                list: []
            })
            if (res.data.list.length != 0) {
                res.data.list.forEach((item, index) => {
                    if (!arr[item.code]) {
                        arr[item.code] = [];
                    }
                    arr[item.code].push({
                        ...item,
                    });
                });

                Object.keys(arr).forEach((item) => {
                    newarr.push({
                        code: item,
                        time: arr[item][0].time,
                        id: arr[item][0].id,
                        goods: arr[item],
                        status: arr[item][0].status,
                    });

                });
                newarr = newarr.sort((a, b) => {
                    return b.id - a.id
                })
                this.setData({
                    // 排序
                    list: newarr
                })
            }
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
        this.setData({
            role: wx.getStorageSync('role')
        })
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