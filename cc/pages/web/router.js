Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    open: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e;
        "string" == typeof e && (t = {
            src: e
        });
        var o = JSON.stringify(t), n = encodeURIComponent(o);
        wx.navigateTo({
            url: "/pages/web/index?payload=" + n
        });
    }
};