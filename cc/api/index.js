Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getQrcode: function(e, t) {
        var n = e + "/mp-marketing/dice/getQrcode", r = [];
        for (var o in t) r.push(o + "=" + t[o]);
        return n = n + "?" + r.join("&"), new Promise(function(e, t) {
            wx.getImageInfo({
                src: n,
                success: function(t) {
                    e(t.path);
                },
                fail: function() {
                    t();
                }
            });
        });
    }
};