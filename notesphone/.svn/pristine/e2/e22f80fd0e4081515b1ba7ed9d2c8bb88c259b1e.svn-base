const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:null,
    collectionPage: null,
    location: null,
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
    var t = this
    wx.showLoading({
      title : '加载中...',
    })
    // 当前位置坐标
    app.getLocation(function (location) {
      t.setData({
        location: location ,
      })
      t.loadCollectionList(1)
    })
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

  mackPhoneCall: function (e) {
    var phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  loadCollectionList(page) {
    var t = this;
    user.request(api.collectionList, {
      token: app.globalData.token,
      page: page
    },
    function (data) {
      var pageList = t.data.collectionList;
      // 计算距离
      var nearby = "";
      var list = data.data.list
      if (list) {
        for (var i = 0; i < list.length; i++) {
          var lat1 = t.data.location.lat;
          var lng1 = t.data.location.lng;
          var lat2 = list[i].lat;
          var lng2 = list[i].lng;
          var distance = util.getDistance(lat1, lng1, lat2, lng2);
          var distanceStr = util.formatDistance(distance);
          list[i].distance = distance;
          list[i].distanceStr = distanceStr;
          list[i].sycs = Math.round(Math.random() * 100);
        }
      }
      if (data.data.firstPage) {
        pageList = list;
      } else {
        pageList = pageList.concat(list);
      }
      t.setData({
        collectionPage: data.data,
        collectionList: pageList
      });
      wx.hideLoading();
    });
  },
})