const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');

Page({
  data: {
    showLoginModel: false,
    typeId: 0,
    search: '',
    typeName: '电话本',
    text: "郑重提醒：无论以何种理由要求你把资金打入陌生人账户的行为都是电信诈骗.",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 2,
    size: 14,
    interval: 30, // 时间间隔
    pageData: null,
    pageList: null,
    location: null,
    nearTitle: '数据加载中...',
    
  },


  onLoad: function(options) {
    var t = this
    wx.showLoading({
      title : '加载中...',
    })
    var typeId = options.typeId
    var search = options.search
    this.setData({
      typeId: typeId,
      search: search
    })
  },
  onShow:function(){
    var that = this
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },

  onReady: function () {
    var t = this;
    wx.setNavigationBarTitle({
      title: t.data.typeName
    });
    wx.showLoading({
      title: '加载中...',
    });

    var inv = setInterval(function () {
      if (app.isLogin()) {
        clearInterval(inv);

        // 当前位置坐标
        app.getLocation(function (location) {
          t.setData({ location: location });
          t.loadPageData(1);
        });
      }
    }, 100);
  },
  mackPhoneCall : function(e) {
    var phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
    // if (app.globalData.haveUserInfo) {
    //   var phone = e.target.dataset.phone;
    //   wx.makePhoneCall({
    //     phoneNumber: phone
    //   })
    // } else {
    //   this.setData({
    //     showLoginModel: true
    //   })
    // }
  },

  //  L
  // 分类列表
  loadPageData: function (page) {
    var t = this;
    user.request(api.servicePhonePageData, {
      token: app.globalData.token,
      typeId: t.data.typeId,
      search: t.data.search,
      page: page,
      lat: t.data.location.lat,
      lng: t.data.location.lng
    },
      function (data) {
        console.log(data.data);
        var pageList = t.data.pageList;
        console.log('pageList')
        console.log(pageList)
        // 计算距离
        var nearby = "";
        if (data.data.list) {
          for (var i = 0; i < data.data.list.length; i++) {
            var lat1 = t.data.location.lat;
            var lng1 = t.data.location.lng;
            var lat2 = data.data.list[i].lat;
            var lng2 = data.data.list[i].lng;
            var distance = util.getDistance(lat1, lng1, lat2, lng2);
            var distanceStr = util.formatDistance(distance);
            data.data.list[i].distance = distance;
            data.data.list[i].distanceStr = distanceStr;
            //data.data.list[i].sycs = Math.round(Math.random() * 100);
          }
        }

        // if (pageList) {
        //   pageList = pageList.concat(data.data.list);
        // } else {
           pageList = data.data.list;
        // }

        pageList = util.sortList(pageList);

        if (pageList.length > 0) {
          nearby = pageList[pageList.length - 1].distanceStr;
        } else {
          nearby = '100m';
        }

        // 生成上方附近的点文本内容
        var nearTitle = "附近" + nearby + "内";
        if (data.data.lastPage) {
          nearTitle += data.data.totalRow;
        } else {
          nearTitle += (data.data.pageNumber * data.data.pageSize);
        }
        nearTitle += "个点（共" + data.data.totalRow + "个）";

        t.setData({
          pageData: data.data,
          pageList: pageList,
          nearTitle: nearTitle
        });
        wx.hideLoading();
      });
  }
})