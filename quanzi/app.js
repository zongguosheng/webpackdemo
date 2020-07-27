App({
  globalData: {
   
  },
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    // console.log(menuButtonObject)
    // console.log(menuButtonObject.height)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (navTop - statusBarHeight)*2;//导航高度
          // console.log(statusBarHeight)
          // console.log(navTop+'navTop')
          // console.log((navTop - statusBarHeight)*2)
          // console.log(navHeight)
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  onShow: function (options) {
    
  },

  onHide: function () {
    
  },

  onError: function (msg) {
    
  }
})
