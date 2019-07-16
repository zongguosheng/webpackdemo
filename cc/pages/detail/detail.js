var e = "";

(function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
})(require("../../mp/framework")).default.Page({
    data: {
        url: ""
    },
    bindmessage: function(t) {
        e = t.detail.data[0].title;
    },
    onLoad: function(e) {
        console.log(e.url), this.setData({
            url: decodeURIComponent(e.url)
        });
    },
    onShareAppMessage: function(t) {
        return wx.reportAnalytics("detail_share", {
            share: "share"
        }), {
            title: e,
            path: "/pages/detail/detail?from=share&url=" + encodeURIComponent(t.webViewUrl)
        };
    }
});