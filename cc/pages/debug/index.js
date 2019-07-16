(function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
})(require("../../mp/framework")).default.Page({
    data: {},
    onLoad: function(e) {},
    openDebug: function(e) {
        wx.setEnableDebug({
            enableDebug: !0
        });
    },
    closeDebug: function(e) {
        wx.setEnableDebug({
            enableDebug: !1
        });
    }
});