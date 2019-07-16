function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../api/api.cfg")), n = e(require("../api/api.request")), u = function() {
    return t.default.getBaseUrl();
};

exports.default = {
    getGridAds: function(e) {
        return n.default.get(u() + "/adpub/adv!getGuideAds.action", e).then(function(e) {
            return e ? e.advs || [] : [];
        });
    },
    getBanner: function(e) {
        return n.default.get(u() + "/adpub/adv!getWechatAppHomeBanner.action", e).then(function(e) {
            return e;
        });
    },
    getFullAds: function(e) {
        return n.default.get(u() + "/adpub/adv!getWechatFullAds.action", e).then(function(e) {
            return e.ads;
        });
    },
    getMineAds: function(e) {
        return n.default.get(u() + "/adpub/adv!getGuideAds.action", e).then(function(e) {
            return e ? e.myAdvs || [] : [];
        });
    }
};