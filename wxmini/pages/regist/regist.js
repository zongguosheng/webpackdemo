const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    verifyCode: '',
    password: '',
    isOk:true,
    time:60
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
  verifyCodeChange: function(e){
    this.setData({
      verifyCode: e.detail.value
    })
  },
  passwordChange: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  
  sendRegVerifyCode: function() {
    var t = this
    if(!t.data.isOk) {
      return
    }
    var phoneNum = t.data.phoneNum
    if(util.isBlank(phoneNum) || phoneNum.length != 11) {
      util.showToast("手机号格式错误")
      return
    }
    util.request(api.sendRegVerifyCode, {
      phoneNum: phoneNum
    }, function(data){
      if(data.state == "ok") {
        util.showToast("验证码发送成功，请注意查收")
        t.setData({
          isOk: false
        })
        t.startTimer()
      } else {
        util.showToast(data.msg)
      }
    })
  },
  regist: function() {
    var t = this
    var phoneNum = t.data.phoneNum
    if(util.isBlank(phoneNum) || phoneNum.length != 11) {
      util.showToast("手机号格式错误")
      return
    }
    var verifyCode = t.data.verifyCode
    if(util.isBlank(verifyCode)) {
      util.showToast("请填写验证码")
      return
    }
    var password = t.data.password
    if(util.isBlank(password)) {
      util.showToast("请填写登录密码")
      return
    }
    var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
    if(!passwordReg.test(password)) {
      util.showToast("密码格式错误，至少包含数字和字母")
      return
    }
    
    util.request(api.regist, {
      phoneNum: phoneNum,
      verifyCode: verifyCode,
      password: password
    }, function(data){
      if(data.state == "ok") {
        util.showSuccess("注册成功", function() {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        })
      } else {
        util.showError(data.msg)
      }
    })
  },
  startTimer: function() {
    var t = this
    var time = t.data.time
    if(time > 0) {
      time--
      this.setData({
        time: time
      })
      setTimeout(t.startTimer, 1000)
    } else {
      this.setData({
        time: 60,
        isOk: true
      })
    }
  }
})