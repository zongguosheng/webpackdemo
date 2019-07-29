Component({
  behaviors: [],
  properties: {
    content: {
      type: String,
      value: ""
    }
  },
  data: {},
  attached: function () { },
  ready: function () { },
  methods: {
    onClickContent: function () {
      this.triggerEvent("onClickContent", {}, {});
    },
    onClickClose: function () {
      this.triggerEvent("onClickClose", {}, {});
    }
  }
});
