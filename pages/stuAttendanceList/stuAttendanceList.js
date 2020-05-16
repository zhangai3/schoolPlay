const app = getApp()
var http = require("../../utils/request.js")
var pageNum = 1; //第几页
var pageSize = 5; //每页条数
var hasNextPage = true;
//请求数据
var loadMore = function(that) {
  if (hasNextPage) {
    //调接口
    let url1 = "/portal/pageAttendanceDetails"
    //获取用户信息，把对应用户的userId作为参数查询考勤列表参数
    let params = {
      userId: app.getGlobalUserInfo().id, //学生id
      pageSize: pageSize,
      pageNum: pageNum
    }
    http.request("get", url1, params, function(res) {
      if (res.code == 0) {
        // console.log(res)
        //将请求到的数据放入list
        var list = that.data.list;
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i]);
        }
        //赋值
        that.setData({
          list: list
        })
        //是否有下一页
        hasNextPage = res.data.hasNextPage
        //页数自增
        pageNum++;
      } else {
        wx.showToast({
          title: res.msg
        })
      }
    })
  } else {
    wx.showToast({
      title: '没有更多数据'
    })
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that)
    // console.log("当前页数", pageNum)
  },
  //页面滑动到底部,加载下一页
  bindDownLoad: function() {
    var that = this;
    loadMore(that);
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
    hasNextPage=true;
    pageNum=1;
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
  gotoMap: function(event) {
    var attendanceId = event.currentTarget.dataset.attendanceid
    console.log(attendanceId)
    wx.navigateTo({
      url: '/pages/signIn/signIn?attendanceId=' + attendanceId
    })
  }
})