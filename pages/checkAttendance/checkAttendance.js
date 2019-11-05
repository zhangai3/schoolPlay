// pages/checkAttendance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.getLocation({
      success: function (res) {
        console.log(res.latitude)
        _this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          markers:[
            {
              id: 1,
              latitude: 23.099956,
              longitude: 113.478912,
              iconPath: "/img/location-o.png",
              height: 50,
              width: 50,
              callout:{
                content:'打卡地点',
                color:'#1883D7',
                fontSize:16,
                display:"block"
              }
            },
            {
            id:2,
            latitude: res.latitude,
            longitude: res.longitude,
            // iconPath:"/img/touxiang.jpg",
            height:50,
            width:50
          }],
          circles:[{
            latitude: 23.099956,
            longitude: 113.478912,
            fillColor: '#7cb5ec88',
            radius:1000
          }]
        })
       },
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
  
})