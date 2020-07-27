const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: '../images/img9.jpg',
    headimg : '',
    nickName: ''
    
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
    
    util.request(api.getBaseInfo, {}, function(data){
      if (data.state == "ok") {
        var nickName = t.data.nickName
        if(util.notBlank(data.nickName)) {
          nickName = data.nickName
        }
        var headimg = t.data.headimg
        var userimg = t.data.userimg
        if(util.notBlank(data.headimg)) {
          headimg = data.headimg
          userimg = util.imagePath(headimg)
        }
        
        t.setData({
          nickName: nickName,
          userimg: userimg,
          headimg: headimg,
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  nickNameChange: function(e) {
    this.setData({
      nickName: e.detail.value
    })
  },
  userImgClick: function() {
    var t = this
    wx.chooseImage({
  	  count:1,
      success:function(res){
        t.setData({
          userimg: res.tempFilePaths[0],
          headimg: res.tempFilePaths[0]
        })
      }
    })
  },
  submit: function() {
    var t = this
    if(util.isBlank(t.data.nickName)) {
      util.showError("请输入昵称")
      return false
    }
    if(util.isBlank(t.data.headimg)) {
      util.showError("请选择头像")
      return false
    }
    
    // 上传正面照片
    util.showLoading('头像上传中')
    util.uploadFile(t.data.userimg, function(filePath){
      t.setData({
        headimg: filePath
      })
      
      util.showLoading('数据保存中')
      var data = {
        nickName: t.data.nickName,
        headimg: t.data.headimg
      }
      util.request(api.saveBaseInfo, data, function(data){
        if(data.state == "ok") {
          util.showSuccess("数据保存成功")
        } else {
          util.showError("数据保存失败")
        }
      })
    })
  }
})