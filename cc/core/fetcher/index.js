Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../utils/es6-promise");

exports.default = {
    fetch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            method: "GET",
            params: {},
            header: {}
        };
        return new e(function(e, r) {
            wx.request({
                url: t.url,
                method: t.method,
                data: t.params,
                header: t.header,
                success: function(t) {
                    200 === t.statusCode ? e(t.data) : r(t);
                },
                fail: function(e) {
                    r(e);
                },
                complete: function() {}
            });
        });
    }
};