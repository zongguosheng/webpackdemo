const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    characters: [
      { id: 1, value: '其他' },
      { id: 2, value: '温柔善良' },
      { id: 3, value: '外向' },
      { id: 4, value: '内向' },
      { id: 5, value: '活泼开朗' },
      { id: 6, value: '沉默寡言' },
      { id: 7, value: '勇敢' },
      { id: 8, value: '幽默' },
      { id: 9, value: '稳重' },
      { id: 10, value: '成熟' },
      { id: 11, value: '独立' },
      { id: 12, value: '豪爽' },
      { id: 13, value: '敏感' },
      { id: 14, value: '耿直' },
      { id: 15, value: '果断' },
      { id: 16, value: '坚强' }
    ],
    hobbys: [
      { id: 1, value: '旅游' },
      { id: 2, value: '体育' },
      { id: 3, value: '美食' },
      { id: 4, value: '逛街' },
      { id: 5, value: '游戏' },
      { id: 6, value: '电脑' },
      { id: 7, value: '书画' },
      { id: 8, value: '乐器' },
      { id: 9, value: '厨艺' },
      { id: 10, value: '手工' },
      { id: 11, value: '漫画' },
      { id: 12, value: '健身' },
      { id: 13, value: '唱歌' },
      { id: 14, value: '跳舞' },
      { id: 15, value: '读书' },
      { id: 16, value: '电影' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
   
  },
  characterChecked: function (e) {
    console.log(e)
    var clickId = e.currentTarget.dataset.id
    var items = this.data.characters
    for(var i=0; i<items.length; i++) {
      if (items[i].id == clickId) {
        items[i].checked = !items[i].checked
      }
    }
    this.setData({
      characters: items
    })
  },
  hobbyChecked: function (e) {
    var clickId = e.currentTarget.dataset.id
    var items = this.data.hobbys
    for(var i=0; i<items.length; i++) {
      if (items[i].id == clickId) {
        items[i].checked = !items[i].checked
      }
    }
    this.setData({
      hobbys: items
    })
  },
  onShow: function () {
    var t = this
    util.request(api.getSelectCharacterHobbyList, {}, function(ret){
      
      if(ret.state == "ok") {
        var list = ret.list
        if(list) {
          var characters = t.data.characters
          var hobbys = t.data.hobbys
          list.forEach(info => {
            if(info.type == 1) {
              // 性格
              t.setSelect(characters, info.typeId)
            } else if(info.type == 2) {
              // 爱好
              t.setSelect(hobbys, info.typeId)
            }
          });
          t.setData({
            characters: characters,
            hobbys: hobbys
          })
        }
      }
    })
  },

  save: function() {
    var t = this
    
    var characterList = t.getSelectList(t.data.characters)
    if(characterList.length == 0) {
      util.showToast('请至少选择一个性格标签')
      return;
    }
    var hobbyList = t.getSelectList(t.data.hobbys)
    if(hobbyList.length == 0) {
      util.showToast('请至少选择一个爱好标签')
      return;
    }
    util.request(api.saveCharacterHobby, {
      characterList: characterList,
      hobbyList: hobbyList
    }, function(ret){
      if(ret.state == "ok") {
        util.showSuccess('保存成功')
      } else {
        util.showError('保存失败')
      }
    })

  },
  getSelectList: function(items) {
    var list = []

    items.forEach(item => {
      if(item.checked) {
        list.push({
          typeId: item.id,
          typeName: item.value
        })
      }
    });

    return list
  },
  setSelect: function(items, infoId) {
    items.forEach(item => {
      if(item.id == infoId) {
        item.checked = true
      }
    });
  }
})