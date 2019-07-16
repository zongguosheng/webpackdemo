var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, t = require("../utils/es6-promise"), r = require("./constant"), o = require("./user"), s = require("./city"), a = require("./gps"), i = require("./customize.plugin");

wx.pro.request = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    n.toast && wx.showToast({
        title: n.toast.title || "加载中",
        icon: "loading",
        duration: n.toast.duration || 2e3
    });
    var u = e({}, r.requestParams, i.getRequestParam());
    s.valid() && (u.cityId = s.cityId), a.valid() && (u.lat = u.geo_lat = a.latitude, 
    u.lng = u.geo_lng = a.longitude, u.gpstype = u.gpstype || a.type), o.validUnionId() && (u.unionId = o.unionId), 
    u.userId = o.userId, u.h5Id = o.userId, r.baseUrl.indexOf("dev.web.chelaile") > 0 && (u.userId = "isdev_" + o.userId, 
    u.h5Id = "isdev_" + o.userId);
    var d = e({}, u);
    for (var l in n.data) d[l] = n.data[l];
    return new t(function(e, t) {
        wx.request({
            url: n.url,
            method: n.method || "GET",
            data: d,
            header: n.header || {
                "Content-Type": "text"
            },
            success: function(r) {
                r.statusCode >= 400 ? (console.error("wx.request fail [business]", n, r.statusCode, r.data), 
                t(r)) : e(r.data), wx.hideToast();
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络错误",
                    icon: "none",
                    duration: 4e3
                }), console.error("wx.request fail [network]", n, e), t(e);
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    });
};