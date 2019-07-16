function t(t) {
    if (Array.isArray(t)) {
        for (var n = 0, r = Array(t.length); n < t.length; n++) r[n] = t[n];
        return r;
    }
    return Array.from(t);
}

function n(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function t(t, n) {
        for (var r = 0; r < n.length; r++) {
            var e = n[r];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(n, r, e) {
        return r && t(n.prototype, r), e && t(n, e), n;
    };
}(), e = function() {
    function e() {
        n(this, e), this._name = "Connector", this._options = [], this._invokers = [];
    }
    return r(e, [ {
        key: "next",
        value: function(t) {
            return this._invokers.push(t), this;
        }
    }, {
        key: "invoke",
        value: function(n) {
            var r = this._invokers[n];
            if (r) {
                for (var e = this.invoke.bind(this, n + 1), i = arguments.length, o = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) o[a - 1] = arguments[a];
                r.bind.apply(r, [ this, e ].concat(t(this._options))).apply(void 0, o);
            }
        }
    }, {
        key: "start",
        value: function() {
            for (var n = arguments.length, r = Array(n), e = 0; e < n; e++) r[e] = arguments[e];
            this._options = [ this ].concat(r), this.invoke.apply(this, [ 0 ].concat(t(this._options)));
        }
    }, {
        key: "toString",
        value: function() {
            return this._name;
        }
    } ]), e;
}();

exports.default = e;