function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../core/storage/index")), t = require("./config"), i = function() {
    function i(n) {
        e(this, i), this.key = n;
    }
    return n(i, [ {
        key: "checkTrigger",
        value: function(e) {
            return e % 10 == 0;
        }
    }, {
        key: "increase",
        value: function(e) {
            if (t.ENABLE) {
                var n = r.default.getKeySync(this.key, 0) + 1;
                this.checkTrigger(n) && e && e(), r.default.setKeySync(this.key, n);
            }
        }
    } ]), i;
}();

exports.default = i;