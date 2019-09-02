Page({
  data: {
    icon:
     [
      'icon_add', 'icon_addmessage',  "icon_addresslist", "icon_affiliations_li", "icon_addperson",
       "icon_boss", "icon_alipay_line", "icon_addressbook", "icon_at","icon_addperson",
        "icon_boss", "icon_alipay_line", "icon_addressbook", "icon_at", "icon_airplay", "icon_calendar","icon_attestation",
        "icon_camera", "icon_certificate_fil", "icon_coinpurse_line", "icon_collect", "icon_compile","icon_details",
        "icon_circle_line", "icon_cloud_history", "icon_community_line", "icon_discovery", "icon_delete","icon_dispose",
        "icon_doc", "icon_cspace", "icon_exchange", "icon_ding", "icon_down", "icon_dingtalk_line","icon_gift",
        "icon_glass", "icon_file", "icon_GPS", "icon_hardware_fill", "icon_HRM", "icon_im_more","icon_Eapp_line",
        "icon_group", "icon_horn", "icon_im_face", "icon_homepage","icon_invite",  "icon_launch_page"  ,
        "icon_likegood", "icon_index_line", "icon_live", "icon_link", "icon_im_voice",
        "icon_mobilephone", "icon_dmail", "icon_message", "icon_new_recruit", "icon_more", "icon_next_arrow", "icon_notice",
        "icon_nomemo", "icon_newgroup", "icon_namecard", "icon_phone", "icon_qq", "icon_photo", "icon_redpacket", "icon_patriarch",
        "icon_roundclose", "icon_im_keyboard", "icon_roundreduce", "icon_railway", "icon_QRcode", "icon_savememo", "icon_roundadd",
        "icon_refresh", "icon_search", "icon_scan", "icon_send", "icon_principal", "icon_service", "icon_scan_namecard", 
        "icon_secret", "icon_share", "icon_signin_line", "icon_sms", "icon_sketch", "icon_setting", "icon_signal", "icon_skin", 
        "icon_star",  "icon_subordinate", "icon_task", "icon_statistics", "icon_threeline_fill", "icon_study", "icon_voice", 
        "icon_square", "icon_wechat",  "icon_sport", "icon_work", "icon_warn", "icon_workmore", "icon_safety", 
        "icon_workset", "icon_voipphone","icon_shield", "icon_shakehands", "icon_video", "icon_task_done", "icon_meeting", 
        "icon_synergy", "icon_workfile_line", "icon_approval_fill",  "icon_addresslist_fil",
        "icon_cmail", "icon_collect_fill", "icon_boss_fill", "icon_addressbook_fil", "icon_bizcall_fill", "icon_calendar_fill",
        "icon_cspace_fill", "icon_delete_fill", "icon_doc_fill", "icon_camera_fill", "icon_copyto", "icon_dingtalk", "icon_Eapp",
        "icon_ding_ding_fill", "icon_file_fill", "icon_dmail_fill", "icon_conf_video_fill", "icon_gather_fill", "icon_Inbox", 
        "icon_coinpurse", "icon_certification_f", "icon_exchange_fill", "icon_inform_fill", "icon_discovery_fill", 
        "icon_likegood_fill", "icon_gps_fill", "icon_dingtab", "icon_invite_fill", "icon_launch_page_fil", 
        "icon_homepage_fill", "icon_gift_fill", "icon_journal_fill","icon_memo", "icon_live_fill", "icon_message_fill", 
        "icon_meeting_fill", "icon_newapplication", "icon_people_fill", "icon_photo_fill", "icon_new_recruit_fil", 
        "icon_phone_fill", "icon_ping", "icon_qq_fill", "icon_report_fill", "icon_roundreduce_fil",   "icon_namecard_fill",
        "icon_safety_fill", "icon_redpacket_fill", "icon_replieslist", "icon_roundadd_fill", "icon_service_fill", 
        "icon_newgroup_fill",  "icon_study_fill", "icon_star_fill", "icon_signal_fill", "icon_task_checkbox_d", 
        "icon_setting_fill", "icon_signin",
        "icon_skin_fill", "icon_shakehands_fill", "icon_sketch_fill", "icon_work_fill", "icon_statistics_fill", "icon_video_fill",
        "icon_trashcan", "icon_synergy_fill", "icon_warn_fill", "icon_roundclose_fill", "icon_left", "icon_right"

    ] 

  },
  onLoad: function() {


  },

  //自定义提示框
  alertView: function (text) {
    wx.showToast({
      title: text,
      icon: 'none'
    })

  },
  //保存图片到系统相册
  btnClick1: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: "images/baoxing.jpg",
      success(res) {
        that.alertView('保存成功')
      }
    })
  },
  //在新页面中全屏预览图片,可多张图片
  btnClick2: function () {
    wx.previewImage({
      // 需要预览的图片http链接列表
      urls: ['https://img2.woyaogexing.com/2018/12/31/645fc061ebfe8fa0!600x600.jpg', 'https://img2.woyaogexing.com/2018/12/31/972fe23faa9a3105!600x600.jpg', 'https://img2.woyaogexing.com/2018/12/31/c303577c48b1c397!600x600.jpg'],
      // 当前显示图片的http链接
      current: 'https://img2.woyaogexing.com/2018/12/31/645fc061ebfe8fa0!600x600.jpg',
    })
  },
  //获取图片信息。
  btnClick3: function () {
    var that = this
    wx.getImageInfo({
      src: "../../images/baoxing.jpg",
      success(res) {
        that.alertView('图片信息' + res.width + '--' + res.height + '--' + res.path + '--' + res.orientation + '--' + res.type)
        console.log(res.width)
        console.log(res.height)
        console.log(res.path)        //图片的本地路径
        console.log(res.orientation) //拍照时设备方向
        console.log(res.type)        //图片格式
      }
    })
  },
  //压缩图片(暂时不好用，官方未回应)
  btnClick4: function () {
    console.log('55')
    var that = this
    wx.compressImage({
      src: "../../images/baoxing.jpg", // 图片路径
      quality: 50,// 压缩质量范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。
      success(res) {
        that.alertView('压缩成功')
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            that.alertView('保存成功')
          }
        })
      },
      fail() {
        that.alertView('压缩失败')
      }
    })
  },
  //从客户端会话选择文件。
  btnClick5: function () {
    var that = this
    wx.chooseMessageFile({
      count: 10,
      type: 'image',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  //从本地相册选择图片或使用相机拍照。
  btnClick6: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          src: tempFilePaths
        })
      }
    })
  }

})
