// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storage_input: '',
    storage_title: '',
    pic_src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.cloud.init({
      env: 'dev-rm93l'
    })
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
  // 选择要上传的照片
  //JS文件   上传图片函数
  upload_picture: function (name) {
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      success(res) {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })



        //将照片上传至云端需要刚才存储的临时地址
        // wx.cloud.uploadFile({
        //   cloudPath: 'test.jpg',
        //   filePath: tempFilePaths[0],
        //   success(res) {
        //     // //上传成功后会返回永久地址
        //     that.setData({
        //       pic_src:res.fileID
        //     })
        //     wx.setStorageSync('pic_src', res.fileID)
        //   },
        //   fail(){
        //     console.log('失败')
        //   }
        // })
      }
    })
  },

  //获取输入值
  getTitle: function (e) {
    this.setData({
      storage_title: e.detail.value
    })
  },
  getInput: function(e) {
    this.setData({
      storage_input: e.detail.value
    })
  },

  //存储输入值
  save: function() {
    var now=new Date()
    wx.setStorageSync('storage_title', this.data.storage_title)
    wx.setStorageSync('storage_input', this.data.storage_input)
    // 返回上一级页面时刷新
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({ //更新上一个页面列表数据为空
      "list": [],
      flag:true,
    })
    wx.navigateBack({
      delta: 1,
      url: '/pages/index/index',
      success: function(e) {
        //返回上一个页面更新数据
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }


})