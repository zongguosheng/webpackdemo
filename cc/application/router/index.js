Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [ {
    path: "/pages/increase-download/index",
    name: "increase-download"
}, {
    path: "/pages/switch-city/switch-city",
    name: "switch-city"
}, {
    path: "/pages/debug/index",
    name: "debug"
} ], t = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../core/router/index")).default)(e);

t.before(function(e, t, o) {
    console.log("from", e), console.log("to", t), o();
}), exports.default = t;