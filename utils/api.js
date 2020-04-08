let API_HOST = "http://xxx.com/xxx";
let DEBUG = true; //切换数据入口
var Mock = require('./WxMock.js')

// 模拟数据
Mock.mock('https://mockjs1', {
  'data|2': [{
    'id|+1': 1,
    'img': '@image()',
    'title': '@ctitle(3,15)',
    'summary': "@csentence(10, 50)", //摘要
    'userId': "@name()", //用户ID  
    'createTime': '@date()', //创建时间
  }]
})

Mock.mock('https://mockjs2', {
  'data|4': [{
    'id|+1': 1,
    'coursename':"@ctitle(4,6)", //课程名  
    'classname': "@ctitle(4,6)", //班级  
    'time':"@datetime()",
  }]
})