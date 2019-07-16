function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function n(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function o(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AppRedirector = exports.PageRedirector = void 0;

var a = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), i = e(require("../mp/url")), u = require("./redirector.const"), l = e(require("./redirector.util")), f = e(require("./session")), s = function() {
    function e(t) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        o(this, e), this.handlers = [], this.defaultHandler = t, this.name = r;
    }
    return a(e, [ {
        key: "addHandler",
        value: function(e) {
            if (Array.prototype.isPrototypeOf(e)) {
                var t;
                (t = this.handlers).push.apply(t, n(e));
            } else this.handlers.push(e);
        }
    } ]), e;
}();

exports.PageRedirector = function(e) {
    function n() {
        return o(this, n), t(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments));
    }
    return r(n, s), a(n, [ {
        key: "handle",
        value: function(e, t, r) {
            var n = {}, o = {}, a = r.q;
            if (a) {
                var s = l.default.parseQueryString(decodeURIComponent(a));
                n = {
                    scanTime: r.scancode_time,
                    from: s[u.QUERY.FROM],
                    to: s[u.QUERY.TO],
                    version: s[u.QUERY.VERSION]
                }, o = s;
            } else o = r, (n = l.default.getMeta(r)) || (n = {
                scene: r.scene || "",
                from: i.default.getFrom(r),
                to: i.default.getTo(r)
            }, o = i.default.getPayload(r, !0));
            f.default.meta = n;
            var c = !0, d = !1, p = void 0;
            try {
                for (var h, y = this.handlers[Symbol.iterator](); !(c = (h = y.next()).done); c = !0) if (h.value.handle(e, t, n, o)) return !0;
            } catch (e) {
                d = !0, p = e;
            } finally {
                try {
                    !c && y.return && y.return();
                } finally {
                    if (d) throw p;
                }
            }
            return this.defaultHandler && this.defaultHandler.handle(e, t);
        }
    } ]), n;
}(), exports.AppRedirector = function(e) {
    function n() {
        return o(this, n), t(this, (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments));
    }
    return r(n, s), a(n, [ {
        key: "handle",
        value: function(e, t) {
            var r = t.scene, n = i.default.getTo(t.extraData), o = i.default.getFrom(t.extraData), a = i.default.getPayload(t.extraData, !1, !1), u = !0, l = !1, f = void 0;
            try {
                for (var s, c = this.handlers[Symbol.iterator](); !(u = (s = c.next()).done); u = !0) if (s.value.handle(e, r, o, n, a, t)) return !0;
            } catch (e) {
                l = !0, f = e;
            } finally {
                try {
                    !u && c.return && c.return();
                } finally {
                    if (l) throw f;
                }
            }
            return this.defaultHandler.handle(e, t);
        }
    } ]), n;
}();