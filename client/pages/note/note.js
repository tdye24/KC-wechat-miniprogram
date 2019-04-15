// client/pages/note/note.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList: null
  },

  question_detail: function(e) {
    let id = e.currentTarget.dataset.id
    let subject = e.currentTarget.dataset.subject
    wx.navigateTo({
      url: `../question_detail/question_detail?id=${id}&&subject=${subject}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://rpvcjsnc.qcloud.la/weapp/query',
      type: 'GET',
      dataType: 'json',
      data: {
        open_id: app.globalData.userInfo.openId
      },
      success: function(res) {
        console.log(res)
        that.setData({
          noteList: res.data.data
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