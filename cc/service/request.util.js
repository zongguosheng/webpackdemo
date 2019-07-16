Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.default = {
    handlerResponse: function(e) {
        if (e && "object" === (void 0 === e ? "undefined" : t(e))) return e.data;
        if (e && /(^\*\*YGKJ)|(YGKJ##$)/g.test(e)) {
            var o = JSON.parse(e.replace(/(^\*\*YGKJ)|(YGKJ##$)/g, "")).jsonr;
            if ("00" === o.status) return o.data;
        }
        return !1;
    }
};