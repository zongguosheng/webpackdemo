Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = !1, e = {}, n = function(n) {
    return function() {
        o && e[n] && e[n].apply(e, arguments);
    };
};

[ "log", "info", "warn", "error" ].forEach(function(o) {
    e[o] = console[o], console[o] = n(o);
}), exports.default = function(e) {
    o = e;
};