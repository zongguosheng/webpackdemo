function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return "function" == typeof o ? Object.assign({}, d, o() || {}) : Object.assign({}, d, o || {});
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, n = e(require("./ad.api")), i = e(require("./ad.navigator")), a = e(require("../service/realtimelog")), u = e(require("../mp/sys")).default.getSystemInfoSync(), d = {
    mpv: u.SDKVersion,
    platform: u.system
}, o = void 0;

exports.default = {
    init: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        o = e;
    },
    navigate: function(e) {
        return wx.reportAnalytics("main_top_ad_click", {
            adv_id: e.wxMiniProId
        }), a.default.logs("<ADV_CLICK>", {
            adv_id: e.id,
            adv_type: e.showType
        }), i.default.navigate({
            title: e.title,
            targetType: e.targetType,
            pluginId: e.pluginId,
            linkUrl: e.link,
            appId: e.wxMiniProId,
            path: e.wxMiniProPath || ""
        });
    },
    getGridAds: function() {
        var e = t();
        return n.default.getGridAds(e);
    },
    getBanner: function(e) {
        var i = t();
        return n.default.getBanner(r({}, i, {
            site: e
        }));
    },
    getFullAds: function() {
        var e = t();
        return n.default.getFullAds(e);
    },
    getMineAds: function() {
        var e = t();
        return n.default.getMineAds(e);
    }
};