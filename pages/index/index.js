// pages/index/index.js
const app = getApp()
var http = require("../../utils/request.js")
var pageNum = 1; //第几页
var pageSize = 3; //每页条数
var hasNextPage = true;
//请求数据
var loadMore = function(that) {
  if (hasNextPage) {
    //调接口
    let url1 = "/portal/pageArticles"
    //参数
    let params = {
      pageSize: pageSize,
      pageNum: pageNum
    }
    http.request("get", url1, params, function(res) {
      if (res.code == 0) {
        console.log(res)
        //将请求到的数据放入list
        var list = that.data.list;
        res.data.list = res.data.list.map(item => {
          return {
            ...item,
            coverUrl: app.imgUrl + item.coverUrl.split(',')
          }
        })
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
Page({


  /**
   * 页面的初始数据
   */
  data: {
    // 后台传入的数据
    list: [],
    title: '',
    summary: '',
    coverUrl: '',
    // 后台数据结束
    flag: false,
    code: '',
    showTotal: false,
    scrollHeight: 0,
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
    var that = this
    // var that = this
    // //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that)
    wx.stopPullDownRefresh()//刷新完后停止下拉刷新动效
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



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload")
    hasNextPage = true;
    pageNum = 1;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that=this;
    this.onLoad();
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
  onTap_post: function() {
    if (app.isLogin()) { //已授权
      // 跳转到编辑文章页
      wx.navigateTo({
        url: '/pages/post/post'
      })
    } else { //未授权（弹出授权窗口）
      this.setData({
        show: true
      })
    }
  },

  buttontap(e) {
    this.setData({
      show: false
    })
    // 跳转到编辑文章页
    wx.navigateTo({
      url: '/pages/post/post'
    })
  },

  //跳转到文章详情
  goToPosting: function (event) {
    var articleId = event.currentTarget.dataset.articleid;
    console.log("id", articleId)
    wx.navigateTo({
      url: '../posting/posting?id=' + articleId,
    })
  }
})