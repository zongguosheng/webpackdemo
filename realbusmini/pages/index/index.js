Page({

  /*** 页面的初始数据 */
  data: {
    activeTab:"main",
    canTransfer:false,
    transfer: {  },
    depart: { name: '' },
    arrive: { name: '' },
    selectedCity: {
      name: ""
    },
    latitude:'',
    longitude:''
    
  },
 
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({
      depart: { name: '我的位置' },
      arrive: { name: '你要去哪儿？' }
    })
    this.setData({
      transfer : {
        depart: this.data.depart,
        arrive: this.data.arrive
      }
    })
    this.setData({ selectedCity:{ name : '999'} })

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
       // const speed = res.speed
       // const accuracy = res.accuracy
        console.log(latitude)
        console.log(longitude)
      }
    })

    console.log( )
  },
  goStationDetail: function (e) {
   
  },
  goLineDetail: function (e) {
    wx.navigateTo({
      url: '../linedetail/linedetail',
    })
  },
  goSearch: function (e) {
   
  },
  searchCard: function(){
    wx.navigateTo({
      url: '../searchcard/searchcard',
    })
  },
  tabClick:function(e){
      this.setData({ activeTab: e.currentTarget.dataset.tab })

  },
  // 交换路线

  swapLocation: function () {
    console.log(this.data.transfer.arrive.name)
    console.log('================')
    var t = "你要去哪儿？" === this.data.transfer.arrive.name ? "你从哪里出发？" : this.data.transfer.arrive.name,
      e = this.data.transfer.depart.name;
    "我的位置" === this.data.transfer.depart.name ? e = "我的位置" : "你从哪里出发？" === this.data.transfer.depart.name && (e = "你要去哪儿？");
        console.log(t)
        console.log(e)
        //  this.setDepart({
        //   name: t
        //  }), this.setArrive({
        //      name: e
        //  });
    this.setData({ transfer: { depart: { name: t }, arrive: { name: e } }   })
  },
  goPoiSearch: function (e) {
    console.log(e);
    console.log(e.target.dataset.type)
    wx.navigateTo({
      url: "../poisearch/poisearch"
    });
  },
  // 选择城市
  goSwitchCity: function () {
    this.setData({
      guideSuggestShow: !1
    }), this.data.switchCity && wx.navigateTo({
      url: "../switch-city/switch-city"
    });
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