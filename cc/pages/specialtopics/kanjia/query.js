Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    toQuery: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return Object.entries(e).map(function(e) {
            return e[0] + "=" + e[1];
        }).join("&");
    },
    fromQuery: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e ? (t && (e = decodeURIComponent(e)), e.split("&").map(function(e) {
            return e.split("=");
        }).reduce(function(e, t) {
            return e[t[0]] = t[1], e;
        }, {})) : {};
    }
};