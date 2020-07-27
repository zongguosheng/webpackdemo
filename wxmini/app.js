const util = require('./utils/util.js')
const api = require('./utils/api.js')
App({
  onLaunch: function () {
    var t = this
    // 版本更新检查
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    this.checkLogin()
  },
  checkLogin: function() {
    var t = this
    var token = wx.getStorageSync("token");
    console.log("token: " + token)
    if(util.notBlank(token)) {
      util.request(api.checkToken, {
        token: token
      }, function(data) {
        if(data.state == "ok") {
          t.globalData.isLogin = true
          t.globalData.userInfo = data.info
          t.globalData.token = token
          
          // 登录成功后 判断是否完善个人资料
          if(data.info) {

          }


        } else {
          t.globalData.isLogin = false
          t.globalData.userInfo = null
          t.globalData.token = ""
          wx.setStorageSync("token", "")
        }
      })
    }
  },
  isLogin: function(isRedirectToLogin = false) {
    var isLogin = this.globalData.isLogin
    if(!isLogin && isRedirectToLogin) {
      util.showError("请先登录", function () {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      })
    }
    return isLogin
  },
  login: function(phoneNum, password, callback) {
    var t = this
    util.request(api.login, {
      phoneNum: phoneNum,
      password: password
    }, function(data){
      if(data.state == "ok") {
        t.globalData.isLogin = true
        t.globalData.userInfo = data.info
        t.globalData.token = data.token
        console.log("token: " + data.token)
        wx.setStorageSync("token", data.token)
        if(callback) {
          callback(data.info)
        }
      } else {
        t.globalData.isLogin = false
        t.globalData.userInfo = null
        t.globalData.token = ""
        util.showError(data.msg)
      }
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    isLogin: false,
    loginCode: null
  }
})