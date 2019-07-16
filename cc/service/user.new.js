function e() {
    var e = r.default.getUserId();
    return e || console.error("no userId"), {
        userId: e || "",
        userName: r.default.info.nickName || "",
        avatarUrl: r.default.info.avatarUrl || "",
        info: r.default.info
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./user"));

exports.default = {
    getUser: function() {
        return r.default.get().then(function() {
            return e();
        });
    },
    getUserSync: e
};