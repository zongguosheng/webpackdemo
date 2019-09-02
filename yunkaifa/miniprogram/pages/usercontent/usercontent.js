const app = getApp()

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    src:'',
    filePath:'',
    list:[
      { name: '我的故事'  },
      { name: '我的介绍'  },
      { name: '擅长领域'  },
      { name: 'promise用法'},
      { name: '文章列表' }

    ]
   
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    
  },
  goTolink:function(e){
    console.log(e);
    var d=e


  },
  personinfo:function(){
    
    wx.navigateTo({
      url: '../user/user',
    })
    console.log('个人信息')
  },
  goToList:function(){
    wx.navigateTo({
      url: '../newslist/newslist',
    })
  },
  onGetUserInfo:function(e){
    console.log(e)
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         lang: 'zh_CN',
    //         success: res => {
    //           console.log(res)
    //           console.log(res.userInfo)
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    console.log(e)
    if(!this.logged && e.detail.userInfo){

      this.setData({
        logged:true,
        userInfo: e.detail.userInfo,
        avatarUrl: e.detail.userInfo.avatarUrl
        })
    }

  },
  paizhao: function(){
   

    console.log('===')
   
  },
  //获取openId
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
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