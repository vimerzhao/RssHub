// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "request_url": "http://news-at.zhihu.com/api/3/stories/latest",//请求首页数据的url
    "content": "内容"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


 
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
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_rss_list',
      success: function (res) {
        console.log(res.result)
        const data = res.result["rss_list"]
        const rss_data = data["data"][0]["data"]
        console.log(rss_data)
        that.setData({
          "rss_array": rss_data
        })

      },
      fail: console.error
    })

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