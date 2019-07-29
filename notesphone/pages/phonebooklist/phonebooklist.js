// pages/phonebooklist/phonebooklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classification:[
      { id: 1, name: '申通快递', img: 'kd', num:100,juli:'30km' },
      { id: 2, name: '园通快递', img: 'kd' },
      { id: 3, name: '中通快递', img: 'kd' },
      { id: 4, name: '申通快递', img: 'kd' } 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  phoneclickcontent: function(){
    wx.navigateTo({
      url: '../phonedetail/phonedetail',
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