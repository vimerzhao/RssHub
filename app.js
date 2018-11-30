//app.js
App({
  onLaunch: function () {
    var that = this
    wx.clearStorage()

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {

      },
      fail: function() {
        that.userInfoAuthorize()
      }
    })
  },
  /**
   * 这段代码还是很丑陋，怎么优化
   */
  userInfoAuthorize: function() {
    var that = this
    console.log('authorize')
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 存储用户信息
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              wx.setStorage({
                key: that.globalData.userInfo,
                data: res.userInfo,
              })
            }
          })
        } else { // 跳转到授权页面 
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: "StorageUserInfo"
  }
})