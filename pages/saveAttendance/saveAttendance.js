// pages/saveAttendance/saveAttendance.js
var app = getApp()
var http = require("../../utils/request.js")

locationApi: 'https://apis.map.qq.com/ws/geocoder/v1/',

  Page({

    /**
     * 页面的初始数据
     */
    data: {
      array: ['50', '100', '200', '500', '1000'],
      objectArray: [{
        distance: '50'
      }, {
        distance: '100'
      }, {
        distance: '200'
      }, {
        distance: '500'
      }, {
        distance: '1000'
      }],
      index: 0,
      distance: '',
      address: "",
      flag: false,
      remark: '',
      classId: '',
      lessonId: '',
      lon: '',
      lat: '',
      className:'',
      lessonName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
          className: wx.getStorageSync("className"),
          lessonName: wx.getStorageSync("lessonName")
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    bindPickerChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setData({
        index: e.detail.value
      })
    },

    position: function() {
      let that = this
      // console.log("111")
      wx.getLocation({
        // type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          var locationApi = "https://apis.map.qq.com/ws/geocoder/v1/" + "?location=" + latitude + ',' + longitude + "&key=" + 'OIPBZ-5WK3K-724JU-A5JQQ-EYAYJ-XTBHJ'
          wx.request({
            url: locationApi,
            data: {},
            method: 'GET',
            success: (res) => {
              console.log("res", res)
              console.log("我要的", res.data.result.address)
              that.setData({
                address: res.data.result.address,
                flag: true,
                lat: res.data.result.ad_info.location.lat,
                lon: res.data.result.ad_info.location.lng
              })
            }
          })
        }
      })
    },

    pickerChange: function(e) {
      this.setData({
        index: e.detail.value,
        distance: this.data.array[this.data.index]
      })
      console.log("e", this.data.array[this.data.index])

    },
    handleTextarea: function(e) {

    },
    handleTextarea: function(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    saveAttence: function() {
      let that = this
      let url = '/portal/attendance'
      let classId = wx.getStorageSync("classId")
      let lessonId = wx.getStorageSync("lessonId")
      let userId = app.getGlobalUserInfo().id
      var params = {
        classId: classId,
        lat: that.data.lat,
        lon: that.data.lon,
        radiusRange: that.data.distance,
        userId: userId,
        lessonId: lessonId
      }
      console.log("that.data.distance", that.data.distance)
      console.log("that.data.lon", that.data.lon)
      console.log("22222222", params)
      http.request("post", url, params, function(res) {
        app.showMsg(res.msg)
      })
    },
  })