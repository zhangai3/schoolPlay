// pages/appStore/appStore.js
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

  },
  gotoList: function() {
    //1学生 2老师  3管理员
    //获取用户信息，判断用户类型
    let userType = 2;
    if(userType == 1){
      wx.navigateTo({
        //
        url: '/pages/stuAttendanceList/stuAttendanceList'
      })
    }
    if (userType == 2) {
      wx.navigateTo({
        //
        url: '/pages/teachAttendanceList/teachAttendanceList'
      })
    }
  },
  gotoScan:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  }
})