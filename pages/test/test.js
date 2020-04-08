var API = require('../../utils/api.js')
const app = getApp();
Page({
  data: {
    isToggle: false, //是否超过2行？true--超过，false--没有超过
    requireAll: false, //展开/收起全部问题描述true--展开，false--收起
  },
  //mock数据信息
  onLoad: function() {
    var that = this
    // 使用 Mock
    API.ajax('', function(res) {
      //这里既可以获取模拟的res
      console.log("mock数据", res)
      that.setData({
        list: res.data
      })
    });
    // 使用 Mock结束

    //加载数据之后...获取文本的实际高度infoHeight，大于外层wrap则显示两行，多余显示省略号
    const query = wx.createSelectorQuery()
    query.select('#question_info_txt').boundingClientRect()
    query.exec(function(res) {
      var isToggle = that.data.infoWrapperHeight <= res[0].height ? true : false;
      that.setData({
        infoHeight: res[0].height,
        isToggle: isToggle
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取外层wrap的高度
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('#question_info').boundingClientRect()
    query.exec(function(res) {
      that.setData({
        infoWrapperHeight: res[0].height
      })
    })
  },
  requireTxt: function() {
    const that = this;
    const requireAll = that.data.requireAll
    // console.log("前",requireAll)
    that.setData({
      requireAll: !requireAll
    })
    // console.log("后", that.data.requireAll)
  }
})