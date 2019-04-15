// client/pages/test/test.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    questions: null,
    i: 0,
    leftTime: 15,
    backgroundColor: null,
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    subject: null,
    noteIds: []
  },

  radioChange: function(e) {
    var i = this.data.i
    var that = this
    var noteIds = this.data.noteIds
    // console.log("按钮" + e.detail.value,"答案" +  this.data.questions[i].answer)
    if (e.detail.value != this.data.questions[i].answer) {
      noteIds.push({
        id: this.data.questions[i].id,
        question: this.data.questions[i].question
      })
      app.globalData.noteIds = noteIds
      console.log("错误！")
      wx.showToast({
        title: '错误',
        image: '../images/cry.png',
        success: function() {
          i = i + 1
          setTimeout(function() {
            if (i == 5) {
              wx.redirectTo({
                url: `../result/result?score=${that.data.score}&&subject=${that.data.subject}`,
              })
              return
            }
            that.setData({
              i: i,
              checkedA: false,
              checkedB: false,
              checkedC: false,
              checkedD: false,
              leftTime: 15
            })
          }, 1500)

        }
      })
    } else {
      console.log("正确！")
      wx.showToast({
        title: '正确',
        image: '../images/smile.png',
        success: function() {
          i = i + 1
          setTimeout(function() {
            if (i == 5) {
              wx.redirectTo({
                url: `../result/result?score=${that.data.score + 20}&&subject=${that.data.subject}`,
              })
              return
            }
            that.setData({
              score: that.data.score + 20,
              i: i,
              checkedA: false,
              checkedB: false,
              checkedC: false,
              checkedD: false,
              leftTime: 15
            })

          }, 1500)
        }

      })
    }
  },

  del: function() {
    console.log(this.data.i)
  },

  fav: function(e) {
    var i = this.data.i
    var that = this
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1500,
      mask: true,
      success: function(res) {
        that.data.noteIds.push({
          id: that.data.questions[i].id,
          question: that.data.questions[i].question
        })
        setTimeout(function() {
          i = i + 1
          if (i == 5) {
            wx.redirectTo({
              url: `../result/result?score=${that.data.score + 20}&&subject=${that.data.subject}`,
            })
            return
          }
          that.setData({
            i: i,
            leftTime: 15
          })
        }, 1500)
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: `https://rpvcjsnc.qcloud.la/weapp/questions/${options.subject}`,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        this.setData({
          subject: options.subject,
          questions: res.data.data
        })
        console.log(res)
      }
    })
    var that = this
    
    var i = this.data.i
    var interval = setInterval(function() {
      var leftTime = that.data.leftTime
      leftTime = leftTime - 1
      that.setData({
        leftTime: leftTime 
      })
      if(leftTime === 0) {
        that.setData({
          i: i + 1,
          leftTime: 15
        })
      }
    }, 1000)

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