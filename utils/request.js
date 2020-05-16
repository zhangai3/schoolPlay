// var host = 'https://www.zhangaishan.com.cn/wxApp'; //项目地址  正式环境
var host = 'http://192.168.0.103:8080/wxApp'; //项目地址  本地环境/

function request(type,url,postData,doSuccess,doFail) {
  let token = wx.getStorageSync('token')
  // // console.log("token:", token)
  postData.token = token
  wx.request({
    url: host+url,
    data: postData,
    header: {
      "content-type":"application/json",
      "token":token
    },
    method: type,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      setToken(res) 
      doSuccess(res.data)
    },
    fail: function (res) { 
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    },
    complete: function (res) { },
  })
}
function setToken(res) {
  if (res.data.data !=null && res.data.data.token) {
    let token = res.data.data.token
    wx.setStorageSync('token',token)
  }
}
// function requestF(url, postData, doSuccess, doFail) {
//   wx.request({
//     url: host + url,
//     data: postData,
//     header: {
//       "content-type": "application/x-www-form-urlencoded"
//     },
//     method: 'POST',
//     dataType: 'json',
//     responseType: 'text',
//     success: function (res) {
//       setFileToken(res);
//       doSuccess(res.data)
//     },
//     fail: function (res) {
//       // doFail()
//       wx.showToast({
//         title: '网络错误',
//         icon: 'none'
//       })
//     },
//     complete: function (res) { },
//   })
// }

// function getData(url, doSuccess, doFail) {
//   wx.request({
//     url: host+url,
//     header: {
//       "content-type": "application/json;charset=UTF-8"
//     },
//     method: "POST",
//     success: function (res) {
//       setFileToken(res);
//       doSuccess(res.data);
//     },
//     fail: function (res) {
//       // doFail();
//       wx.showToast({
//         title: '网络错误',
//         icon: 'none'
//       })
//     }
//   })
// }


module.exports.request = request;
module.exports.host = host;


