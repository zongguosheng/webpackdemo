function e(e) {
    if ("string" == typeof e) {
        var o = e;
        e.startsWith("**YGKJ") && (o = o.replace("**YGKJ", "").replace("YGKJ##", "")), e = JSON.parse(o).jsonr;
    } else e.jsonr && (e = e.jsonr);
    return e.status === r ? Promise.resolve(e.data) : e.status === t ? Promise.resolve(e) : (console.error("parse res error"), 
    Promise.reject(e));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "00", t = 0, o = {
    get: function(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return wx.pro.request({
            method: "GET",
            url: r,
            data: t,
            header: o
        }).then(e);
    },
    post: function(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return wx.pro.request({
            method: "POST",
            url: r,
            data: t,
            header: o
        }).then(e);
    }
};

exports.default = o;