// client/pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://rpvcjsnc.qcloud.la/weapp/query/rank',
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        var list = []
        for(var i=0; i<res.data.data.length; i++) {
          var nickName = JSON.parse(res.data.data[i].user_info).nickName
          list.push({
            nickName: nickName,
            score: res.data.data[i].score
          }) 
        }
        that.setData({
          list: list
        })
      }
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