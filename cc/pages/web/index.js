function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../mp/framework")), r = require("../../service/redirector.const"), a = e(require("../../service/redirector.util"));

t.default.Page({
    data: {
        mSrc: "",
        mTitle: ""
    },
    onLoad: function(e) {
        var t = e.payload;
        if (t) {
            var r = decodeURIComponent(t);
            r = JSON.parse(r), this.setData({
                mSrc: r.src,
                mTitle: r.title || ""
            }), wx.setNavigationBarTitle({
                title: r.title || ""
            });
        }
    },
    onShareAppMessage: function() {
        var e = a.default.getSharePath(r.FROM.SHARE, r.TO.WEB, {
            web_src: encodeURIComponent(this.data.mSrc),
            web_title: this.data.mTitle
        });
        return {
            title: this.data.mTitle || "快用这个，别再苦等公交了",
            path: e
        };
    }
});