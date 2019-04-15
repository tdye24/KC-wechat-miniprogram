// client/pages/matching/matching.js
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

// 显示匹配成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示匹配失败提示
var showFailure = text => wx.showToast({
  title: text,
  icon: 'none'
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
   * 页面的初始数据
   */
  data: {
    loginUrl: config.service.loginUrl,
    requestUrl: config.service.requestUrl,
    tunnelUrl: config.service.tunnelUrl,
    uploadUrl: config.service.uploadUrl,
    tunnelStatus: 'closed',
    tunnelStatusText: {
      closed: '已关闭',
      connecting: '正在连接...',
      connected: '已连接'
    },
    rival: null,
    userInfo: null,
    logged: false,
    mode: null,
    subject: null
  },

  /**
   * 点击「打开信道」，测试 WebSocket 信道服务
   */
  openTunnel() {
    // 创建信道，需要给定后台服务地址
    var tunnel = this.tunnel = new qcloud.Tunnel(this.data.tunnelUrl);

    // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
    tunnel.on('connect', () => {
      this.setData({
        tunnelStatus: 'closed'
      });
      console.log('WebSocket 信道已连接');  
    });

    tunnel.on('close', () => {
      console.log('WebSocket 信道已断开');
      this.setData({
        tunnelStatus: 'closed'
      });
    });

    tunnel.on('reconnecting', () => {
      console.log('WebSocket 信道正在重连...')
      showBusy('正在重连');
    });

    tunnel.on('reconnect', () => {
      console.log('WebSocket 信道重连成功')
      showSuccess('重连成功');
    });

    tunnel.on('error', error => {
      showModel('信道发生错误', error);
      console.error('信道发生错误：', error);
    });

    // 监听自定义消息（服务器进行推送）
    tunnel.on('info', info => {
      if(info.status === "matching") {
        showBusy("正在匹配...")
        return 
      }
      wx.hideLoading()
      if (info.status == "failure") {
        showFailure("无人在线，稍后尝试")
        console.log('WebSocket 信道已断开');
        this.setData({
          tunnelStatus: 'closed'
        });
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else if (info.status == "success") {
        showSuccess("匹配成功")
        console.log("userOne", info.userOne)
        console.log("userTwo", info.userTwo)
        var myOpenId = this.data.userInfo.openId
        var userOne = JSON.parse(info.userOne)
        var userTwo = JSON.parse(info.userTwo)
        if(myOpenId != userOne.openId) {
          this.setData({
            rival: userOne
          })
        } else {
          this.setData({
            rival: userTwo
          })
        }
        var that = this
        setTimeout(function () {
          wx.redirectTo({
            url: `../VS/VS?mode=${that.data.mode}&&subject=${that.data.subject}`,
          })
        }, 1500)
      }
      console.log('收到说话消息：', info.msg);
    });

    // 打开信道
    tunnel.open();

    this.setData({
      tunnelStatus: 'connecting'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad...")
    this.setData({
      userInfo: app.globalData.userInfo,
      logged: app.globalData.logged,
      mode: options.mode,
      subject: options.subject
    })
    this.openTunnel()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.tunnel.close()
    this.setData({
      tunnelStatus: 'closed'
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})