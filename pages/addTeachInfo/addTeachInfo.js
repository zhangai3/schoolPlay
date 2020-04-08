var http = require("../../utils/request.js")
const app = getApp()
var commit = function (that) {
  let url = "/portal/teacher"
  let params = that.data
  http.request("post", url, params, function (res) {
    if (res.code == 0) {
      //赋值
      that.setData({
        userInfo: res.data
      })
      wx.showToast({
        title: res.msg
      })
      wx.navigateTo({
        url: '/pages/teacherInfo/teacherInfo',
      })
    } else {
      wx.showToast({
        title: res.msg
      })
    }
  })
  app.getGlobalUserInfo()
  app.saveGlobalUserInfo(that.data.userInfo)
  app.getGlobalUserInfo()
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    email: '',
    gender: '',
    lastSixDigitsOfIdCard: '',
    phone: '',
    teacherName: '',
    teachName: '',
    userId: '',
    userInfo: {}
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

  formSubmit: function (e) {
    var that = this;
    let userInfo = app.getGlobalUserInfo()
    let userId = userInfo.id
    that.setData({
      address: e.detail.value.address,
      email: e.detail.value.email,
      gender: e.detail.value.gender,
      lastSixDigitsOfIdCard: e.detail.value.lastSixDigitsOfIdCard,
      phone: e.detail.value.phone,
      teacherName: e.detail.value.teacherName,
      teachName: e.detail.value.teachName,
      userId: userId,
      teacherNo: e.detail.value.teacherNo,
    })
    commit(that)
  }
})