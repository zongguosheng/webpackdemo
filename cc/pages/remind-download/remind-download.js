var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), t = require("../../service/analytic"), r = getApp();

e.default.Page({
    data: {},
    onLoad: function(e) {
        var t = "";
        switch (e._f_) {
          case "invite2App":
            t = "https://web.chelaile.net.cn/res_mp/redirect/redirect.html?id=6";
            break;

          case "rank2App":
            t = "https://web.chelaile.net.cn/res_mp/redirect/redirect.html?id=9";
            break;

          default:
            t = "https://web.chelaile.net.cn/res_mp/redirect/index.html";
        }
        this.setData({
            system: wx.getSystemInfoSync().system.indexOf("Android") > -1 ? "Android" : "IOS",
            url: t
        });
    },
    openContact: function() {
        t.trackClick({
            curPage: "remind_page",
            describ: "xiao_to_app",
            platform: this.data.system
        }, r);
    }
});