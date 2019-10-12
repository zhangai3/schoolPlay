// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // getsetting 获取用户的当前设置
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        console.log(app.isBlank(res.authSetting))
        // 如果没授权过
        if (app.isBlank(res.authSetting) || !res.authSetting['scope.userInfo']) {
          // 授权
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              //
              wx.getUserInfo({
                success: function(res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  wx.login({
                    success(res) {
                      if (res.code) {
                        //发起网络请求
                        wx.request({
                          url: '',
                          data: {
                            code: res.code
                          }
                        })
                      } else {
                        console.log('登录失败！' + res.errMsg)
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://test.com/onLogin',
                  data: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      }
    })
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