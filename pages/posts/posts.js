// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "post_list": null,
    update: false
  },
  /**
   * 刷新数据
   */
  refresh: function () {
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_post_list',
      success: function (res) {
        //提取数据
        const data = res.result.post_list.data
        console.log(data)
        that.setData({
          "post_list": data
        })
        wx.stopPullDownRefresh()

      },
      fail: console.error
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("posts.js - onLoad")
    wx.startPullDownRefresh()
    this.refresh()
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
    console.log("posts.js - onShow")
    if (this.data.update) {
      wx.startPullDownRefresh()
      this.refresh()
      this.setData({
        update: false
      })
    }
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
    this.refresh()
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

  },
  newPost: function(e) {
    wx.navigateTo({
      url: '../publish/publish'
    })
  }
})