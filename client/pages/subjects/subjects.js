// client/pages/subjects/subjects.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: null,
  },

  chooseToRank: function() {
    wx.navigateTo({
      url: '../rank/rank',
    })
  },

  chooseToNote: function() {
    wx.navigateTo({
      url: '../note/note',
    })
  },

  subjectsToMatching: function(e) {
    wx.navigateTo({
      url: '../matching/matching?mode=' + this.data.mode + '&subject=' + e.currentTarget.id,
    })
  },

  subjectsToTest: function(e) {
    wx.redirectTo({
      url: `../test/test?subject=${e.currentTarget.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({mode: options.mode})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    // console.log(options)
    //this.data.mode = 
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