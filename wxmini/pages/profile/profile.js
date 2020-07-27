// pages/profile/Profile.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    age:'',
    career:'',
    provinceStr:'',
    cityStr:'',
    areaStr:'',
    isAttention: "true",
    headpic: "../images/head.png"
  },
  scroll(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    this.setData({
      id: options.id
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var data = {
      id: that.data.id
    }
    util.request(api.findUserInfoById, data, function (data) {
      if (data.state == "ok") {
        console.log(data);
        var data = data.data;
        var female = "";
        var sexStr="";
        if (data.blindUser.sex == 0) {
          female = "女士";
          sexStr = "女";
        } else if (data.blindUser.sex == 1) {
          female = "先生";
          sexStr= "男";
        }
        var name = data.blindUser.nickName.substring(0, 1);
        if (util.notBlank(data.blindUser.name)){
          name = data.blindUser.name.substring(0, 1)
        }
      
        // var startTime = data.data.activity.startTime;
        // startTime.substring(0, startTime.indexOf("T"))

        // var endTime = data.data.activity.endTime
        var headpic = that.data.headpic
        if (util.notBlank(data.headpic)) {
          headpic = api.file + data.headpic.picurl
        }
        console.log(headpic);
        console.log(sexStr);
        var ageTStr="";
        var educationTStr="";
        var houseTStr="";
        var carTStr="";
        var marryTStr="";
        var salaryTStr="";
        var educationTStr="";
        if (util.notBlank(data.spousestandard)){
          ageTStr = data.spousestandard.startAge + "-" + data.spousestandard.endAge;
          educationTStr= educationTStr = common.educations[data.spousestandard.education];
          salaryTStr =common.salarys[data.spousestandard.salary];
          marryTStr = common.marrys[data.spousestandard.marry];
          carTStr = common.cars[data.spousestandard.car];
       
          houseTStr = common.houses[data.spousestandard.house];
        }
        that.setData({
          name: name + female,
          blindUserId: data.blindUser.id,
          age: data.age,
          career: common.careers[data.blindUser.career],
          livePlace: data.areaStr,
          height: common.heights[data.blindUser.height],
          weight: common.weight[data.blindUser.weight],
          nationality: common.nationals[data.blindUser.nationality],
          education: common.educations[data.blindUser.education],
          annualSalary: common.salarys[data.blindUser.annualSalary],
          marry: common.marrys[data.blindUser.maritalStatus],
          data: data,
          unitNature: common.unitNatures[data.blindUser.unitNature],
          car: common.cars[data.blindUser.car],
          house: common.houses[data.blindUser.house],
          chinesezodiac: common.chinesezodiacs[data.blindUser.chinesezodiac],
          headpic: headpic,
          pirurl: api.file,
          sexStr: sexStr,
          ageT: ageTStr,
          educationT: educationTStr,
          salaryT: salaryTStr,
          marryT:marryTStr ,
          carT: carTStr,
          houseT: houseTStr,
        });
        console.log(that.data);
        return;
      }
    })

    //如果登陆后判断是否报名
    console.log("denglu==" + app.isLogin());
    if (app.isLogin()) {

      var data = {
        toBlindUserId: "8"
      }
      util.request(api.isAttention, data, function (data) {
        console.log("isa==" + data);

        if (data.state == "ok") {

          that.setData({
            isAttention: false
          });

        } else {

          that.setData({
            isAttention: true
          });
        }

      })
    }
  },
  attention:function(){
    var that = this;
    var data = {
      toBlindUserId: "8",
    }
    if(app.isLogin()){
    util.request(api.attention, data, function (data) {
      if (data.state == "ok") {
        console.log(data);
        that.setData({
          isAttention: false
        });
        
        return;
      }
    })
    }
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