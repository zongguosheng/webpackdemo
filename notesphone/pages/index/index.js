const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');
Page({

  data: {
    typeList: [],
    img: [],
    miaosha:[
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  },
      { price: '36', oldprice: '98', src: 'img8.jpg'  }
    ],
    discountgood:[
      {src: 'img9.jpg', describe: '新款ins潮网红爆款时尚休闲...', price:'23.9',discount: '20' },
      {src: 'img9.jpg', describe: '赫本减龄黑色裙子轻熟风气赫本减龄黑色裙子轻熟风气...', price:'68.5',discount: '30' },
      {src: 'img9.jpg', describe: 'Swarovski跳动的心锁骨链', price:'420',discount: '80' },
      {src: 'img9.jpg', describe: '刘海一字夹头饰发饰少女边...', price:'8.2',discount: '40' }
    ],
    weather: null,
    pageData: null,
    pageList: null,
    location: null,
    currentTab:0,
    searchText: ''
  },

  onLoad: function (options) {
    
  },

  onReady: function () {
    var t = this;
    wx.showLoading({
      title: '加载中...',
    });


    var inv = setInterval(function () {
      if (app.isLogin()) {
        clearInterval(inv);
        user.request(api.serviceTypeList, {
          token: app.globalData.token
        },
        function (data) {
          var list = data.data[0].list;
          console.log(list);
          if(list) {
            list = list.slice(0, 5)
            app.globalData.typeList = list;
            t.setData({
              typeList: list,
              weather: data.weather
            });
          }
          wx.hideLoading();
        });
      }
    }, 100);
  },

  //点击切换
  clickTab: function (e) {
    console.log(e)
    console.log(this.data.currentTab)
    console.log(e.target.dataset.current)

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  onShow: function () {
    
  },
  gotoUserinfo: function () {
    console.log('==')
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  gotopublish: function () {
    console.log('==')
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '方便找号',
      path: '/pages/index/index',
      imageUrl: '/image/shareimg.jpg'
    }
  },
  searchInput: function(e) {
    var value = e.detail.value
    this.setData({
      searchText: value
    })
  },
  searchPhone: function(e) {
    var searchText = this.data.searchText
    if (searchText != null && searchText != '') {
      wx.navigateTo({
        url: '/pages/phonelist/phonelist?typeId=0&search=' + searchText
      })
    } else {
      util.showError('请输入搜索内容')
    }
  },
  openPhoneList: function(e) {
    var typeId = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/phonelist/phonelist?typeId='+typeId,
    })
  },
  openMymark: function(e) {
    wx.navigateTo({
      url: '/pages/mymark/mymark',
    })
  },
  openJoinme: function(e) {
    wx.navigateTo({
      url: '/pages/joinme/joinme',
    })
  },
  openlist: function(e) {
    wx.navigateTo({
      url: '/pages/seckillgoods/seckillgoods',
    })
  },
  opendiscountlist: function(e) {
    wx.navigateTo({
      url: '/pages/discountlist/discountlist',
    })
  },
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