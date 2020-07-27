const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    miaosha:[
      {src: 'img9.jpg', describe: '好奇心钻装小森林婴儿纸尿裤L40夏季超薄透气超薄透气超薄透气', price:'78',oldprice: '158', specs:'84片/包',address:'丹尼斯南昌路店' },
      {src: 'img10.jpg', describe: '奥利奥奶茶桶饼干碎巧克力夹心饼干多口味端午休闲零食大礼包', price:'89',oldprice: '109',specs:'净含量：669g',address:'丹尼斯南昌路店' },
      {src: 'img9.jpg', describe: '斑马软管枕改善修复颈椎颈乐枕头护颈椎枕芯睡眠助眠', price:'399',oldprice: '500', specs:'',address:'丹尼斯南昌路店'},
      {src: 'img10.jpg', describe: '广东红玉妃子笑荔枝当季整箱新鲜水果', price:'69.5',oldprice: '240',specs:'净含量：2500g' ,address:'丹尼斯南昌路店'}
    ],
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
  clickTab: function (e) {
    console.log(e)
    console.log(this.data.currentTab)
    console.log(e.currentTarget.dataset.current)

    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current,
      })
    }
  },
  openinfo: function(e) {
    wx.navigateTo({
      url: '/pages/skillinfo/skillinfo',
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