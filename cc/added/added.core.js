function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = function() {
    function n(t) {
        e(this, n), this.name = t;
    }
    return t(n, [ {
        key: "setData",
        value: function(e, t) {
            var n = e.data._added_, a = Object.assign(n, t);
            e.setData("_added_", a);
        }
    }, {
        key: "inflate",
        value: function(e) {}
    } ]), n;
}();

exports.default = n;