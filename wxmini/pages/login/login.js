const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  phoneNumChange: function(e){
    this.setData({
      phoneNum: e.detail.value
    })
  },
  passwordChange: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  login: function() {
    var t = this
    var phoneNum = t.data.phoneNum
    if(util.isBlank(phoneNum) || phoneNum.length != 11) {
      util.showToast("请输入手机号码")
      return
    }
    var password = t.data.password
    if(util.isBlank(password)) {
      util.showToast("请输入登录密码")
      return
    }
    
    app.login(phoneNum, password, function(data) {
      if(t.checkBasicData(data)) {
        wx.switchTab({
          url: "/pages/index/index"
        })
      } else {
        wx.reLaunch({
          url: "/pages/basicdata/basicdata"
        })
      }
    })
  },
  checkBasicData: function(data) {
    console.log(data)
    
    return util.notNull(data.sex) && util.notBlank(data.birthday) && util.notNull(data.maritalStatus) 
    && util.notNull(data.annualSalary) && util.notNull(data.education) && util.notNull(data.nationality) 
    && util.notNull(data.height) && util.notNull(data.weight) && util.notNull(data.cityId)
  },
  wechatLogin: function(data) {
    util.showLoading('登录中...')
    var iv = data.detail.iv
    var encryptedData = data.detail.encryptedData
    wx.login({
      success(res){ 
        util.request(api.wechatLogin, {
          code: res.code,
          encryptedData: encryptedData,
          iv: iv
        }, function(ret){
          util.hideLoading()
          if(ret.state == "ok") {
            if(ret.user.status == -1) {
              // 账号被锁定，提示
              util.showError('账号已锁定')
              return
            }
            app.globalData.isLogin = true
            app.globalData.userInfo = ret.user
            app.globalData.token = ret.token
            console.log("token: " + ret.token)
            wx.setStorageSync("token", ret.token)

            // 登录成功后 判断是否完善个人资料
            var returnUrl = ""
            if(ret.user.status == 0) {
              // 资料未完善 跳转到完善资料页面
              wx.reLaunch({
                url: "/pages/basicdata/basicdata"
              })
            } else if(ret.user.status == 1) {
              // 资料已完善 跳转到用户页面
              wx.switchTab({
                url: "/pages/user/user"
              })
            } else {
              // 其他情况 跳转首页
              wx.switchTab({
                url: "/pages/index/index"
              })
            }

          } else {
            app.globalData.isLogin = false
            app.globalData.userInfo = null
            app.globalData.token = ""
            util.showError(ret.msg)
          }
        })
      }
    })
    
  }
})