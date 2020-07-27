//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    isShow: 1
  },

  onLoad: function (options) {
    
  },

  onReady: function () {
    
  },
  gotoinfo: function () {
    wx.navigateTo({
      url: '../profile/profile',
    })
  },

  clicksort: function (e) {
    if (this.data.isShow == 1){
      this.setData({
        isShow: 0
      })
    }else {
      this.setData({
        isShow: 1
      })
    }
      
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  }
})