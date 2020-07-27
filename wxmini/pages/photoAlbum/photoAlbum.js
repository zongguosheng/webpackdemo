const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    files: []
  },
  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  onReady() {
    var t = this
    util.request(api.getUserPhotoAlbumsPath, {}, function(ret){
      if(ret.state == "ok") {
        var urls = ret.urls
        var files = []
        for (let index = 0; index < urls.length; index++) {
          const info = urls[index];
          files.push({
            url: api.file + info
          })
        }

        t.setData({
          files: files
        })
      }
    })
  },
  selectFile(files) {
    // console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    var t = this
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths;
      //上传返回值
      var app = getApp();
      var that = this;
      that.setData({
        urlArr: [], //这用来存放上传多张时的路径数组
      });
      var object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        const upload_task = wx.uploadFile({
          url: api.upload, 
          filePath: files.tempFilePaths[i], //上传的文件本地地址    
          name: 'file',
          
          success: function (res) {
            var data = JSON.parse(res.data)
            if (data.state == "ok") {
              var url = data.filePath
              that.setData({
                urlArr: that.data.urlArr.concat(api.file + url), //拼接多个路径到数组中
              });
              object['urls'] = that.data.urlArr;
              
              if (that.data.urlArr.length == tempFilePaths.length) {
                resolve(object) //这就是判断是不是最后一张已经上传了，用来返回，
              }
            } else {
              reject(res)
            }
          },
          fail: function (err) {
            console.log(err)
            reject(err)
          }
        })
      }
    })
  },
  deleteFile(e) {
    var item = e.detail.item
    
    var url = item.url;
    url = url.replace(api.file ,"")
    util.request(api.deleteUserPhotoAlbums, {
      photoPath: url
    }, function(ret){
      //
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    // 上传成功后保存图片路径到数据库
    var urls = e.detail.urls
    for (let index = 0; index < urls.length; index++) {
      const info = urls[index];
      urls[index] = info.replace(api.file ,"")
    }

    util.request(api.saveUserPhotoAlbumsPath, {
      urls: urls
    })
  }
});