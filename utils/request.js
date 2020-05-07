
var host = 'https://www.zhangaishan.com.cn/wxApp'; //项目地址  正式环境
// var host = 'http://192.168.0.103:8080/wxApp'; //项目地址  本地环境

function request(type,url,postData,doSuccess,doFail) {
  wx.request({
    url: host+url,
    data: postData,
    header: {
      "content-type":"application/json"
    },
    method: type,
    dataType: 'json',
    responseType: 'text',
    success: function (res) { 
      //setFileToken(res);
      doSuccess(res.data)
    },
    fail: function (res) { 
      // doFail()
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    },
    complete: function (res) { },
  })
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
// function setFileToken(res) {
//   if (res.header["Set-Cookie"] && res.header["Set-Cookie"].indexOf('fileToken') != -1) {
//     let arr = res.header["Set-Cookie"].split('fileToken=')
//     // console.log(arr[arr.length - 1].split(';')[0])
//     wx.setStorageSync("fileToken", arr[arr.length - 1].split(';')[0])
//   }
// }

module.exports.request = request;
// module.exports.requestF = requestF;
// module.exports.getData = getData;
module.exports.host = host;
// module.exports.setFileToken = setFileToken;

