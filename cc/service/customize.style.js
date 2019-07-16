function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t, o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./customize.core")), n = (t = {}, e(t, o.default.Const.ZhangZhou, {
    apply: function(e, t) {
        console.log("[style]zhangzhou20180925"), wx.setNavigationBarColor({
            backgroundColor: "#427DFF",
            frontColor: "#ffffff"
        });
    }
}), e(t, o.default.Const.DEFAULT, {
    apply: function(e, t) {
        console.log("[style]default");
    }
}), t);

exports.default = {
    getStyle: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = o.default.get(e);
        return n[t] || n[o.default.Const.DEFAULT];
    }
};