var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), t = require("../../service/user"), i = require("../../service/analytic"), n = getApp(), a = [ "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_06.png", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_01_drop.png", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_04_cityserve.gif", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_05_gongzhonghao.gif" ], c = [ "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_06_android.png", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_01_drop_android.png", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_04_cityserve.gif", "https://cdn.www.chelaile.net.cn/web_active/wmp/newimages/img_05_gongzhonghao.gif" ];

e.default.Page({
    data: {
        imgUrls: a,
        activeIndex: 0,
        isLastStep: !1
    },
    onShow: function() {
        this._setupSys(), this._checkCurrent(this.data.activeIndex), wx.setNavigationBarTitle({
            title: "如何快速打开车来了"
        }), i.track("WECHAT_MP_CLICK", {
            curPage: "intro_0",
            describ: "N_step"
        }, n), t.get().finally(function() {
            i.login(t.userId, n);
        });
    },
    _setupSys: function() {
        wx.getSystemInfoSync().system.indexOf("Android") > -1 && this.setData({
            imgUrls: c
        });
    },
    _checkCurrent: function(e) {
        var t = e === this.data.imgUrls.length - 1;
        this.setData({
            isLastStep: t,
            activeIndex: e
        });
    },
    tapToNext: function() {
        var e = this.data.activeIndex;
        e < this.data.imgUrls.length && e++, this._checkCurrent(e), i.track("WECHAT_MP_CLICK", {
            curPage: "intro_" + e,
            describ: "N_step"
        }, n);
    },
    onItemChanged: function(e) {
        var t = e.detail.current;
        this._checkCurrent(t);
    }
});