function e(e) {
    return e && "object" === (void 0 === e ? "undefined" : t(e)) && "undefined" !== e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.default = {
    NO_SCENE: "NO_SCENE",
    NO_FROM: "NO_FROM",
    checkOptions: e,
    getFromApp: function(t) {
        if (!e(t)) return console.log("[getFromApp] check options fail"), {};
        var r = {};
        r.scene = t.scene || "NO_SCENE", r.path = t.path || "", r.query = t.query || {}, 
        r.shareTicket = t.shareTicket || "", r.from = r.query.from || "NO_FROM", r.isWxCityService = 1092 === r.scene, 
        r.adEnable = "1" !== r.query.noShowAD, r.switchCityEnable = "0" !== r.query.switchCity, 
        r.query.cityId && r.query.cityName && (r.city = {
            cityId: r.query.cityId,
            cityName: r.query.cityName
        });
        var o = t.referrerInfo;
        return o && (r.appid = o.appId || "", r.extraData = o.extraData || {}), r;
    }
};