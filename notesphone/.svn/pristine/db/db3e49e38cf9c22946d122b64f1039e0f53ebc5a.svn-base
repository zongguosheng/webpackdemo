var util = require('./util.js')
var api = require('./api.js')
var aes = require('../lib/aes/public.js')
const app = getApp()


function request(url, data = {}, callback, encrypt=true) {
  data.appKey = "app2"
  var token = data.token
  wx.request({
    url: url,
    data: data,
    header: {
      token: token
    },
    dataType: 'text',
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        if (encrypt) {
          data = data.replace(/"/g, "");
          data = aes.Decrypt(data, token)
        }
        data = JSON.parse(data)
        if (data) {
          if (data.code == 0) {
            callback(data)
          } else if (data.code == 1004) {
            util.showError('登录失败')
          } else {
            util.showError(data.desc)
          }
        } else {
          util.showError('参数解析异常')
        }
      } else {
        util.showError(res.errMsg)
      }
    },
    fail: function (err) {
      util.showError(err.errMsg)
    }
  })
}

function login(callback) {
  wx.login({
    success(res) {
      console.log(res)
      loginByCode(res.code, callback)
    },
    fail() {
      util.showError('自动登录失败')
    }
  })
}

function loginByCode(code, callback) {
  request(api.authLogin, { code: code}, function(data){
    callback(data.wxId, data.token, data.haveUserInfo)
  }, false)
}

module.exports = {
  request: request,
  login: login,
}