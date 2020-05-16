// pages/classDetails/classDetails.js
const app = getApp()
var http = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource:{},
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userType = app.getGlobalUserInfo().userType
    if (userType=2){
      this.setData({
        flag:true
      })
    }
    var that = this
    //调接口
    let url = "/portal/lessonArrangement/" + wx.getStorageSync("lessonArrangementId")
    //参数
    let params = {}
    http.request("get", url, params, function (res) {
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
  goToSaveAttendance:function(e){
    var classId = e.currentTarget.dataset.classid
    var lessonId = e.currentTarget.dataset.lessonid
    var className = e.currentTarget.dataset.classname
    var lessonName = e.currentTarget.dataset.lessonname
    wx.setStorageSync("classId", classId)
    wx.setStorageSync("lessonId", lessonId)
    wx.setStorageSync("className", className)
    wx.setStorageSync("lessonName", lessonName)
    wx.navigateTo({
      url: '/pages/saveAttendance/saveAttendance',
    })
  }
})