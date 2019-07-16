(function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
})(require("../../mp/framework")).default.Page({
    data: {
        mSrc: "https://web.chelaile.net.cn/increase/dl_mp/?ctm_source=app_wx_mp",
        mTitle: ""
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "车来了"
        });
    }
});