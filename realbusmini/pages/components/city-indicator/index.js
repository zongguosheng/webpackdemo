Component({
  behaviors: [],
  properties: {
    city: {
      type: String,
      value: {
        name: "洛阳"
      }
    },
    selectable: {
      type: Boolean,
      value: !1
    }
  },
  data: {},
  attached: function () { },
  ready: function () { },
  methods: {
    onClickChangeCity: function () {
      this.data.selectable ? this.triggerEvent("onClick", {}, {}) : console.log("city.selectable = false");
    }
  }
});