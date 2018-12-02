//app.js
const util = require('./utils/util.js');  
App({
  onLaunch: function () {

    var that = this
    wx.clearStorage()

  },

  globalData: {
    userInfo: "StorageUserInfo",
    wechatNickName: '',
    wechatAvatarUrl: ''
  }
})