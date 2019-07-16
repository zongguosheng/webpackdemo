function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return e.adType === u.default.AD_TYPE_LINK || e.targetType === u.default.TARGET_TYPE_LINK;
}

function r(e) {
    return e.adType === u.default.AD_TYPE_MP_OUTER || e.targetType === u.default.TARGET_TYPE_MP_OUTER || e.targetType === u.default.TARGET_TYPE_MP_INSERT_OUTER;
}

function n(e) {
    return e.adType === u.default.AD_TYPE_MP_INNER || e.targetType === u.default.TARGET_TYPE_MP_INNER;
}

function a(e) {
    return e.targetType === u.default.TARGET_TYPE_MP_PLUGIN;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = e(require("./ad.type")), i = e(require("../pages/web/router")), T = [ function(e) {
    return !!t(e) && (i.default.open({
        src: e.linkUrl,
        title: e.title
    }), !0);
}, function(e) {
    return !!r(e) && (wx.navigateToMiniProgram({
        appId: e.appId,
        path: e.path || ""
    }), !0);
}, function(e) {
    return !!n(e) && !e.path.startsWith("chelaile://") && (wx.navigateTo({
        url: e.path || "/pages/main/main"
    }), !0);
}, function(e) {
    return !!a(e) && (wx.navigateTo({
        url: "/added/plugin-nav/pages/index/index?pluginId=" + e.pluginId
    }), !0);
} ];

exports.default = {
    navigate: function(e) {
        var t = !0, r = !1, n = void 0;
        try {
            for (var a, u = T[Symbol.iterator](); !(t = (a = u.next()).done); t = !0) if ((0, 
            a.value)(e)) return !0;
        } catch (e) {
            r = !0, n = e;
        } finally {
            try {
                !t && u.return && u.return();
            } finally {
                if (r) throw n;
            }
        }
        return console.warn("no navigator", e), !1;
    }
};