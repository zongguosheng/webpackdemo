var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../application/router/index")), t = require("../../../service/analytic");

Component({
    behaviors: [],
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        showOtherCity: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        iOS: !0
    },
    attached: function() {
        var e = wx.getSystemInfoSync().platform.toLowerCase();
        this.setData({
            _platform: e,
            iOS: "ios" === e
        });
    },
    ready: function() {},
    methods: {
        onClickDownload: function() {
            t.trackClick({
                curPage: "service_stop_page",
                describ: "app_wx_mp",
                platform: this.data._platform
            }, getApp()), this.data.iOS || e.default.push({
                name: "increase-download"
            });
        },
        onClickOther: function() {
            e.default.push({
                name: "switch-city"
            });
        }
    }
});