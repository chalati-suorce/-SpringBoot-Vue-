const api = require('../../utils/request')
const app = getApp()
const _ = require('../../utils/lodash.min')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        uid: "",
        did: "",
        content: "",
        type: "用户",
        scrollLast: null,
        show: false,
        user: {},
        show1: false,
        reply: "",
        autosize: { maxHeight: 100, minHeight: 100 }
    },

    over() {
        this.setData({
            show1: true
        })
    },

    // 提交诊断意见
    confirm() {
        if (!this.data.reply) {
            wx.showToast({
                title: '请输入诊断意见',
                icon: "none"
            })
            return
        }
        api._post('talk/updateByCode', {
            reply: this.data.reply,
            code: this.data.list[this.data.list.length - 1]['code'],
            status: "已完成"
        }).then(res => {
            wx.showToast({
                title: '提交成功',
                icon: "none"
            })
            this.setData({
                show1: false,
                list: []
            })
        })
    },


    // 获取对话详情
    getData() {
        api._post('talk/getlist', {
            limit: 9999,
            offset: 1,
            uid: this.data.uid,
            did: this.data.did
        }).then(res => {
            let list = [];
            res.data.list.forEach((i) => {
                if (wx.getStorageSync('role') == '用户') {
                    if (i.type == '用户') {
                        list.push({
                            type: "right",
                            img: i.uimg,
                            content: i.content,
                            code: i.code,
                            status: i.status,
                            reply: i.reply,
                            time: i.time
                        });
                    } else {
                        list.push({
                            type: "left",
                            img: i.dimg,
                            content: i.content,
                            code: i.code,
                            status: i.status,
                            reply: i.reply,
                            time: i.time
                        });
                    }
                } else {
                    if (i.type == '医生') {
                        list.push({
                            type: "right",
                            img: i.dimg,
                            content: i.content,
                            code: i.code,
                            status: i.status,
                            reply: i.reply,
                            time: i.time
                        });
                    } else {
                        list.push({
                            type: "left",
                            img: i.uimg,
                            content: i.content,
                            code: i.code,
                            status: i.status,
                            reply: i.reply,
                            time: i.time
                        });
                    }
                }
            })
            if (list.length > this.data.list.length) {
                this.setData({
                    list
                })
                this.getScollBottom()
            }
        })
    },

    onClickHide() {
        this.setData({
            show: !this.data.show
        })
    },

    //滚动到最底部
    getScollBottom() {
        this.setData({
            scrollLast: 'item' + this.data.list.length
        })
    },

    // 发送信息
    save() {
        if (!this.data.content) {
            wx.showToast({
                title: '请输入内容',
                icon: 'none',
                duration: 1000
            })
            return;
        }
        api._post('talk/save', {
            uid: this.data.uid,
            did: this.data.did,
            content: this.data.content,
            code: this.data.list[this.data.list.length - 1]['code'],
            status: this.data.list[this.data.list.length - 1]['status'],
            type: wx.getStorageSync('role')
        }).then((res) => {
            if (res.code == 200) {
                this.setData({
                    content: ""
                })
                this.getScollBottom()
            }
        });
    },

    //获取用户病历
    getUser() {
        api._post('user/getlist', {
            id: this.data.uid,
            limit: 1,
            offset: 1
        }).then((res) => {
            if (res.code == 200) {
                this.setData({
                    user: res.data.list[0]
                })
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            uid: options.uid,
            did: options.did,
            type: wx.getStorageSync('role')
        })
        this.getData()
        this.getUser()
        this.setData({
            time: setInterval(() => {
                this.getData();
            }, 500)
        })
    },

    onHide: function () {
        //写在onHide()中，切换页面或者切换底部菜单栏时关闭定时器。
        clearInterval(this.data.time)
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
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.time)
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