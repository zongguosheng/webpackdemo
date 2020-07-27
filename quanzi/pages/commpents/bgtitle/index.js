// pages/commpents/bgtitle/index.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollTop: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight:App.globalData.navHeight,
    navTop:App.globalData.navTop
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
