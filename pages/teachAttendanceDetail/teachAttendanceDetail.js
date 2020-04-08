var http = require("../../utils/request.js")
//下拉分页
var pageNum = 1; //第几页
var pageSize = 5; //每页条数
var hasNextPage = true; //是否有下一页
var attendanceId; //考勤id
//请求数据
var loadMore = function(that) {
  if (hasNextPage) {
    //调接口
    let url1 = "/portal/pageAttendanceDetails"
    //获取用户信息，把对应用户的userId作为参数查询考勤列表参数
    let params = {
      attendanceId: attendanceId, //考勤id
      pageSize: pageSize,
      pageNum: pageNum
    }
    http.request("get", url1, params, function(res) {
      if (res.code == 0) {
        console.log(res)
        //将请求到的数据放入list
        var list = that.data.list;
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i]);
        }
        //赋值
        that.setData({
          list: list,
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
//下拉分页结束


Page({
  data: {
    lessonName: '',
    className: '',
    realNum: '',
    requiredNum: '',
    createTime: '',
    list: [],
    scrollHeight: 0,
    status: '',
    attendanceId:''
  },
  onLoad: function(options) {
    var that = this
    attendanceId = options.id;
    let params = {}
    //console.log(attendanceId)
    //课程详情，调接口（上面部分）
    let url = "/portal/attendance/" + attendanceId
    http.request("get", url, params, function(res) {
      console.log("1111", res)
      that.setData({
        lessonName: res.data.lessonName,
        className: res.data.className,
        realNum: res.data.realNum,
        requiredNum: res.data.requiredNum,
        createTime: res.data.createTime,
        attendanceId: attendanceId
      })
    })

    //学生列表，调接口（下拉分页）
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that)
  },
  //页面滑动到底部,加载下一页
  bindDownLoad: function() {
    var that = this;
    loadMore(that);
    // console.log("触发bindDownLoad");
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    hasNextPage = true;
    pageNum = 1;
  },
  gotoPutScan: function (event) {
    console.log("传", event.currentTarget.dataset)
    //存进缓存
    wx.setStorageSync('map', event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/scan/scan'
    })
  }
})