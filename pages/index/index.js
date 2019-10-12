// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tech: [],
    imageUrl: '',
    name: '',
    flag:false,
    pic_src1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
        key: 'storage_title',
        success: function(res) {
          // success
          that.setData({
            storage_title: res.data
          })
        }
      }),
      wx.getStorage({
        key: 'storage_input',
        success: function(res) {
          // success
          that.setData({
            storage_input: res.data
          })
        }
      }),
      wx.getStorage({
      key: 'pic_src',
        success: function (res) {
          // success
          that.setData({
            pic_src1: res.data
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this;
    wx.request({
      url: 'https://www.apiopen.top/journalismApi',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.data)
        _this.setData({
          tech: res.data.data.tech,
          imageUrl: app.imgUrl + "1.jpg"
        })
      }
    })
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
  onTap_post: function() {
    wx.navigateTo({
      url: '/pages/post/post'
    })
  }
})