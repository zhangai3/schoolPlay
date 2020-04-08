// pages/stuInfo/stuInfo.js
const app = getApp()
var http = require("../../utils/request.js")
//请求数据
var getData = function(that) {
  // var that=this
  //调接口
  let url = "/portal/student/getByUserId"
  //参数
  let params = {
    userId: app.getGlobalUserInfo().id,
  }
  http.request("get", url, params, function(res) {
    if (res.code == 0) {
      console.log(res)
      that.setData({
        dataSource:res.data
      })
    } else {
      wx.showToast({
        title: res.msg
      })
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    getData(that)
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