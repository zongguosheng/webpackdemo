var formatTime = {
  gettime: function () {
    var getdate = new Date()
    var month = getdate.getMonth() + 1
    var day = getdate.getDate()
    var h = getdate.getHours()
    var m = getdate.getMinutes()
    var s = getdate.getSeconds()
    var year = getdate.getFullYear()
    var date = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
    return date
  }
}

export {
  formatTime
}
