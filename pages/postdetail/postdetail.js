//const util = require('../../utils/util.js');  
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    imageUrls: [],
    inputBoxShow: true,
    maxContentLength: 300,
    comment: '',
    comments: [

      {
        name: "1",
        content: "1"
      }, {
        name: "2",
        content: "2"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    /*为什么失败了，小程序端
    const db = wx.cloud.database({
      env: "rss-hub-test-898ca3"
    })
    const _ = db.command
    const collection = db.collection('post_collection')
    const record = collection.doc(options.postid)
    record.get({
      success: function (res) {
        console.log(res.data)
      }
    })
    */

    // 更新浏览次数，TODO本地如何及时同步
    wx.cloud.callFunction({
      name: 'update_watch_count',
      data: {
        postid: options.postid
      },
      success: function (res) {
        console.log('更新成功')
      }
    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'get_post_detail',
      data: {
        postid: options.postid
      },
      success: function (res) {
        console.log('成功')
        console.log(res.result)
        var postdetail = res.result.postdetail.data[0];
        that.setData({
          detail: postdetail
        })
        that.downloadImages(postdetail.image_url)
      },
      fail: console.error
    })

    wx.cloud.callFunction({
      // 云函数名称 
      name: 'get_comment_for_post',
      data: {
        postid: options.postid,
      },
      success: function (res) {
        console.log(res.result.comment_list.data)
        that.setData({
          comments: res.result.comment_list.data
        })
      }
    })

  },
  downloadImages: function(image_urls){
    var that = this
    if(image_urls.length == 0){
      return
    } else {
      var urls = []
      for(let i = 0; i < image_urls.length; i++) {
        wx.cloud.downloadFile({
          fileID: image_urls[i],
          success: res => {
            // get temp file path
            console.log(res.tempFilePath)
            urls.push(res.tempFilePath)
            if (urls.length == image_urls.length) {
              console.log(urls)
              that.setData({
                imageUrls: urls
              })
            }
          },
          fail: err => {
            // handle error
          }
        })

      }
    }
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

  },
  sendComment: function() {
    console.log(this.data.comment)
    console.log(getApp().globalData.openId)
    console.log(getApp().globalData.userInfo.nickName)
    wx.cloud.callFunction({
      // 云函数名称 
      name: 'add_comment',
      data: {
        postid: this.data.detail._id,
        openid: app.globalData.openId,
        name: app.globalData.userInfo.nickName,
        content: this.data.comment
      },
      success: function (res) {
        console.log("同步评论")
      }
    })

  },
  input: function (e) {
    if (e.detail.value.length >= this.data.maxContentLength) {
      wx.showToast({
        title: '已达到最大字数限制',
      })
    }
    this.setData({
      comment: e.detail.value
    })
  },
})
