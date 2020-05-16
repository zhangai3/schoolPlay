// pages/auth/auth.js
const app = getApp()
var http = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log("res.userInfo",res.userInfo)
              var params = res.userInfo
              
              
            }
          })
        }

      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    var params = e.detail.userInfo
    params.avatar = e.detail.userInfo.avatarUrl
    params.openId = app.getOpenId()
    console.log("params", params)
    console.log("注册信息：", params)
    let url = '/portal/user'
    //注册用户
    http.request("post", url, params, function (result) {
      if (result.code == 0) {
        //保存用户信息
        app.saveGlobalUserInfo(result.data.userInfo)
        // 跳转到要跳转的页面
        var redirectTo = wx.getStorageSync("redirectTo");;
        console.log(redirectTo)
        wx.navigateTo({
          url: redirectTo
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