// pages/linedetail/linedetail.js
Page({

  /*** 页面的初始数据*/
  data: {
    linewidth: "",
    stationsScrollLine: "",
    leftPosition: 1750,
    traffics: [
      { id: 1, index: '0', bgColor:"bg-blue",l:"60px"},
      { id: 2, index: '1', bgColor: "bg-blue", l: "60px" },
      { id: 3, index: '2', bgColor: "bg-red", l: "60px" },
      { id: 4, index: '3', bgColor: "bg-red", l: "60px" },
      { id: 5, index: '4', bgColor: "bg-red", l: "60px"},
      { id: 6, index: '5', bgColor: "bg-red", l: "60px" },
    ],

    stations:[
      { arrowIcon: false, isCurrentIcon: false, metros: false,site:'龙门石窟'},
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道龙门北桥路口', busOnTheWayIconClass: 'icon_line_bus_little bus-nearest'},
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门镇' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道国策大道口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道花园路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道古龙路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道通衢路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道伊洛路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道关林路口(关林庙西)' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '关林市场' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '龙门大道开元大道口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '开元大道龙门大道口', busOnTheWayIconClass: 'icon_line_bus_little bus-current'},
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '展览路广利街口东' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '展览路长兴街口东' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '展览路兴洛东街口西(泉舜购物中心)' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '市民之家(永泰街开元大道口南)' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '开元大道金城寨街口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '开元大道王城大道口东' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '王城大道太康路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '王城大道美茵街口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '王城大道积翠南街口(隋唐城植物园西门)' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '滨河北路上阳路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '盛世唐庄' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '上阳路九都路口南' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '涧东路行署路口', busOnTheWayIconClass:'icon_line_bus_little bus-coming' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '涧东路凯旋西路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '涧东路中州中路口' },
      { arrowIcon: true, isCurrentIcon: true, metros: false, site: '七里河' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '延安路珠江路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '延安路丽新路口' },
      { arrowIcon: false, isCurrentIcon: false, metros: false, site: '牡丹广场东' }

    ]

  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    console.log(this.data.stations.length)
    this.setData({ linewidth: this.data.stations.length*70 })
    this.setData({ stationsScrollLine: this.data.stations.length * 70 })
  },

  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /*** 生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /*** 生命周期函数--监听页面卸载 */
  onUnload: function () {

  },

  /*** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },

  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /** * 用户点击右上角分享*/
  onShareAppMessage: function () {

  }
})