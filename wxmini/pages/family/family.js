const common = require('../../utils/common.js')
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:{},
    parentsState:common.parentsState,
    parentsEconomy:common.parentsEconomy,
    fatherWork:common.unitNatures,
    motherWork:common.unitNatures,
    familyRank:common.familyRank
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    util.request(api.getFamilyStateByUserId, null, function (data) {

      wx.hideLoading();
      console.log(data);
      if (data.state == "ok") {
        console.log(data);
        if (!util.isBlank(data.data.relatives)){
          var index = {};
          
          index.parentsState = data.data.relatives.parentsState,
            index.parentsEconomy = data.data.relatives.parentEconomy,
            index.fatherWork = data.data.relatives.fatherWork,
            index.motherWork = data.data.relatives.motherWork,
            index.familyRank = data.data.relatives.familyRank,
          that.setData({
            index:index
          });
        }
        
        return;

      }
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
  
  bindPickerChange: function(e) {
    var type = e.target.dataset.type
    console.log(type)
    var i = e.detail.value
    i = parseInt(i)
    var index = this.data.index
    index[type] = i
    this.setData({
      index: index
    })
  },


  bindparentsStateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      parentsState: e.detail.value
    })
  },
  bindparentsEconomyChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      parentsEconomy: e.detail.value
    })
  },
  bindfatherWorkChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      fatherWork: e.detail.value
    })
  },
  bindmotherWorkChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      motherWork: e.detail.value
    })
  },
  bindfamilyRankChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      familyRank: e.detail.value
    })
  },
  
  save: function () {
    console.log(this.data)
    var that = this;
    if (util.isBlank(that.data.index.parentsState)) {
      util.showError("请选择父母情况")
      return false
    }
    if (util.isBlank(that.data.index.parentsEconomy)) {
      util.showError("请选择父母经济")
      return false
    }
    if (util.isBlank(that.data.index.fatherWork)) {
      util.showError("请选择父亲工作")
      return false
    }
    if (util.isBlank(that.data.index.motherWork)) {
      util.showError("请选择母亲工作")
      return false
    }
  
    if (util.isBlank(that.data.index.familyRank)) {
      util.showError("请选择家中排行")
      return false
    }
 
    var data = {
      parentsState:that.data.index.parentsState,
      parentEconomy: that.data.index.parentsEconomy,
      fatherWork: that.data.index.fatherWork,
      motherWork: that.data.index.motherWork,
      familyRank: that.data.index.familyRank
    }
   
    util.request(api.saveFamilyState, data, function (data) {
      console.log(data)
      if (data.state == "ok") {
        util.showSuccess("保存成功", function () {
          wx.switchTab({
            url: "/pages/user/user"
          })
        })
      }
    })
  },

})