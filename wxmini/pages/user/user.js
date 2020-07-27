// pages/user/user.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headpic: "../images/head.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onReady: function () {
  },
  gotopersoninfo: function (){
    wx.navigateTo({
      url: '../basicinfo/basicinfo',
    })
  },
  onShow: function () {
    var that = this;
    if (!app.isLogin(true)) {
      return
    }
    util.request(api.findmycenterById, null, function (data) {
      if (data.state == "ok") {
        console.log(data);
        var data = data.data;
        var female = "";
        if (data.blindUser.sex == 0) {
          female = "女士"
        } else if (data.blindUser.sex == 1) {
          female = "先生"
        }
        var name = data.blindUser.name
        if (name) {
          name = name.substring(0, 1)
        } else if (data.blindUser.nickName) {
          name = data.blindUser.nickName
        } else {
          name = "用户9527"
        }

        // var startTime = data.data.activity.startTime;
        // startTime.substring(0, startTime.indexOf("T"))

        // var endTime = data.data.activity.endTime
        var headpic = that.data.headpic
        if (util.notBlank(data.headpic)) {
          headpic = api.file + data.headpic.picurl
        }

        that.setData({
          name: name + female,
          blindUserId: data.blindUser.id,
          age: data.age,
          career: common.careers[data.blindUser.career],
          livePlace: data.areaStr,
          height: data.blindUser.height,
          nationality: common.nationals[data.blindUser.nationality],
          education: common.educations[data.blindUser.education],
          annualSalary: common.salarys[data.blindUser.annualSalary],
          marry: common.marrys[data.blindUser.maritalStatus],
          data: data,
          unitNature: common.unitNatures[data.blindUser.unitNature],
          car: common.cars[data.blindUser.car],
          house: common.houses[data.blindUser.house],
          headpic: headpic,

        });
        console.log(that.data);
        return;
      }
    })
  },
  mateselectTo: function (e) {
    var url = e.currentTarget.dataset.url
      console.log();
      wx.navigateTo({
        url: url
    })
  },
  navigateTo: function(e) {
    var url = e.currentTarget.dataset.url
    
    if(app.isLogin(true)) {
      wx.navigateTo({
        url: url
      })
    }
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