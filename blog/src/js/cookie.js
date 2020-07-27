var cookie = {
  user: '',
  pwd: '',
  // 添加cookie
  addCookie: function (name, value, exdays, path) {
    var d = new Date()
    d.setTime(d.getTime() + exdays + 24 * 60 * 60 * 1000)
    var expires = (typeof exdays) === 'string' ? '' : ';d=' + d.toUTCString()
    // path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
    path = path == '' ? '' : ';path=' + path
    document.cookie = name + '=' + value + expires + path
  },

  //  获取cookie
  getCookie: function (name) {
    // eslint-disable-next-line no-redeclare
    var name = escape(name)
    var allcookie = document.cookie
    name += '='
    var pos = allcookie.indexOf(name)
    if (pos != -1) {
      var start = pos + name.length
      var end = allcookie.indexOf(';', start)
      if (end == -1) {
        end = allcookie.length;
      }
      var value = allcookie.substring(start, end)
    }
    return value
  },
  deleteCookie: function (name, path) { /** 根据cookie的键，删除cookie，其实就是设置其失效**/
    // eslint-disable-next-line no-redeclare
    var name = escape(name)
    var expires = new Date(0)
    path = path == '' ? '' : ';path=' + path
    document.cookie = name + '=' + ';expires=' + expires.toUTCString() + path
  },
  setInfo: function () {
    var userNameValue = this.getCookie('userName')
    var userPassValue = this.getCookie('userPass')
    return {
      name: userNameValue,
      mypwd: userPassValue
    }
  }
}

export {
  cookie
}
