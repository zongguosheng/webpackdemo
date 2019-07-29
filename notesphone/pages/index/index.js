Page({

  /**
   * 页面的初始数据
   */
  data: {
     isShow: true,
    classList: 
    [ { fid: 1,  name: '便民', open:true, list: 
    [ { fid: 11, name: '快递' , imgname: 'kd' },
      { fid: 12, name: '货运物流', imgname: 'wuliu' },
      { fid: 13, name: '同城速递', imgname: 'tckd' },
      { fid: 14, name: '家电维修', imgname: 'jd' },
      { fid: 15, name: '家具维修', imgname: 'jj' },
      { fid: 16, name: '电脑维修', imgname: 'dnwx' },
      { fid: 17, name: '宽带故障', imgname: 'kuandai' },

    ]}, 
        { id: 2, name: '商户', list: [{ id: 11, name: '餐饮', imgname: 'kuandai' } ] } 
    ]
  },


  onLoad: function (options) {
    
  },
  openClass: function(a){
    var t = a.currentTarget.dataset.aid;
    console.log(a)
    t + "" != "undefined" && (this.data.classList[t].open = !this.data.classList[t].open, 
      this.setData({ isShow: this.data.classList })
    )
  },
  goBooklist:function(){
    wx.navigateTo({
      url: '../phonebooklist/phonebooklist',
    })

  },
  onReady: function () {
    
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