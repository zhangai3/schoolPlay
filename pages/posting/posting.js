// pages/posting/posting.js
const app = getApp()
var http = require("../../utils/request.js")
var pageNum = 1; //第几页
var pageSize = 5; //每页条数
var hasNextPage = true; //是否有下一页
var articleId;

//获取评论内容
var loadMore = function (that) {
  if (hasNextPage) {
    let geCommentsUrl = "/portal/pageArticleComments"
    //获取用户信息，把对应用户的userId作为参数查询考勤列表参数
    let params = {
      articleId: articleId, //考勤id
      pageSize: pageSize,
      pageNum: pageNum
    }
    http.request("get", geCommentsUrl, params, function (res) {
      if (res.code == 0) {
        // console.log("获取到的评论",res)
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

  /**
   * 页面的初始数据
   */
  data: {
    articleId: '',
    //文章信息
    author: '',
    createTime: '',
    content: '',
    coverUrl: '',
    list: [],
    scrollHeight: 0,
    //文章内容
    commentContent: '',
    avatar:''
  },

  onLoad: function (options) {
    app.init()
    var that = this
    //请求文章详情信息
    let getArticalUrl = "/portal/article/" + options.id
    articleId = options.id
    let params = {
      id: options.id
    }
    http.request("get", getArticalUrl, params, function (res) {
      that.setData({
        author: res.data.author,
        createTime: res.data.createTime,
        content: res.data.content,
        coverUrl: 'https://www.zhangaishan.com.cn'+res.data.coverUrl,
        avatar: res.data.avatar,
      })
    })
    //请求文章评论（下拉分页）
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight-100
        });
      }
    });
    loadMore(that)
    wx.stopPullDownRefresh()//刷新完后停止下拉刷新动效
  },
  // 下拉刷新
  // onPullDownRefresh: function() {
  //   var that=this;
  //   this.onLoad(that);
  // },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    hasNextPage = true;
    pageNum = 1;
  },
  //页面滑动到底部,加载下一页
  bindDownLoad: function () {
    var that = this;
    loadMore(that);

  },
  //发布评论
  comment: function (event) {
    var that = this
    let postCommentUrl = "/portal/articleComment"
    that.setData({
      commentContent: event.detail
    })
    let params = {
      articleId: articleId,
      commentContent: that.data.commentContent.value,
      userId: app.getGlobalUserInfo().id
    }
    http.request("post", postCommentUrl, params, function (res) {
      // console.log("发布评论", res)
      if (res.code == 0) {
        app.showMsg(res.msg)
        
      } else {
        app.showMsg(res.msg)
      }
    })
  }
})