// pages/basicdata/basicdata.js
Page({

  data: {
    date: '',
    marry: ['已婚', '未婚'],
    salary: ['1000-2000', '2000-3000'],
    sex: ['女', '男'],
    education: ['高中', '本科','研究生','博士'],
    nation: ['汉族', '回族', '维吾尔族', '藏族'],
    height: ['150cm-160cm', '160cm-170cm', '170cm-180cm', '180cm-190cm'],
    weight: ['40kg-50kg', '50kg-60kg', '60kg-70kg', '70kg以上'],
    region: ['', '', ''],
    customItem: '全部'
    
  },


  onLoad: function (options) {

  },

 
  onReady: function () {

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindMarryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      marryindex: e.detail.value
    })
  },
  bindsalaryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      salaryindex: e.detail.value
    })
  },
  bindsexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexindex: e.detail.value
    })
  },
  bindeducationChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      educationindex: e.detail.value
    })
  }, 
  bindnationChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nationindex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('位置')
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindheightChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      heightindex: e.detail.value
    })
  },
  bindweightChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weightindex: e.detail.value
    })
  },
  onShow: function () {

  },

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