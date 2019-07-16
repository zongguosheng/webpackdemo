function e() {
    return Object.assign({}, s, o());
}

function r(e) {
    if ("string" == typeof e) {
        var r = e;
        e.startsWith("**YGKJ") && (r = r.replace("**YGKJ", "").replace("YGKJ##", "")), e = JSON.parse(r).jsonr;
    } else e.jsonr && (e = e.jsonr);
    return e.status === a ? Promise.resolve(e.data) : e.status === u ? Promise.resolve(e) : (console.error("parse res error"), 
    Promise.reject(e));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../core/fetcher/index")), s = {
    s: "h5",
    wxs: "wx_app",
    src: "weixinapp_cx",
    sign: "1",
    v: require("../../service/constant").version
}, o = function() {
    return {};
}, a = "00", u = 0;

exports.default = {
    setup: function(e) {
        o = e;
    },
    get: function(s) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = e();
        return n.default.fetch({
            url: s,
            params: t({}, a, o)
        }).then(r);
    },
    post: function(s) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = e();
        return n.default.fetch({
            url: s,
            method: "POST",
            params: t({}, a, o)
        }).then(r);
    }
};