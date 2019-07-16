Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../pages/web/router"));

exports.default = {
    isWeb: function() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").startsWith("http");
    },
    _isJingdongWeb: function(e) {
        return e.indexOf(".jd.com") > -1;
    },
    getModuleIndex: function() {
        return "/pages/specialtopics/kanjia/pages/index/index";
    },
    toModuleIndex: function(e) {
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/index/index?hdId=" + e
        });
    },
    backToModuleIndex: function() {
        var e = getCurrentPages(), a = e.find(function(e) {
            return e.route.match("kanjia/pages/index/index");
        });
        if (a) {
            var o = e.lastIndexOf(a);
            wx.navigateBack({
                delta: e.length - o - 1
            });
        } else wx.navigateBack({
            delta: 100
        });
    },
    toHome: function() {
        wx.navigateTo({
            url: "/pages/main/main"
        });
    },
    toMine: function(e) {
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/mine/index?hdId=" + e
        });
    },
    toShare: function(e, a, o) {
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/share/index?hdId=" + e + "&goodsId=" + a + "&userId=" + o
        });
    },
    toPrize: function(e, a, o) {
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/goodsdetail/goodsdetail?hdId=" + e + "&goodsId=" + a + "&bargainStartTime=" + (o || "")
        });
    },
    redirectPrize: function(e, a) {
        wx.redirectTo({
            url: "/pages/specialtopics/kanjia/pages/goodsdetail/goodsdetail?hdId=" + e + "&goodsId=" + a
        });
    },
    toConsolationPrize: function(e, a) {
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/goodsdetail/goodsdetail?hdId=" + e + "&goodsId=" + a + "&_type=b"
        });
    },
    toProgress: function(e, a, o) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
        wx.navigateTo({
            url: "/pages/specialtopics/kanjia/pages/live/live?fUserId=" + o + "&hdId=" + e + "&goodsId=" + a + "&groupId=" + i + "&shareId=" + n
        });
    },
    toFail: function(e, a, o, i, n) {
        var t = encodeURIComponent(i);
        wx.redirectTo({
            url: "/pages/specialtopics/kanjia/pages/fail/fail?goodsId=" + a + "&hdId=" + e + "&appId=" + o + "&reason=" + n + "&path=" + t
        });
    },
    toPath: function(a) {
        var o = a.path, i = decodeURIComponent(o);
        this.isWeb(i) ? a.forceWeb || !this._isJingdongWeb(i) ? e.default.open(o) : console.log("return jd") : a.appId ? wx.navigateToMiniProgram({
            appId: a.appId,
            path: o
        }) : console.error("toPath: unknown options", a);
    }
};