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
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../core/storage/index")), r = function() {
    function r() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            key: "",
            limit: 10
        };
        e(this, r), this._key = t.key, this._limit = t.limit;
    }
    return t(r, [ {
        key: "_getCityKey",
        value: function(e) {
            return this._key + e.cityId;
        }
    }, {
        key: "equals",
        value: function(e, t) {
            return !1;
        }
    }, {
        key: "getItemsSync",
        value: function(e) {
            var t = this._getCityKey(e);
            return n.default.getKeySync(t, []);
        }
    }, {
        key: "addItemSync",
        value: function(e, t) {
            var r = this, i = this.getItemsSync(e);
            (i = i.filter(function(e) {
                return !r.equals(e, t);
            })).length >= this._limit && i.pop(), i.unshift(t);
            var u = this._getCityKey(e);
            return n.default.setKeySync(u, i);
        }
    }, {
        key: "clearSync",
        value: function(e) {
            var t = this._getCityKey(e);
            return n.default.removeSync(t);
        }
    } ]), r;
}();

exports.default = r;