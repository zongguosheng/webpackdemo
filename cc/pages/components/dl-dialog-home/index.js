var e = require("../../../service/analytic");

Component({
    behaviors: [],
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        header: {
            type: Boolean,
            value: !1
        },
        body: {
            type: Boolean,
            value: !1
        },
        footer: {
            type: Boolean,
            value: !1
        },
        actions: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isApple: !1
    },
    attached: function() {
        this.setData({
            isApple: "ios" === wx.getSystemInfoSync().platform.toLowerCase()
        });
    },
    ready: function() {},
    methods: {
        onClickClose: function() {
            this.triggerEvent("onClickClose", {}, {}), e.trackClick({
                curPage: "home_page",
                describ: "app_wx_mp_close",
                platform: wx.getSystemInfoSync().platform.toLowerCase()
            }, getApp());
        },
        onClickDownload: function() {
            this.triggerEvent("onClickDownload", {
                isApple: this.data.isApple
            }, {}), e.trackClick({
                curPage: "home_page",
                describ: "app_wx_mp",
                platform: wx.getSystemInfoSync().platform.toLowerCase()
            }, getApp());
        }
    }
});