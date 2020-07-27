// pages/qzinfo/qzinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: false,
    isShow: false,//控制emoji表情是否显示
    isLoad: false,//解决初试加载时emoji动画执行一次
    currentData:0,
    modalshow: true,
    msg:[
      { username: 'zongbojue',  aftertime: '10分钟',img:'111', show: false , text:'So guys, let me know what is your opinion about this mini program',liked:[ 'zhangsna', 'zongbojue','lisi','wangwu','maliu'] },
      { username: 'zongbojue',  aftertime: '10分钟',img:'img1',show: false , text:'外交部发言人华春莹7月13日宣布，中方决定自即日起对美国“国会－行政部门中国委员会”以及美国国务院国际宗教自由无任所大使布朗巴克、联邦参议员卢比奥、克鲁兹，联邦众议员史密斯实施相应制裁' }
    ],
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
    alipayEmoji: [],//支付宝表情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var em = {}, that = this, emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
        that.setData({
        emojis: emojis
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkCurrent:function(e){
    console.log(e)
    this.setData({ currentData : e.target.dataset.current})
    console.log()
  },
  clicklike: function(e){
    const that  = this;
    const _index  = e.currentTarget.dataset.index;
    let _msg = [...that.data.msg]; // msg的引用

    console.log(e)
    console.log(_msg)

    console.log(e.target.dataset.index)
    console.log(_msg[_index].show)
    console.log(!that.data.msg[_index]['show'])
    _msg[_index]['show'] = !that.data.msg[_index]['show']
    console.log(_msg)
    that.setData({
      msg: _msg
    })
    
  },
  reply:function(e){
    console.log(e)
    const that  = this;
   const _modalshow = that.data.modalshow

   console.log(_modalshow)
   that.data.modalshow = !_modalshow
   that.setData({
    modalshow:  that.data.modalshow
  })
  },
  emojiScroll: function (e) {
    console.log(e)
  },
  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })

  },
  onPageScroll:function (e){
    console.log(e)
    if(e.scrollTop > 60){

      this.setData({
        scrollTop:true
      })
    }else{
      this.setData({
        scrollTop:false
      })
    }

  },
  //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      // isShow: false,
      cfBg: false
    })
  },
  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    console.log(this.data.isShow + '-----this.data.isShow')
    console.log(this.data.isLoad + '-----this.data.isLoad')
    this.setData({
      isShow: !this.data.isShow,
      isLoad: !this.data.isLoad
      // cfBg: !this.data.false
    })
  },
   //表情选择
   emojiChoose: function (e) {
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content + e.currentTarget.dataset.emoji
    })
  },
  //发送评论评论 事件处理
  send: function () {
    var that = this, conArr = [];
    //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
    setTimeout(function () {
      console.log(that.data.content)
    }, 100)
  },
  search:function(){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})