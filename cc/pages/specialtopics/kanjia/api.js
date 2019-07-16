function e(e) {
    return "00" === e.status ? Promise.resolve(e.data) : Promise.reject(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./query")), t = "https://web.chelaile.net.cn/api/", n = {
    getConfig: function(r) {
        return wx.pro.request({
            url: t + "mp-marketing/bargain/config",
            data: {
                hdId: r
            }
        }).then(e);
    },
    getHistory: function(r, n) {
        return wx.pro.request({
            url: t + "mp-marketing/bargain/activity/history",
            data: {
                userId: n,
                hdId: r
            }
        }).then(e);
    },
    activities: function(r, n) {
        return wx.pro.request({
            url: t + "mp-marketing/bargain/activity/list",
            data: {
                hdId: n,
                userId: r
            }
        }).then(e).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return e.forEach(function(e) {
                e.displayMoney = (e.bargainMoney / 100).toFixed(2);
            }), e;
        });
    },
    getOpenGid: function(r) {
        return wx.pro.request({
            url: t + "wechat/getOpenGid",
            data: {
                pro_type: 2,
                encryptedData: r.encryptedData,
                iv: r.iv
            }
        }).then(e);
    },
    notices: function(r) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return wx.pro.request({
            url: t + "mp-marketing/bargain/notice",
            data: {
                pageIndex: n,
                hdId: r
            }
        }).then(e);
    },
    gotit: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments[2];
        return wx.pro.request({
            url: t + "mp-marketing/bargain/prize/gotit",
            data: {
                userId: r,
                hdId: n,
                goodsId: i
            }
        }).then(e);
    },
    queryPrize: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments[2], a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return wx.pro.request({
            url: t + "mp-marketing/bargain/prize/query",
            data: {
                userId: r,
                hdId: n,
                goodsId: i,
                bargainStartTime: a
            }
        }).then(e);
    },
    queryConsolationPrize: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments[2];
        return wx.pro.request({
            url: t + "mp-marketing/bargain/prize/ygpz",
            data: {
                userId: r,
                hdId: n,
                goodsId: i
            }
        }).then(e);
    },
    process: function(r) {
        var n = r.hdId, i = void 0 === n ? "" : n, a = r.userId, o = void 0 === a ? "" : a, d = r.fUserId, u = void 0 === d ? "" : d, s = r.goodsId, g = void 0 === s ? "" : s, c = r.groupId, p = void 0 === c ? "" : c, h = r.shareBargainCount, l = void 0 === h ? 0 : h;
        return wx.pro.request({
            url: t + "mp-marketing/bargain/process",
            data: {
                hdId: i,
                userId: o,
                fUserId: u,
                goodsId: g,
                groupId: p,
                shareBargainCount: l
            }
        }).then(e);
    },
    share: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        return wx.pro.request({
            url: t + "mp-marketing/bargain/activity/share",
            data: {
                userId: r,
                hdId: n,
                goodsId: i
            }
        }).then(e);
    },
    getQrcode: function(e) {
        var r = t + "mp-marketing/dice/getQrcode", n = [];
        for (var i in e) n.push(i + "=" + e[i]);
        return r = r + "?" + n.join("&"), new Promise(function(e, t) {
            wx.getImageInfo({
                src: r,
                success: function(r) {
                    e(r.path);
                },
                fail: function() {
                    t();
                }
            });
        });
    },
    encode: function(n, i) {
        var a = r.default.toQuery({
            userId: n,
            content: i
        });
        return wx.pro.request({
            url: t + "mp-marketing/md5?" + a,
            method: "POST",
            data: ""
        }).then(e);
    },
    decode: function(r, n) {
        return wx.pro.request({
            url: t + "mp-marketing/md5",
            data: {
                userId: r,
                md5: n
            }
        }).then(e);
    }
};

exports.default = n;