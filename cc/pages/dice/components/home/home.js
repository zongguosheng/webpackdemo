var e = require("../../../../service/user");

Component({
    properties: {},
    data: {},
    methods: {
        start: function(t) {
            var r = this;
            "getUserInfo:ok" === t.detail.errMsg && (wx.showLoading(), e.bindGetUserInfo(t).then(function() {
                wx.hideLoading(), r.triggerEvent("start");
            }));
        }
    }
});