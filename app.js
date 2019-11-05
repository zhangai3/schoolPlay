App({
  /**
   * 全局变量
   */
  //接口地址
  globalUrl : 'https://www.zhangaishan.com.cn/wxApp',
  //图片链接
  imgUrl: 'https://www.zhangaishan.com.cn', 
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
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          // url: this.globalUrl+'/portal/user/login',
          url: 'https://www.zhangaishan.com.cn/wxApp/portal/user/login',
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          method: 'post',
          data: {
            code: res.code
          },
          success(data) {
            console.log(data)
            return
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
  
})