// pages/basicdata/basicdata.js
var commonCityData = require('../../utils/areaList.js');
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0,
    pickerRegionRange: [],
    pickerSelect: [0, 0, 0],
    familyRegister: "",
    date: '',
    birthdayDate:"",
    marry: common.marrys,
    marryindex: "",
    salary: common.salarys,
    sex: ['女', '男'],
    sexindex: "",
    education: common.educations,
    unitNatureindex:"",
    unitNatures: common.unitNatures,
    nation: common.nationals,
    height: common.heightTs,
    weight: common.weight,
    region: ['', '', ''],
    childs: common.childs,
    smokings: common.smokings,
    drinkings: common.drinkings,
    cars: common.cars,
    houses: common.houses,
    chinesezodiacs: common.chinesezodiacs,
    zodiacs: common.zodiacs,
    bloodTypes: common.bloodTypes,
    customItem: '全部'
  },

  // var areaList = [
  //   {
  //     name: '河南',
  //     id: 1,
  //     parentId: 0
  //   }
  // ],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(commonCityData);
    var that = this;
    this.initCityData(1);

    //加载地址数据

    util.request(api.findBlindUserById, null, function(data) {

      wx.hideLoading();
      console.log(data);
      if (data.state == "ok") {
        console.log(data);
        var birthday = data.data.blindUser.birthday;
        var birthdayDate;
        if (util.isBlank(birthday)){
          birthdayDate=""
        }else{
          birthdayDate=birthday.substring(0, birthday.indexOf(" "))
        }
        var provinceStr;
        if (util.isBlank(data.data.provinceStr)){
          provinceStr='请选择';
        }else{
          provinceStr=data.data.provinceStr;
          that.setData({
            provinceId: data.data.blindUser.provinceId,
          })
        }
        that.setData({
          selProvince: provinceStr,      
          cityId: data.data.blindUser.cityId,
          districtId: data.data.blindUser.districtId,
          selCity: data.data.cityStr,
          selDistrict: data.data.areaStr,
          sexindex: data.data.blindUser.sex,
          date: birthdayDate,
          marryindex: data.data.blindUser.maritalStatus,
          salaryindex: data.data.blindUser.annualSalary,
          educationindex: data.data.blindUser.education,
          unitNatureindex: data.data.blindUser.unitNature,
          nationindex: data.data.blindUser.nationality,
          heightindex: data.data.blindUser.height,
          weightindex: data.data.blindUser.weight,
          childsindex: data.data.blindUser.childs,
          smokingindex: data.data.blindUser.smoking,
          drinkingindex: data.data.blindUser.drinking,
          housesindex: data.data.blindUser.house,
          carsindex: data.data.blindUser.car,
          chinesezodiacsindex: data.data.blindUser.chinesezodiac,
          zodiacsindex: data.data.blindUser.zodiac,
          bloodTypesindex: data.data.blindUser.bloodType
        });

        return;

      }
    })

  },
  initCityData: function(level, obj) {
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
  bindPickerProvinceChange: function(event) {
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
  bindPickerCityChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      cityId: selIterm.id
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[
      event.detail.value];
    this.setData({
      selDistrict: selIterm.name,
      selDistrictIndex: event.detail.value,
      districtId: selIterm.id
    })
  },
  selectCity: function() {

  },
  area: function() {

  },

  onReady: function() {

  },

  bindMultiPickerChange: function(e) {
    console.log()('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    var areaList = this.data.areaList;
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    const provinceName = data.multiArray[0][data.multiIndex[0]];
    console.log(provinceName);
    var family = "";
    family = provinceName;
    let provinceId = "";
    let province = this.data.province;
    let quyuList = [],
      cityList = [],
      provinceList = [],
      city = [],
      area = [];
    try {
      province.forEach(item => {
        if (item.name === provinceName) {
          console.log("provinceId==" + provinceId);
          provinceId = item.id;
          throw (new Error('find item'))
        }
      })
    } catch (err) {}
    city = areaList.filter(item => {
      return item.pid == provinceId;
    })
    if (e.detail.column == 0) {
      data.multiIndex = [e.detail.value, 0, 0];
      try {
        area = areaList.filter(item => {
          return item.pid == city[data.multiIndex[1]].id;
        })
      } catch (err) {}
    } else if (e.detail.column == 1) {
      data.multiIndex[2] = 0;
      area = areaList.filter(item => {
        return item.pid == city[e.detail.value].id;
      })
    } else {
      const cityName = data.multiArray[1][data.multiIndex[1]];
      family += cityName;
      let cityId = '';
      try {
        areaList.forEach(item => {
          if (item.name === cityName) {
            cityId = item.id;
            throw (new Error('find item'));
          }
        })
      } catch (err) {}
      area = areaList.filter(item => {
        return item.pid == cityId;
      })
      const areaName = area[e.detail.value];
      family += areaName.name;
    }
    provinceList = province.map(item => {
      return item.name
    })
    cityList = city.map(item => {
      return item.name;
    })
    quyuList = area.map(item => {
      return item.name;
    })
    data.multiArray = [provinceList, cityList, quyuList],
      this.setData(data);

    this.setData({
      familyRegister: data.multiIndex
    })
  },


  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })

  },
  bindMarryChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      marryindex: e.detail.value
    })
    console.log(this.data.marryindex)
  },
  bindsalaryChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      salaryindex: e.detail.value
    })
  },
  bindsexChange: function(e) {
    var arraySex = this.data.sex;

    console.log(e);
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.name)
    this.setData({
      sexindex: e.detail.value
    })
    console.log(arraySex[this.data.sexindex]);
  },
  bindeducationChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      educationindex: e.detail.value
    })
  },
  bindunitNatureChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      unitNatureindex: e.detail.value
    })
  },
  bindnationChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nationindex: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindheightChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      heightindex: e.detail.value
    })
  },
  bindweightChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weightindex: e.detail.value
    })
  },
  //车辆
  bindCarsChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carsindex: e.detail.value
    })
  },
  //
  bindhousesChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      housesindex: e.detail.value
    })
  },
  bindsmokingindexsChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      smokingindex: e.detail.value
    })
  },
  binddrinkChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      drinkingindex: e.detail.value
    })
  },
  bindchildsChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      childsindex: e.detail.value
    })
  },
  bindchinesezodiacChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chinesezodiacsindex: e.detail.value
    })
  },
  bindzodiacsChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zodiacsindex: e.detail.value
    })
  },
  bindbloodTypesChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bloodTypesindex: e.detail.value
    })
  },
  save: function() {
    console.log(this.data)
    var that= this;
    if (util.isBlank(that.data.date)) {
      util.showError("请选择出生年月")
      return false
    } 
    if (util.isBlank(that.data.marryindex)) {
      util.showError("请选择婚否")
      return false
    }
    if (util.isBlank(that.data.salaryindex)) {
      util.showError("请选择薪水")
      return false
    }
    if (util.isBlank(that.data.sexindex)) {
      util.showError("请选择性别")
      return false
    }
    if (util.isBlank(that.data.educationindex)) {
      util.showError("请选择教育")
      return false
    }
    if (util.isBlank(that.data.nationindex)) {
      util.showError("请选择民族")
      return false
    }
    if (util.isBlank(that.data.provinceId)) {
      util.showError("请选择省份")
      return false
    }
    if (util.isBlank(that.data.cityId)) {
      util.showError("请选择城市")
      return false
    }
    if (util.isBlank(that.data.districtId)) {
      util.showError("请选择区")
      return false
    }
    if (util.isBlank(that.data.heightindex)) {
      util.showError("请选择身高")
      return false
    }
    if (util.isBlank(that.data.weightindex)) {
      util.showError("请选择体重")
      return false
    }
    if (util.isBlank(that.data.housesindex)) {
      util.showError("请选择购房要求")
      return false
    }
    if (util.isBlank(that.data.carsindex)) {
      util.showError("请选择购车要求")
      return false
    }
    if (util.isBlank(that.data.childsindex)) {
      util.showError("请选择有无子女要求")
      return false
    }
    if (util.isBlank(that.data.smokingindex)) {
      util.showError("请选择吸烟要求")
      return false
    }
    if (util.isBlank(that.data.drinkingindex)) {
      util.showError("请选择有无喝酒要求")
      return false
    }
    var data = {
      birthday: this.data.date,
      maritalStatus: this.data.marryindex,
      annualSalary: this.data.salaryindex,
      sex: this.data.sexindex,
      education: this.data.educationindex,
      unitNature: this.data.unitNatureindex,
      nationality: this.data.nationindex,
      provinceId: this.data.provinceId,
      cityId: this.data.cityId,
      districtId: this.data.districtId,
      liveplace: this.data.provinceId + ',' + this.data.cityId + ',' + this.data.districtId,
      familyRegister: this.data.familyRegister,
      height: this.data.heightindex,
      weight: this.data.weightindex,
      car: this.data.carsindex,
      smoking: this.data.smokingindex,
      house: this.data.housesindex,
      drinking: this.data.drinkingindex,
      childs: this.data.childsindex,

      bloodType: this.data.bloodTypesindex,
      zodiac: this.data.zodiacsindex,
      chinesezodiac: this.data.chinesezodiacsindex

    }

    util.request(api.updateBasicdata, data, function(data) {
      console.log(data)
      if (data.state == "ok") {
        util.showSuccess("保存成功", function() {
          wx.switchTab({
            url: "/pages/user/user"
          })
        })
      }
    })
  },
  onShow: function() {

  },

  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
