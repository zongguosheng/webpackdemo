function e(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

function r(r, i, a) {
    var o, l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "pages/main/main", c = t((o = {}, 
    e(o, u.QUERY.VERSION, u.VERSION), e(o, u.QUERY.FROM, r), e(o, u.QUERY.TO, i), o), a), f = n.default.toQueryString(c, !1);
    return n.default.toUrlString(l, f);
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
}(require("../mp/url")), u = require("./redirector.const");

exports.default = {
    getMeta: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = e.scene || "";
        if (r) return {
            scene: r
        };
        var t = e[u.QUERY.TO];
        if (t) {
            var n = e[u.QUERY.VERSION], i = e[u.QUERY.FROM].split(u.SEP);
            return {
                scene: r,
                from: i[0],
                tag: i[1] || "",
                to: t,
                version: n
            };
        }
        return null;
    },
    parseQueryString: function(e) {
        return e.split("?")[1].split("&").reduce(function(e, r) {
            var t = r.split("=");
            return e[t[0]] = t[1], e;
        }, {});
    },
    getSharePath: function(e, t, n, i) {
        return r(u.FROM.SHARE, t, n, i);
    },
    handleXRYL: function(e) {
        return "xryl_" + e + "_0";
    }
};