// pages/post/post.js
const app = getApp()
var http = require("../../utils/request.js")

Page({
  data: {
    titleCount: 0, //标题字数
    contentCount: 0, //正文字数
    title: '没有', //标题内容
    content: '', //正文内容
    images: [], //预览的图片
    coverUrl: ''
  },
  chooseImage(e) {
    let that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log("图片文件", res.tempFilePaths[0])
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        that.setData({
          images: images.length <= 1 ? images : images.slice(0, 1)
        })
        //上传图片
        that.uploadFile(res.tempFilePaths[0])
      }
    })
  },
  uploadFile: function (path) {
    let that = this
    wx.uploadFile({
      url: http.host + '/upload/uploadImg',
      filePath: path,
      name: 'imgFile',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        imgName: '33'
      },
      success: function (res) {
        console.log(res.data)
        let result = JSON.parse(res.data)
        app.showMsg(result.msg)
        that.setData({
          coverUrl: result.data
        })
      },
      fail: function (res) {
        console.log('fail');
      },
    })
  },
  handleContentInput(e) {
    const value = e.detail.value
    // this.data.content = value
    // this.data.contentCount = value.length  
    this.setData({
      content: e.detail.value,
      // contentCount: value.length//计算已输入的正文字数
    })
    // console.log("222", this.data.content + this.data.contentCount)
    console.log("输入的内容", this.data.content)
  },
  //发布
  save: function () {
    let that = this
    //发布文章
    let url = '/portal/article'
    let coverUrl = that.data.coverUrl
    var params = {
      allowComment: 1,
      content: that.data.content,
      coverUrl: coverUrl,
      title: '没有',
      userId: app.getGlobalUserInfo().id
    }
    http.request("post", url, params, function (res) {
      if (res.code == 0) {
        wx.reLaunch({
          url: '/pages/index/index',
          success:function(e){
            app.showMsg(res.msg)
          }
        })
      }else{
        app.showMsg(res.msg)
      }
    })
  }



})