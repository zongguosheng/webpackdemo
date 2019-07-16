function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../mp/storage.js")), n = e(require("../../mp/mp.js")), u = {
    _ifShowNewerGuide: function() {
        t.default.getSync("guide_userEnterTimes", {
            count: 0
        }).count;
        return !1;
    },
    _ifShowCollectGuide: function() {
        var e = wx.getSystemInfoSync().version, u = n.default.compareVersion(e, "6.7.1"), r = t.default.getSync("guide_userEnterTimes", {
            count: 0
        }).count, o = t.default.getSync("guide_\bshowCollectTimes", {
            count: 0
        }).count;
        if (o < 5 && u) {
            var i = (1 - 1 / (1.2 ^ r)) / 2, c = Math.random() < i;
            return c && t.default.setSync("guide_\bshowCollectTimes", {
                count: o + 1
            }), c;
        }
        return !1;
    },
    _ifShowRecommendGuide: function() {
        var e = t.default.getSync("guide_userEnterTimes", {
            count: 0
        }).count, n = t.default.getSync("guide_\bshowRecommendTimes", {
            count: 0
        }).count;
        if (n < 5) {
            var u = (1 - 1 / (1.2 ^ e)) / 3, r = Math.random() < u;
            return r && t.default.setSync("guide_\bshowRecommendTimes", {
                count: n + 1
            }), r;
        }
        return !1;
    }
}, r = function() {
    this.cache = [];
};

r.prototype.add = function(e) {
    for (var t, n = this, r = 0; t = e[r++]; ) !function(e) {
        var t = e.strategy.split(":");
        n.cache.push(function() {
            var e = t.shift();
            return u[e];
        });
    }(t);
}, r.prototype.start = function() {
    for (var e, t = 0; e = this.cache[t++]; ) if (e()()) return t;
};

exports.default = {
    showWhich: function() {
        var e = new r();
        return e.add([ {
            strategy: "_ifShowNewerGuide"
        }, {
            strategy: "_ifShowCollectGuide"
        }, {
            strategy: "_ifShowRecommendGuide"
        } ]), e.start();
    },
    howManyTimesEnter: function() {
        var e = 1 + t.default.getSync("guide_userEnterTimes", {
            count: 0
        }).count;
        return t.default.setSync("guide_userEnterTimes", {
            count: e
        }), e;
    },
    isIos: function() {
        return "ios" === wx.getSystemInfoSync().platform;
    }
};