App({
  /**
   * 全局变量
   */
  //接口地址
  globalUrl : 'http://47.98.240.189/zas',
  //图片链接
  imgUrl : 'http://47.98.240.189/images/', 
  //token
  token : '',


  /**
   * 全局方法
   */
  //判空
  isBlank: function (obj) {
    return (obj == undefined || obj == '' || obj == null || JSON.stringify(obj) == "{}" ) ? true : false;
  },
  //弹窗提示
  showMsg: function (msg) {

  },
  //保存用户信息
  saveGlobalUserInfo: function (userInfo) {
    wx.setStorageSync("userInfo", userInfo);
  },
  //获取用户信息
  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },
  
})