const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: 1,
    status: 0,
    realName: '',
    idCardNo: '',
    positivePic: '../images/img7.jpg',
    negativePic: '../images/img8.jpg',
    positiveIdCardPic: '',
    negativeIdCardPic: ''
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
    var t = this
    
    util.request(api.getRealName, {}, function(data){
      if (data.state == "ok" && data.info) {
        t.setData({
          status: data.info.status,
          realName: data.info.realName,
          idCardNo: data.info.idCardNo,
          positivePic: util.imagePath(data.info.positiveIdCardPic),
          negativePic: util.imagePath(data.info.negativeIdCardPic),
          positiveIdCardPic: data.info.positiveIdCardPic,
          negativeIdCardPic: data.info.negativeIdCardPic,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  realNameChange: function(e) {
    var value = e.detail.value
    this.setData({
      realName: value
    })
  },
  idCardNoChange: function(e) {
    var value = e.detail.value
    this.setData({
      idCardNo: value
    })
  },
  positiveClick: function() {
    var t = this
	  wx.chooseImage({
		  count:1,
      success:function(res){
        t.setData({
          positivePic: res.tempFilePaths[0]
        })
      }
	  })
  },
  negativeClick: function () {
    var t = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        t.setData({
          negativePic: res.tempFilePaths[0]
        })
      }
    })
  },
  submit: function() { 
    var t = this
    if(util.isBlank(t.data.realName)) {
      util.showError("请输入真实姓名")
      return false
    }
    if(util.isBlank(t.data.idCardNo)) {
      util.showError("请输入身份证号")
      return false
    }
    if(util.isBlank(t.data.positivePic) || t.data.positivePic == '../images/img7.jpg') {
      util.showError("请上传正面照片")
      return false
    }
    if(util.isBlank(t.data.negativePic) || t.data.negativePic == '../images/img8.jpg') {
      util.showError("请上传背面照片")
      return false
    }
    // 上传正面照片
    util.showLoading('图片上传中1/2')
    util.uploadFile(t.data.positivePic, function(filePath){
      t.setData({
        positiveIdCardPic: filePath
      })
      // 上传背面照片
      util.showLoading('图片上传中2/2')
      util.uploadFile(t.data.negativePic, function(filePath){
        t.setData({
          negativeIdCardPic: filePath
        })
        
         // 提交保存数据
        if(util.isBlank(t.data.positiveIdCardPic)) {
          util.showError("请上传正面照片")
          return false
        }
        if(util.isBlank(t.data.negativeIdCardPic)) {
          util.showError("请上传正面照片")
          return false
        }
        util.showLoading('数据保存中')
        var data = {
          positiveIdCardPic: t.data.positiveIdCardPic,
          negativeIdCardPic: t.data.negativeIdCardPic,
          idCardNo: t.data.idCardNo,
          realName: t.data.realName
        }
        util.request(api.saveRealName, data, function(data){
          if(data.state == "ok") {
            util.showSuccess("数据保存成功")
            t.setData({
              status: data.info.status
            })
          } else {
            util.showError("数据保存失败")
          }
        })
      })
    })
    
  },
  
})