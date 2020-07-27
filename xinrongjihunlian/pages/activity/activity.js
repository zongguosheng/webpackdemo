// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [
      { src: "hd1", title: "但愿人长久~千里共婵娟~~9月12线下活动~", datetime: "2019-09-12", activitytime: "上午9:00 - 11:00", address: "洛阳市涧西区青少年活动中心四小姐的店", state: "1" },
      { src: "hd2", title: "但愿人长久~千里共婵娟~~9月12线下活动~", datetime: "2019-09-12", activitytime: "上午9:00 - 11:00", address: "洛阳市涧西区青少年活动中心四小姐的店", state: "0" },
      { src: "hd1", title: "但愿人长久~千里共婵娟~~9月12线下活动~", datetime: "2019-09-12", activitytime: "上午9:00 - 11:00", address: "洛阳市涧西区青少年活动中心四小姐的店", state: "1" },
      { src: "hd2", title: "但愿人长久~千里共婵娟~~9月12线下活动~", datetime: "2019-09-12", activitytime: "上午9:00 - 11:00", address: "洛阳市涧西区青少年活动中心四小姐的店", state: "0" },
    ]
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
  gotoinfo: function(){
    console.log('===')
    wx.navigateTo({
      url: '../activityinfo/activityinfo',
    })
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