//index.js
var commonCityData = require('../../utils/areaList.js');
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')
//获取应用实例
const app = getApp()

Page({

  data: {
    imagePath: api.file,
    page: 1,
    list: [],
    sortName: '默认排序',
    sortList: [ {id:0, name:'默认排序', type:'default'}, 
                {id:1, name:'最近加入', type:'join'}, 
                {id:2, name:'最近登录', type:'login'}, 
                {id:3, name:'距离最近', type:'distance'}],
    provinces: [],
    citys: [],
    districts: [],
    isShow: 0,
    sex: ['女', '男'],
    ages:common.ages,
    nation: common.nationals,
    height: common.heightTs,
    weight: common.weight,
    salary: common.salarys,
    education: common.educations,
    cars: common.cars,
    houses: common.houses,
    index:{}
  },

  onLoad: function (options) {
    console.log(commonCityData);
    var that = this;
    this.initCityData(1);
  },
  onReady: function () {
    var t = this
    t.getPageList(t.data.page)
    
  },
  onShow: function () {
    
  },

  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      list: [],
      pageData: null
    })
    this.getPageList(1)
  },

  onReachBottom: function () {
    var pageData = this.data.pageData
    if(pageData.lastPage) {
      return
    }
    var page = this.data.page
    page = page + 1
    this.setData({
      page: page
    })
    this.getPageList(page)
    console.log("onReachBottom")
  },
  getPageList: function(page) {
    console.log("加载数据：" + page)
    var t = this
    util.request(api.indexPageData, {
      page: page
    }, function(ret) {
      if(ret.state == "ok") {
        var pageData = ret.page
        var list = t.data.list
        var pageList = pageData.list
        if(pageList) {
          for (let index = 0; index < pageList.length; index++) {
            const item = pageList[index];
            pageList[index].age = util.age(item.birthday)
          }
          list = list.concat(pageList)
        }
        t.setData({
          pageData: pageData,
          list: list
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  initCityData: function (level, obj) {
    console.log("commonCityData==" + commonCityData);
    console.log("initCityData====level===" + level + "==Obj====" + obj);
    if (level == 1) {
      var pinkArray = [];
      for (var i = 0; i < commonCityData.cityData.length; i++) {
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces: pinkArray
      });
      console.log("provinces==" + this.data.provinces);
    } else if (level == 2) {
      var pinkArray = [];
      var dataArray = obj.cityList
      console.log("dataArray===" + dataArray);
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys: pinkArray
      });
    } else if (level == 3) {
      var pinkArray = [];
      var dataArray = obj.districtList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts: pinkArray
      });
      console.log("districts===" + this.data.districts);
    }

  },
  bindPickerProvinceChange: function (event) {
    console.log("Province==" + event);

    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince: selIterm.name,
      selProvinceIndex: event.detail.value,
      selCity: '请选择',
      selDistrict: '请选择',
      provinceId: selIterm.id
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange: function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      cityId: selIterm.id
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange: function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[
      event.detail.value];
    this.setData({
      selDistrict: selIterm.name,
      selDistrictIndex: event.detail.value,
      districtId: selIterm.id
    })
  },

  bindSelectChange: function(e) {
    var index = this.data.index
    var type = e.currentTarget.dataset.type
    index[type] = e.detail.value
    this.setData({
      index: index
    })
  },
  gotoinfo: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../profile/profile?id=' + id,
    })
  },

  openview: function (e) {
    var t = this
    var index = e.currentTarget.dataset.index
    index = parseInt(index)
    var isShow = t.data.isShow
    if(index == isShow) {
      index = 0
    }
    t.setData({
      isShow: index
    })
  },

  sortclick: function(e) {
    var t = this
    debugger
    var sortType = e.currentTarget.dataset.sorttype
    var sortName = e.currentTarget.dataset.sortname
    t.setData({
      sortType: sortType,
      sortName: sortName
    })
    t.close()
  },

  close: function() {
    this.setData({
      isShow: 0
    })
  }
})