//使用promisifyAll解决异步
import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise';
var http = require("utils/request.js")
//mock
// Mock: require("./utils/WxMock.js"),
// var Mock=require("./utils/WxMock.js"),
App({

  /**
   * 全局变量
   */
  //图片链接
  imgUrl: 'https://www.zhangaishan.com.cn',


  //是否授权(默认未授权)
  isAuth: false,

  /**
   * 全局方法
   */
  //判空
  isBlank: function(obj) {
    return (obj == undefined || obj == '' || obj == null || JSON.stringify(obj) == "{}") ? true : false;
  },

  //弹窗提示
  showMsg: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },

  //保存用户信息
  saveGlobalUserInfo: function(userInfo) {
    wx.setStorageSync("userInfo", userInfo);
  },

  //获取用户信息
  getGlobalUserInfo: function() {
    return wx.getStorageSync("userInfo");
  },

  //保存openId
  saveOpenId: function(openId) {
    wx.setStorageSync("openId", openId);
  },

  //获取openId
  getOpenId: function() {
    return wx.getStorageSync("openId");
  },

  init: function() {
    if (this.isBlank(this.getOpenId()) || this.isBlank(this.getGlobalUserInfo())) {
      this.login()
    }
  },

  login: function() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log("code: ", res.code)
          //发起网络请求
          let url = '/portal/login'
          let params = {
            code: res.code
          }
          http.request("post", url, params, function(result) {
            //未授权
            if (result.code != 0) {
              //保存openId（授权后，保存用户信息用）
              that.saveOpenId(result.data.openId);
            } else {
              //已授权（保存用户信息到本地缓存，方便以后使用）
              that.saveGlobalUserInfo(result.data.userInfo)
              //设置为已授权
              that.isAuth = true
            }
          })
        } else {
          console.log('wx.login获取code失败！' + res.errMsg)
        }
      },
      fail(res) {
        console.log('wx.login获取code失败！' + res.errMsg)
      }
    })
  },

  onLaunch: function() {
    this.init()
  },
  //判断是否登陆
  isLogin: function() {
    //通过判断用户信息是否为空，得出用户是否登陆（用户登录需把用户信息进行保存）
    return !this.isBlank(this.getGlobalUserInfo());
  },
  //授权用户信息
  auth: function() {
    let that = this
    wx.getUserInfo({
      success: function(res) {
        console.log("用户信息：", res.userInfo)
        var params = res.userInfo
        params.avatar = res.userInfo.avatarUrl
        params.openId = that.getOpenId()
        console.log("注册信息：", params)
        let url = '/portal/user'
        //注册用户
        http.request("post", url, params, function(result) {
          if (result.code == 0) {
            //保存用户信息
            that.saveGlobalUserInfo(result.data.userInfo)
            //设置为已授权
            that.isAuth = true;
          }
        })
      },
      fail:function(res){
        console.log("fail")

      }
    })
  },

  // promise: function (resolve, reject) {
  //   var promise = new Promise(function (resolve, reject) {
  //     if () {
  //       resolve(value);
  //     } else {
  //       reject(error);
  //     }
  //   });
  // }
})