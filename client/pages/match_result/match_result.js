const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    msg: "You win!",
    img_url: '../images/cry.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var noteIds = app.globalData.noteIds
    console.log(noteIds)
    console.log("noteIds", noteIds)
    var score = parseInt(options.score);
    var msg = "You win!"
    var img_url = ''
    if (score >= 80) {
      msg = "You win!"
      img_url = '../images/smile.png'
    } else {
      msg = "You lose!"
      img_url = '../images/cry.png'
    }
    this.setData({
      score: score,
      msg: msg,
      img_url: img_url
    })
    wx.request({
      url: 'https://rpvcjsnc.qcloud.la/weapp/update',
      method: 'POST',
      dataType: 'json',
      data: {
        open_id: app.globalData.userInfo.openId,
        added_score: options.score,
        subject: options.subject,
        noteIds: noteIds
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  chooseToNote: function () {
    wx.navigateTo({
      url: '../note/note',
    })
  },

  chooseToHome: function () {
    wx.reLaunch({
      url: '../choose/choose',
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
    // wx.redirectTo({
    //   url: '../choose/choose',
    // })
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