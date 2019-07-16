function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this._routes = t.reduce(function(e, t) {
            return e[t.name] = t, e;
        }, {}), this._before = function(e, t, n) {
            n();
        };
    }
    return t(n, [ {
        key: "_getRoute",
        value: function(e) {
            var t = getCurrentPages(), n = t[t.length > e ? t.length - 1 - e : 0].route;
            return n.startsWith("/") || (n = "/" + n), Object.values(this._routes).find(function(e) {
                return e.path === n;
            });
        }
    }, {
        key: "_getLastRoute",
        value: function() {
            return this._getRoute(0);
        }
    }, {
        key: "push",
        value: function(e) {
            var t = this, n = this._getLastRoute(), r = this._routes[e.name];
            this._before(n, r, function() {
                wx.navigateTo({
                    url: t._routes[r.name].path
                });
            });
        }
    }, {
        key: "replace",
        value: function(e) {
            var t = this, n = this._getLastRoute(), r = this._routes[e.name];
            this._before(n, r, function() {
                wx.redirectTo({
                    url: t._routes[r.name].path
                });
            });
        }
    }, {
        key: "go",
        value: function(e) {
            if (e >= 0) console.warn("delta:" + e + ">=0"); else {
                e = -e;
                var t = this._getLastRoute(), n = this._getRoute(e);
                this._before(t, n, function() {
                    wx.navigateBack({
                        delta: e
                    });
                });
            }
        }
    }, {
        key: "before",
        value: function(e) {
            this._before = e;
        }
    } ]), n;
}();

exports.default = n;