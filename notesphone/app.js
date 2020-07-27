const mtjwxsdk = require('./lib/mtj/mtj-wx-sdk.js')
var util = require('./utils/util.js')
var api = require('./utils/api.js')
var user = require('./utils/user.js')
var aes = require('./lib/aes/public.js')

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //var value = "hello"
   // var enc = aes.Encrypt(value, 'BC0A9B5C6D194CD9');
    //console.log(enc)
    //console.log(aes.Decrypt(enc, 'BC0A9B5C6D194CD9'))
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    this.login()
  },
  login: function(callback) {
    var t = this
    user.login(function (wxId, token, haveUserInfo) {
      console.log("Login:" + wxId)
      console.log("Login:" + token)
      console.log("Login:" + haveUserInfo)
      
      t.setLoginState(true, wxId, token, haveUserInfo)
      if (callback) {
        callback() 
      }
    })
  },
  isLogin: function() {
    return this.globalData.isLogin
  },
  setLoginState: function (isLogin, wxId, token, haveUserInfo) {
    this.globalData.wxId = wxId
    this.globalData.token = token
    this.globalData.isLogin = isLogin
    this.globalData.haveUserInfo = haveUserInfo
  },
  getLocation: function (callback) {
    var t = this
    if (t.globalData.location) {
      callback(t.globalData.location)
    } else {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log(res)
          if (res.errMsg == "getLocation:ok") {
            
            var location = {
              lat: res.latitude,
              lng: res.longitude,
              speed: res.speed
            }
            t.globalData.location = location
            callback(location)
          }
        },
        fail: function() {
          util.showError('获取位置信息失败，距离计算可能不正确')
          var location = {
            lat: 34.65774,
            lng: 112.3957,
            speed: -1
          }
          callback(location)
        }
      })
    }
  },
  globalData: {
    token: null,
    wxId: null,
    isLogin: false,
    haveUserInfo: false,
    location: null,
    typeList:null,
  }
})
