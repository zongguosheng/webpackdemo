const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinLoading: false,
    join: {},
    selectorArray:[],
    selectorIndex:0
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
    var t = this
    var typeList = app.globalData.typeList
    var selectorArray = []
    if(typeList != null) {
      for (var i = 0; i < typeList.length; i++) {
        var type = typeList[i].type
        selectorArray.push(type)
      }
    }
    console.log(selectorArray)
    this.setData({
      selectorArray: selectorArray
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
    return {
      title: '商家入驻'
    }
  },
  selectorChange: function(e){
    console.log(e)
    var typeList = this.data.selectorArray
    var join = this.data.join
    var index = e.detail.value
    var type = typeList[index]
    join.merchantType = type.id
    join.merchantTypeName = type.name
    this.setData({
      join: join
    })
  },
  
  merchantJoin: function(e) {
    var t = this;
    wx.showLoading({
      title: '保存中...',
    });
    var data = t.data.join;
    if (!data.merchantType || data.merchantType == "") {
      util.showError('请选择服务类型');
      return;
    }
    if (!data.contactsMan || data.contactsMan == "") {
      util.showError('联系人不能为空');
      return;
    }
    if (!data.contactsPhone || data.contactsPhone == "") {
      util.showError('联系电话不能为空');
      return;
    }
    if (!data.merchantName || data.merchantName == "") {
      util.showError('商家名称不能为空');
      return;
    }
    if (!data.merchantAddress || data.merchantAddress == "") {
      util.showError('请选择商家位置');
      return;
    }
    data.token = app.globalData.token
    user.request(api.saveMerchantJoin, data, function(data){
      wx.hideLoading();
      util.showError('加入成功，感谢您的支持');
      t.setData({
        join: {},
        selectorIndex:0
      })
    })
  },
  userInput: function(e) {
    var value = e.detail.value
    var name = e.target.dataset.name
    var join = this.data.join
    join[name] = value
    this.setData({
      join:join
    })
  },
  openLocation: function() {
    var t = this;
    var join = t.data.join
    
    wx.chooseLocation({
      success: function(res){
        join.merchantAddress = res.address
        join.lat = res.latitude
        join.lng = res.longitude
        t.setData({
          join: join
        });
      }
    })
  }
})