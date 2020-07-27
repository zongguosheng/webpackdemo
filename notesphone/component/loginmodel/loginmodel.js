const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var user = require('../../utils/user.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask() {
      
    },
    getUserInfo(e) {
      var t = this;
      t.setData({
        loading: true
      })
      var encryptedData = e.detail.encryptedData
      var ivStr = e.detail.iv
      // encryptedData = encodeURIComponent(encryptedData)
      // ivStr = encodeURIComponent(ivStr)
      user.request(api.saveUserInfo, {
        encryptedData: encryptedData,
        ivStr: ivStr,
        token: app.globalData.token
      }, function(data){
        util.showError('授权登录完成，请重新操作')
        app.globalData.haveUserInfo = true
        t.setData({
          loading: false,
          show: false
        })
      })
    }
  }
})
