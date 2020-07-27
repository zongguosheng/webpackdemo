const api = require('./api.js')

function isBlank(str) {
  return str == null || str === ""
}

function notBlank(str) {
  return !isBlank(str)
}

function isNull(obj) {
  return obj == null
}

function notNull(obj) {
  return !isNull(obj)
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500,
    mask: false
  })
}

function showError(msg, callback) {
  var duration = 1500
  wx.showToast({
    title: msg,
    image: '/pages/images/error.png',
    duration: duration,
    mask: false,
    success: function () {
      if (callback) {
        setTimeout(callback, duration)
      }
    }
  })
}

function showSuccess(msg, callback) {
  var duration = 1500
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: duration,
    mask: false,
    success: function () {
      if (callback) {
        setTimeout(callback, duration)
      }
    }
  })
}

function showLoading(msg) {
  wx.showLoading({
    title: msg,
    mask: true,
    duration: 1500,
    mask: false
  })
}

function hideLoading() {
  wx.hideLoading()
}

function imagePath(path) {
  return api.file + path
}

function getToken() {
  var token = wx.getStorageSync("token")
  return token
}

function request(url, data = {}, callback, encrypt = false) {
  var token = getToken()
  console.log("request:" + url)
  console.log("token:" + token)
  wx.request({
    url: url,
    data: data,
    header: {
      token: token
    },
    dataType: 'text',
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data
        data = JSON.parse(data)
        if (data) {
          if (data.code == 0) {
            callback(data)
          } else if (data.code == 1004) {
            showError('登录失败')
          } else {
            callback(data)
          }
        } else {
          showError('参数解析异常')
        }
      } else {
        showError(res.errMsg)
      }
    },
    fail: function (err) {
      showError('请重试')
    }
  })
}

function uploadFile(filePath, callback) {
  var token = getToken()
  console.log("uploadFile:" + filePath)
  console.log("token:" + token)
  wx.uploadFile({
    url: api.upload,
    filePath: filePath,
    name: 'file',
    header: {
      token: token
    },
    success(res) {
      var data = res.data
      data = JSON.parse(data)
      if (data.state == "ok") {
        callback(data.filePath)
      } else {
        hideLoading()
        showError("图片上传失败")
      }
    },
    fail(err) {
      hideLoading()
      showError("图片上传失败")
    }
  })
}

function age(birthday) {
  var birDate = new Date(birthday)
  if (birDate == null) {
    return 0
  }
  var birYear = birDate.getFullYear()
  var birMonth = birDate.getMonth + 1
  var birDay = birDate.getDate()

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1 //记得加1
  var nowDay = d.getDate()
  var returnAge = 0

  if (nowYear == birYear) {
    returnAge = 0 // 
  } else {
    var ageDiff = nowYear - birYear // 
    if (ageDiff > 0) {
      if (nowMonth == birMonth) {
        var dayDiff = nowDay - birDay // 
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birMonth // 
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      return -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge
}

module.exports = {
  isBlank,
  notBlank,
  isNull,
  notNull,
  showToast,
  showError,
  showSuccess,
  showLoading,
  hideLoading,
  imagePath,
  request,
  uploadFile,
  age
}