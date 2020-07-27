const common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    educations:common.educations,
    unitNatures: common.unitNatures,
    industry:common.industry,
    duties:common.duties,
    wordState:common.wordState,
    salarys:common.salarys,
    index:{}
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

  },
  bindPickerChange: function(e) {
    var type = e.target.dataset.type
    var i = e.detail.value
    i = parseInt(i)
    var index = this.data.index
    index[type] = i
    this.setData({
      index: index
    })
  }
})