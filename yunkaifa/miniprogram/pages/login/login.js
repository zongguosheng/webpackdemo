// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /***页面的初始数据*/
  data: {
    
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            
              console.log(res.userInfo.nickName)

            }
          })
        }
      }
    })


  },

  bindGetUserInfo(e) {
    wx.showToast({
      icon: 'success',
      title: '登陆成功',
    })
    wx.switchTab({
      url: '../index/index',
    })
    console.log(e.detail.userInfo)
  },
     // 获取用户名密码
    usernameInput: function (event) {
     // console.log(event.detail.value);
      this.setData({ username: event.detail.value })
    },

    passwordInput: function (event) {
     // console.log(event);
      this.setData({ password: event.detail.value })
    },

    goregister:function(){
      wx.redirectTo({
        url: '../register/register',
      })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})