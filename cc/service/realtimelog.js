function e(e, i) {
    var a = r({}, n.requestParams);
    o.valid() && (a.cityId = o.cityId), a.userId = t.userId, t.validUnionId() && (a.unionId = t.unionId);
    for (var s in i) i.hasOwnProperty(s) && (a[s] = i[s]);
    var u = [];
    for (var c in a) u.push(c + ":" + a[c]);
    return "" + e + encodeURIComponent(u.join("|#"));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, t = require("user"), n = require("../service/constant"), o = require("../service/city");

exports.default = {
    logs: function(r, t) {
        var n = "https://logs.chelaile.net.cn/realtimelog";
        n = n + "?" + e(r, t), wx.request({
            url: n
        });
    }
};