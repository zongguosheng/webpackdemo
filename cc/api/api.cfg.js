Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../mp/env"));

exports.default = {
    getBaseUrl: function() {
       // return e.default.env === e.default.DEV ? "https://dev.web.chelaile.net.cn/api" : "https://web.chelaile.net.cn/api";
      return e.default.env === e.default.DEV ? "https://dev.web.chelaile.net.cn" : "https://web.chelaile.net.cn";
    }
};