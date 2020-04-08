// pages/scan.js
const app = getApp()
var http = require("../../utils/request.js")
var imgUrl = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    className: '',
    lessonName: '',
    createTime: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取上一页面传来的值
    var data = wx.getStorageSync('map')
    wx.removeStorageSync('map')
    console.log("拿到上一页值", data)
    that.setData({
      className: data.classname,
      lessonName: data.lessonname,
      createTime: data.createtime,
    })
    //生成二维码
    var params = {}
    var url = '/portal/attendance/generateQRCode/' + data.attendanceid;
    http.request("get", url, params, function(res) {
      if (res.code == 0) {
        console.log(res)
        imgUrl = app.imgUrl + res.data
        //赋值
        that.setData({
          imgUrl: imgUrl
        })

      } else {
        wx.showToast({
          title: res.msg
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("分享")
  },
  downScan: function() {
    wx.downloadFile({
      url: imgUrl, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res.tempFilePath)
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存成功'
              })
            }
          })
        }
      }
    })
  }


})