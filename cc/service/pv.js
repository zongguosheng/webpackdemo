function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, r = function() {
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
}(), a = require("./analytic"), o = function() {
    function o(e) {
        t(this, o), this.app = e, this.enterTime = 0;
    }
    return r(o, [ {
        key: "onEnterPage",
        value: function() {
            this.enterTime = Date.now();
        }
    }, {
        key: "_getDuration",
        value: function() {
            return Date.now() - this.enterTime;
        }
    }, {
        key: "onLeavePage",
        value: function(e, t) {
            var r = this._getDuration();
            console.log("leave duration = " + r), a.track(e, n({}, t, {
                duration: r
            }), this.app);
        }
    }, {
        key: "onClick",
        value: function(t, r, o) {
            var i = this._getDuration();
            console.log("click duration = " + i), a.track(t, n({}, r, e({}, o || "duration", i)), this.app);
        }
    } ]), o;
}();

exports.default = o;