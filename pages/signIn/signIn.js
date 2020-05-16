let http = require("../../utils/request.js")
const app = getApp()
let myLatitude = 0
let myLongitude = 0
let id = ''
let teacherLat = 0
let teacherLon = 0
let radiusRange = 0
let effectiveTime = 0
let getClassInfo = function (attendanceId, that) {
  let userId = app.getGlobalUserInfo().id
  let params = {
  }
  http.request("get", '/portal/attendanceDetail/' + attendanceId + '/' + userId, params, function (res) {
    console.log(res)
    if (res.code == 0) {
      //赋值
      that.setData({
        classDataSource: res.data,
        markers: [{
          iconPath: "/img/school.png",
          id: 0,
          latitude: res.data.teacherLat,
          longitude: res.data.teacherLon,
          width: 25,
          height: 25,
          label: {
            fontSize: 12,
            content: '打卡地点',
            anchorX: -(4 * 12) / 2,
          }
        }],
        hasMarkers: true,

      })
      id = res.data.id
      teacherLat = parseFloat(res.data.teacherLat)
      teacherLon = parseFloat(res.data.teacherLon)
      radiusRange = res.data.radiusRange
      effectiveTime = res.data.effectiveTime
    } else {
      wx.showToast({
        title: res.msg
      })
    }
  })
}
Page({
  data: {
    markers: [],
    classDataSource: {},
    hasMarkers: false,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options", options)
    let attendanceId = options.attendanceId
    let that = this
    getClassInfo(attendanceId, that)
    wx.getLocation({
      success(res) {
        myLatitude = res.latitude
        myLongitude = res.longitude
        that.setData({
          myLatitude: res.latitude,
          myLongitude: res.longitude,
        })
      }
    })
    console.log(that.data, "data")
  },
  onReady: function (options) {
    let that = this
    console.log(that.data, "data")
    // let lat1 = that.data.myLatitude
    // let lng1 = that.data.myLongitude
    // let lat2 = that.data.teacherLat
    // let lng2 = that.data.teacherLon
    let lat1 = myLatitude
    let lng1 = myLongitude
    let lat2 = teacherLat
    let lng2 = teacherLon
    console.log(lat1)
    console.log(lng1)
    console.log(lat2)
    console.log(lng2)
    let distance = this.getDisance(lat1, lng1, lat2, lng2)
    console.log("getDisance", distance)
  },

  toRad: function (d) { return d * Math.PI / 180; },
  // 计算两点坐标距离
  getDisance: function (lat1, lng1, lat2, lng2) {
    console.log(lat1)
    console.log(lng1)
    console.log(lat2)
    console.log(lng2)
    let radLat1 = this.toRad(lat1);
    let radLat2 = this.toRad(lat2);
    let deltaLat = radLat1 - radLat2;
    let deltaLng = this.toRad(lng1) - this.toRad(lng2);
    let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
  },
  signIn: function () {
    let that = this
    wx.getLocation({
      success(res) {
        myLatitude = res.latitude
        myLongitude = res.longitude
        that.setData({
          myLatitude: res.latitude,
          myLongitude: res.longitude,
        })
      }
    })
    // let lat1 = myLatitude
    // let lng1 = myLongitude
    // let lat2 = teacherLat
    // let lng2 = teacherLon
    // console.log(lat1)
    // console.log(lng1)
    // console.log(lat2)
    // console.log(lng2)
    // let distance = this.getDisance(lat1, lng1, lat2, lng2)
    // console.log("getDisance", distance)
    // // 0 失败 1成功 2待签 3已过期
    // let isSucceed = 0
    // let nowTime = Date.parse(Date())
    // let remark = ''
    // //在指定范围外且签到时间已过期
    // if (radiusRange < distance && effectiveTime < nowTime) {
    //   isSucceed = 3
    //   remark = '在指定范围外且签到时间已过期'
    // }
    // //在指定范围内但签到时间已过期
    // if (radiusRange >= distance && effectiveTime < nowTime) {
    //   isSucceed = 3
    //   remark = '在指定范围内但签到时间已过期'
    // }
    // //在指定范围内且在签到时间范围内
    // if (radiusRange >= distance && effectiveTime >= nowTime) {
    //   isSucceed = 1
    //   remark = '在指定范围内且在签到时间范围内'
    // }
    let params = {
      id: id,
      lon: myLongitude,
      lat: myLatitude
    }
    http.request("put", '/portal/attendanceDetail/'+ id, params, function (res) {
        app.showMsg(res.msg)
    })
  },
  compareTime(time1, time2) {
    return time1 < time2;
  }
})