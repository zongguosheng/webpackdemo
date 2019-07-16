function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = function() {
    function n() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            min: 15e3,
            interval: 15e3
        };
        e(this, n), this._min = t.min, this._interval = t.interval, this._loader = {
            show: function() {},
            hide: function() {}
        }, this._flag = -1;
    }
    return t(n, [ {
        key: "bindLoader",
        value: function(e) {
            return this._last = -1, this._loader = e, this;
        }
    }, {
        key: "unbind",
        value: function() {
            clearTimeout(this._flag);
        }
    }, {
        key: "_reload",
        value: function() {
            var e = this;
            clearTimeout(this._flag), this._loader.hide(), this._last = Date.now(), setTimeout(function() {
                e._loader.show();
            }), this._flag = setTimeout(function() {
                e._reload();
            }, this._interval);
        }
    }, {
        key: "kick",
        value: function() {
            var e = Date.now() - this._last;
            e > this._min ? (console.log("触发:duration=" + e), this._reload()) : console.log("不触发:duration=" + e);
        }
    } ]), n;
}();

exports.default = n;