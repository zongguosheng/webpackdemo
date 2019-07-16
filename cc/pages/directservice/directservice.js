(function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
})(require("../../mp/framework")).default.Page({
    data: {},
    onLoad: function(e) {
        wx.redirectTo({
            url: "/pages/main/main?templateActive=transfer"
        });
    }
});