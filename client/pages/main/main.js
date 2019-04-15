// pages/main/main.js
/**
 * 使用 Page 初始化页面，具体可参考微信公众平台上的文档
 */
const app = getApp();
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};


Page({

  /**
   * 初始数据，我们把服务地址显示在页面上
   */
  data: {
    // userInfo: '',
    // logged: false
  },

  bindGetUserInfo: function(e) {
    showBusy('正在登录');

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          app.globalData.userInfo = res
          app.globalData.logged = true
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 3000,
            success: function() {
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../choose/choose',
                    })
                  }, 100)
                }
              });
            }
          });
        },
        fail: err => {
          console.error(err)
          showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          app.globalData.userInfo = res
          app.globalData.logged = true
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.navigateTo({
                  url: '../choose/choose',
                })
              }, 100)  
            }
          });
        },
        fail: err => {
          console.error(err)
          showModel('登录错误', err.message)
        }
      })
    }
  },
});