const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
//获取应用实例
const app = getApp()
Page({

  data: {
    id:'',
    acyiveinfo: ``,
    acyiveprocess: ``,
    enroll: ``,
    note: ``,
    title:"",
    activityAddress: "",
    date:"",
    time:"",
    activityBannerPic:"",
    isEntry:"true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    this.setData({
      id: options.id
    })
    
    var  data= {
        id: options.id
      }
      util.request(api.findActivityById, data, function (data) {
       
        
        if (data.state == "ok") {
          console.log(data);
          var startTime = data.data.activity.startTime;
          startTime.substring(0, startTime.indexOf("T"))
         
          var endTime = data.data.activity.endTime;
          that.setData({
            title: data.data.activity.title,
            acyiveinfo: data.data.activity.introduction,
            activityAddress: data.data.activity.activityAddress,
            acyiveprocess: data.data.activity.activityFlow,
            enroll: data.data.activity.regulation,
            note: data.data.activity.announcement,
            date: startTime.substring(0, startTime.indexOf("T")),
            time: data.data.time,
            activityBannerPic: data.data.activityBanner.activityBannerPic,
            file:api.file
          });

          return;
        
      }
    })
    //如果登陆后判断是否报名
    console.log("denglu==" + app.isLogin());
    if (app.isLogin()){
      
       var data= {
          activityId: options.id,
        }
        util.request(api.findIsEntryByactIdUserId, data, function (data) {

          if (data.state == "ok") {

            that.setData({
              isEntry: false
            });
         
          }else{
        
            that.setData({
              isEntry: true
            });
          }
        
      })
    }else{
      that.setData({
        isEntry: true
      });
    }
  },
  /**
   * 报名
   */
  entry:function(){
    var that = this;
   
     var  data= {
        activityId: that.data.id,
      }
    console.log(app.isLogin());
      if(app.isLogin(true)){
      util.request(api.activityEntrySave, data, function (data) {
        wx.hideLoading();

        if (data.state == "ok") {
          util.showSuccess("报名成功！")
          that.setData({
            isEntry: false
          });
          return;
        }
      
    })
      }
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