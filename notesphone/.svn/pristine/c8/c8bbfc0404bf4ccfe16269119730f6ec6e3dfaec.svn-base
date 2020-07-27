const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');
Page({

  data: {
    cateItems: [{
      type:{
        id:1,
        name: '推荐服务',
        icon:'',
        parentId: 0
      },
      list: [{},{}]
   }
    ],
    curNav: 1,
    curIndex: 0,
   
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
    var t = this;
    wx.showLoading({
      title: '加载中...',
    });
    var inv = setInterval(function () {
      if (app.isLogin()) {
        clearInterval(inv);
        user.request(api.serviceTypeList, {
          token: app.globalData.token
        },
          function (data) {
            var list = data.data;
            console.log(list);
            app.globalData.typeList = list;
            console.log()
            t.setData({
              cateItems: list
            });
            wx.hideLoading();
          });
      }
    }, 100);
  },
  //分类列表点击  
  sortRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
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