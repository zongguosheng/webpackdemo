function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../api/api.cfg")), r = e(require("../../api/api.request")), u = function() {
    return t.default.getBaseUrl();
};

exports.default = {
    getHomePageInfo: function(e) {
        return r.default.get(u() + "/bus/stop!homePageInfo.action", e, {
            "content-type": "text"
        });
    }
};