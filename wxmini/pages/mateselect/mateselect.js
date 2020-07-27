// pages/basicdata/basicdata.js
var commonCityData = require('../../utils/areaList.js');
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')

//获取应用实例
const app = getApp()
Page({
  data: {
    otherShow: 'isShow',
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
    startAge:"",
    endAge:"",
    marry: common.marrys,
    marryindex: "",
    salary: common.salarys,
    startSalary:"",
    endSalary:"",
    sex: ['女', '男'],
    sexindex: "",
    ages:common.ages,
    agesindex:"",
    education: ['高中', '本科', '研究生', '博士'],
    nation: ['汉族', '回族', '维吾尔族', '藏族'],
    heights:"",
    height:common.height,
    heightTs: common.heightTs,
    heightTsindex: "",
    startHeights:"",
    endHeights:"",
    startWeight:"",
    endWeight:"",
    weightindex:"",
    weight: ['40kg-50kg', '50kg-60kg', '60kg-70kg', '70kg以上'],
    region: ['', '', ''],
    houses: common.houses,
    housesindex:'',
    carsindex:"",
    cars: common.cars,
    childsindex:'',
    smokingindex:"",
    smokings: common.smokings,
    drinkingindex:"",
    drinkings: common.drinkings,
    photoindex:"",
    photos: common.photos,
    childs: common.childs,
    appearances: common.appearances,
    appearancesindex:"",
    remark:'',
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

    util.request(api.getMaleSelect, null, function(data) {

      wx.hideLoading();
      console.log(data);
      if (data.state == "ok") {
        console.log(data.data.spousestandard);
        var spousestandard = data.data.spousestandard;
       
        
        that.setData({
      //    selProvince: provinceStr,      
     //     cityId: data.data.blindUser.cityId,
     //     districtId: data.data.blindUser.districtId,

//selCity: data.data.cityStr,
        //  selDistrict: data.data.areaStr,
        //  sexindex: data.data.blindUser.sex,
        //  date: birthdayDate,
          agesindex:spousestandard.age,
          marryindex: spousestandard.marry,
          salaryindex: spousestandard.salary,
          educationindex: spousestandard.education,
          housesindex: spousestandard.house,
          carsindex: spousestandard.car,
          childsindex: spousestandard.childs,
         // nationindex: data.data.blindUser.nationality,
          heightTsindex: spousestandard.heights,
          weightindex: spousestandard.weight,
          smokingindex: spousestandard.smoking,
          drinkingindex: spousestandard.drinking,
          photoindex: spousestandard.photo,
          remark:spousestandard.remark
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
  other: function (e) {
   
    console.log(this.data.otherShow)
    var show = this.data.otherShow
    if (show == 'isShow'){
      this.setData({
        otherShow: 'hider'
      })
    }else{
      this.setData({
        otherShow: 'isShow'
      })
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
  bindAgesChange: function (e) {
    console.log('picker发送选择改变，agesindex携带值为', e.detail.value)
    console.log(this.data.ages[e.detail.value]);
    var ageStr = this.data.ages[e.detail.value];
    var startAgeT = ageStr.substring(0, ageStr.indexOf("-"));
    var endAgeT = ageStr.substring(ageStr.lastIndexOf("-") + 1, ageStr.length);
    this.setData({
      agesindex: e.detail.value,
      startAge: startAgeT,
      endAge:endAgeT
    })
    console.log("nin===" + endAgeT);
    console.log(this.data.agesindex)
  },
  bindsalaryChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var salarysStr = this.data.salary[e.detail.value];
    
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
    console.log(this.data.heightTs[e.detail.value]);
    var heightStr = this.data.heightTs[e.detail.value];
    var startHeightT = heightStr.substring(0, heightStr.indexOf("-"));
    var endHeightT = heightStr.substring(heightStr.lastIndexOf("-") + 1, heightStr.length);
    this.setData({
      heightTsindex: e.detail.value,
      startHeights: startHeightT,
      endHeights: endHeightT
    })
  },
  bindweightChange: function(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.weight[e.detail.value]);
    var weightStr = this.data.weight[e.detail.value];
    var startHeightT = weightStr.substring(0, weightStr.indexOf("-"));
    var endHeightT = weightStr.substring(weightStr.lastIndexOf("-") + 1, weightStr.length);
    this.setData({
      weightindex: e.detail.value,
      startWeight: startHeightT,
      endWeight: endHeightT
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
  bindchildsChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      childsindex: e.detail.value
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
  bindPhotoChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      photoindex: e.detail.value
    })
  },
  remarkChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
 
  save: function() {
    console.log(this.data)
   
    var that= this;
    if (util.isBlank(that.data.agesindex)) {
      util.showError("请选择年龄要求")
      return false
    }
    if (util.isBlank(that.data.marryindex)) {
      util.showError("请选择婚事要求")
      return false
    }
    if (util.isBlank(that.data.heightTsindex)) {
      util.showError("请选择身高要求")
      return false
    }
    if (util.isBlank(that.data.weightindex)) {
      util.showError("请选择体重要求")
      return false
    }
    if (util.isBlank(that.data.salaryindex)) {
      util.showError("请选择年收入要求")
      return false
    }
    if (util.isBlank(that.data.educationindex)) {
      util.showError("请选择学历要求")
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
    if (util.isBlank(that.data.photoindex)) {
      util.showError("请选择有无照片要求")
      return false
    }
    
    var data = {
      age: this.data.agesindex,
      startAge: this.data.startAge,
      endAge:this.data.endAge,
      marry: this.data.marryindex,
      salary: this.data.salaryindex,
     // startSalary:this.data.startSalary,
    //  endSalary:this.data.endSalary,
      sex: this.data.sexindex,
      education: this.data.educationindex,
   //   nationality: this.data.nationindex,
   //   provinceId: this.data.provinceId,
   //   cityId: this.data.cityId,
   //   districtId: this.data.districtId,
   //   liveplace: this.data.provinceId + ',' + this.data.cityId + ',' + this.data.districtId,
   //   familyRegister: this.data.familyRegister,
      heights: this.data.heightTsindex,
      weight: this.data.weightindex,
      house: this.data.housesindex,
    //  career: ,
      car: this.data.carsindex,
      smoking: this.data.smokingindex,
   //   belief: ,
      drinking: this.data.drinkingindex,
    //  unitNature: ,
      photo:this.data.photoindex,
      childs: this.data.childsindex ,
      remark: this.data.remark
    //  startHeights:this.data.startHeights,
    //  endHeights: this.data.endWeight,
    //  startWeight:this.data.startWeight,
    //  endWeight: this.data.endWeight,
 
    }

    util.request(api.saveMaleSelect, data, function(data) {
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
