Component({
  properties: {
    tags: {
      type: Array,
      value: []
    },
    activeTag: {
      type: Object,
      value: {}
    }
  },
  data: {},
  attached: function () { },
  methods: {
    onClickTag: function (t) {
      var a = t.currentTarget.dataset.tag;
      this.triggerEvent("onClickTag", {
        tag: a
      }, {});
    }
  }
});
