const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');
Page({

  data: {
    typeList: [],
    img: [],
    weather: null,
    searchText: ''
  },

  onLoad: function (options) {

  },

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
            var list = data.data[0].list;
            console.log(list);
            app.globalData.typeList = list;
            t.setData({
              typeList: list,
              weather: data.weather
            });
            wx.hideLoading();
          });
      }
    }, 100);
  },


  onShow: function () {

  },

  searchInput: function (e) {
    var value = e.detail.value
    this.setData({
      searchText: value
    })
  },
  searchPhone: function (e) {
    var searchText = this.data.searchText
    if (searchText != null && searchText != '') {
      wx.navigateTo({
        url: '/pages/phonelist/phonelist?typeId=0&search=' + searchText
      })
    } else {
      util.showError('请输入搜索内容')
    }
  },
  openPhoneList: function (e) {
    var typeId = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/phonelist/phonelist?typeId=' + typeId,
    })
  },
  openMymark: function (e) {
    wx.navigateTo({
      url: '/pages/mymark/mymark',
    })
  },
  openJoinme: function (e) {
    wx.navigateTo({
      url: '/pages/joinme/joinme',
    })
  }
})