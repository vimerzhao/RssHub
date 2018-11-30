// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: [],
    content: '',
    clould_img_id_list: [],
    maxContentLength: 1000,
    minContentLength: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData)
    // 本页面要传数据到服务器，要对是否拿到这些数据做校验
  },
  input: function (e) {
    if (e.detail.value.length >= this.data.maxContentLength) {
      wx.showToast({
        title: '已达到最大字数限制',
      })
    }
    this.setData({
      content: e.detail.value
    })
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        if (res.tempFilePaths.length > 0) {
          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }
          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })
        }
      }
    })
  },
  /**
   * 执行发布时图片已经上传完成，写入数据库的是图片的fileId
   */
  publish: function(img_url_ok) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'publish_post',
      data: {
        openid: app.globalData.openId,// 这个云端其实能直接拿到
        author_name: app.globalData.wechatNickName,
        author_avatar_url: app.globalData.wechatAvatarUrl,
        content: this.data.content,
        image_url: img_url_ok,
        publish_time: "",
        update_time: ""//目前让服务器自己生成这两个时间
      },
      success: function (res) {
        // 强制刷新，这个传参很粗暴
        var pages = getCurrentPages();             //  获取页面栈
        var prevPage = pages[pages.length - 2];    // 上一个页面
        prevPage.setData({
          update: true
        })
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      },
      fail: console.error
    })
  },
  //发布按钮事件
  send: function () {
    if (this.data.content.length < this.data.minContentLength) {
      wx.showToast({
        image: '../../images/warn.png',
        title: '内容太短!',
      })
      return
    }
    var that = this;

    wx.showLoading({
      title: '发布中',
    })

    let img_url = that.data.img_url;
    let img_url_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    if (img_url.length == 0) {
      this.publish([])
      return
    }
    for (let i = 0; i < img_url.length; i++) {
      var str = img_url[i];
      var obj = str.lastIndexOf("/");
      var fileName = str.substr(obj + 1)
      console.log(fileName)
      wx.cloud.uploadFile({
        cloudPath: 'post_images/' + fileName,//必须指定文件名，否则返回的文件id不对
        filePath: img_url[i], // 小程序临时文件路径
        success: res => {
          // get resource ID: 
          console.log(res)
          //把上传成功的图片的地址放入数组中
          img_url_ok.push(res.fileID)

          //如果全部传完，则可以将图片路径保存到数据库

          if (img_url_ok.length == img_url.length) {
            console.log(img_url_ok)
            that.publish(img_url_ok)

          }

        },
        fail: err => {
          // handle error
          console.log('fail: ' + err.errMsg)
        }
      })
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

  }
})