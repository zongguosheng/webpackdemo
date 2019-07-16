Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getImageInfo = function(t) {
    return 0 === (t = t || "").indexOf("/") && (t = t.slice(1)), t = e.base + "/" + t, 
    new Promise(function(e, n) {
        wx.getImageInfo({
            src: t,
            success: function(t) {
                e(t);
            },
            fail: function() {
                n();
            }
        });
    });
}, exports.default = function(t) {
    return new Promise(function(n, s) {
        var u = t.url || "";
        0 === u.indexOf("/") && (u = u.slice(1)), u = e.base + "/" + u, wx.request(Object.assign({}, t, {
            url: u,
            success: function(e) {
                200 === e.statusCode && e.data && "00" === e.data.status ? n(e.data) : s(e);
            },
            fail: function(e) {
                s(e);
            }
        }));
    });
};

var e = require("./config.js");