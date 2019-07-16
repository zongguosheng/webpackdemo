Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/storage.js")), t = "guideLineDetail_userEnterTimes", n = {
    _ifShowNewerGuide: function() {
        var n = e.default.getSync(t, {
            count: 0
        }).count, u = e.default.getSync("guideLineDetail\b_CollectTimes", {
            count: 0
        }).count;
        if (u < 5) {
            var i = (1 - 1 / (1.2 ^ n)) / 3, r = Math.random() < i;
            return r && e.default.setSync("guideLineDetail\b_CollectTimes", {
                count: u + 1
            }), r;
        }
        return !1;
    },
    _ifShowCollectGuide: function() {
        var n = e.default.getSync(t, {
            count: 0
        }).count, u = e.default.getSync("guideLineDetail\b_aboardTimes", {
            count: 0
        }).count;
        if (u < 5) {
            var i = (1 - 1 / (1.2 ^ n)) / 2, r = Math.random() < i;
            return r && e.default.setSync("guideLineDetail\b_aboardTimes", {
                count: u + 1
            }), r;
        }
        return !1;
    },
    _ifShowRecommendGuide: function() {
        var n = e.default.getSync(t, {
            count: 0
        }).count, u = e.default.getSync("guideLineDetail\b_shareTimes", {
            count: 0
        }).count;
        if (u < 5) {
            var i = 1 - 1 / (1.2 ^ n), r = Math.random() < i;
            return r && e.default.setSync("guideLineDetail\b_shareTimes", {
                count: u + 1
            }), r;
        }
        return !1;
    }
}, u = function() {
    this.cache = [];
};

u.prototype.add = function(e) {
    for (var t, u = this, i = 0; t = e[i++]; ) !function(e) {
        var t = e.strategy.split(":");
        u.cache.push(function() {
            var e = t.shift();
            return n[e];
        });
    }(t);
}, u.prototype.start = function(e) {
    for (var t = e ? 1 : this.cache.length, n = 0; n < t; n++) if ((0, this.cache[n])()()) return n + 1;
};

exports.default = {
    showWhich: function(e) {
        var t = new u();
        return t.add([ {
            strategy: "_ifShowNewerGuide"
        }, {
            strategy: "_ifShowCollectGuide"
        }, {
            strategy: "_ifShowRecommendGuide"
        } ]), t.start(e);
    },
    howManyTimesEnter: function() {
        var n = 1 + e.default.getSync(t, {
            count: 0
        }).count;
        return e.default.setSync(t, {
            count: n
        }), n;
    }
};