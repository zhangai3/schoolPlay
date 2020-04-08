// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //弹窗组件
    show: false,
    buttons: [{
      type: 'primary',
      className: '',
      text: '授权',
      value: 1
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    app.init()
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
  getUserInfo: function() {
    if (app.isLogin()) { //已授权
      this.navigateJudge()
    } else { //未授权（弹出授权窗口）
      this.setData({
        show: true
      })
    }
  },
  navigateJudge: function(){
    //获取用户信息
    let userInfo = app.getGlobalUserInfo()
    let userType = userInfo.userType
    if (app.isBlank(userInfo.userType)) { //未绑定个人信息
      // 跳转到选择身份页面
      wx.navigateTo({
        url: '/pages/identity/identity'
      })
    }
    //1学生 2老师  3管理员
    //获取用户信息，判断用户类型
    if (userType == 1) {
      wx.navigateTo({
        //学生信息页面
        url: '/pages/stuInfo/stuInfo'
      })
    }
    if (userType == 2) {
      wx.navigateTo({
        //老师信息页面
        url: '/pages/teacherInfo/teacherInfo'
      })
    }
  },
  buttontap(e) {
    //console.log("buttontap",e.detail)
    this.setData({
      show: false
    })
    this.navigateJudge()
  }
})