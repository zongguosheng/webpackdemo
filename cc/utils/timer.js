function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = 15e3, i = function() {
    function i(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n;
        t(this, i), this.app = e, this.setInterval(r), this.stopped = !1;
    }
    return e(i, [ {
        key: "setInterval",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n;
            this.interval = t;
        }
    }, {
        key: "start",
        value: function(t) {
            var e = this;
            this.stopped || this.stop(), this.stopped = !1, this.timerFlag = setTimeout(function() {
                t(e), e.stopped || e.start(t);
            }, this.interval);
        }
    }, {
        key: "stop",
        value: function() {
            this.stopped = !0, clearTimeout(this.timerFlag);
        }
    } ]), i;
}();

exports.default = i;