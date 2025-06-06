var app = getApp();
const api = require('../../utils/request');
const baseUrl = app.globalData.httpUrl;

Page({
  data: {
    user: "",
    pwd: "",
    img: "",
    name: "",
    tel: "",
    idcard: "",
    age: "",
    sex: '男',
    fileList: [],
    autosize: {
      maxHeight: 80,
      minHeight: 80
    },
  },

  onLoad: function (options) { },

  onChange(e) {
    this.setData({
      sex: e.detail
    });
  },

  // 上传
  afterRead(event) {
    const { file } = event.detail;
    wx.uploadFile({
      url: baseUrl + '/upload',
      filePath: file.url,
      name: 'file',
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          this.setData({
            fileList: [{ url: data.data }],
            img: data.data
          });
        } catch (error) {
          wx.showToast({
            title: '解析上传结果失败',
            icon: 'none',
            duration: 1000
          });
          console.error('解析上传结果失败:', error);
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '文件上传失败',
          icon: 'none',
          duration: 1000
        });
        console.error('文件上传失败:', error);
      }
    });
  },

  // 登录
  login() {
    wx.reLaunch({
      url: "/pages/login/index"
    });
  },

  // 验证手机号
  validateTel(tel) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(tel);
  },

  // 验证身份证号
  validateIdCard(idcard) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(idcard);
  },

  // 注册
  register() {
    const { user, pwd, name, tel, idcard } = this.data;
    // 验证是否填入所有信息
    try {
      Object.keys(this.data).forEach(k => {
        if (this.data[k] === "" && k !== 'fileList' && k !== 'autosize') {
          throw new Error("请填写所有信息");
        }
      });
      // 验证手机号
      if (!this.validateTel(tel)) {
        throw new Error("请输入正确的手机号");
      }
      // 验证身份证号
      if (!this.validateIdCard(idcard)) {
        throw new Error("请输入正确的身份证号");
      }
    } catch (err) {
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 1000
      });
      return;
    }

    api._post('user/save', {
      user,
      pwd,
      name,
      tel,
      img: this.data.img,
    }).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          this.login();
        }, 1000);
      } else {
        wx.showToast({
          title: '注册失败',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(error => {
      wx.showToast({
        title: '注册请求失败',
        icon: 'none',
        duration: 1000
      });
      console.error('注册请求失败:', error);
    });
  },

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});    