function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function n(t) {
    var e = c.default.get(t);
    return s[e];
}

var i, a = t(require("./protocol")), c = t(require("./customize.core")), o = require("../service/city"), l = {
    apply: function(t, e) {
        return {
            from: e.from,
            contactEnable: !0,
            suggestEnable: !e.isWxCityService,
            guideEnable: e.from !== a.default.NO_FROM && !e.isWxCityService,
            switchCityEnable: e.switchCityEnable && !e.isWxCityService,
            adEnable: !e.isWxCityService && e.adEnable,
            sharePlanEnable: e.from === a.default.NO_FROM,
            promotionEnable: !0,
            city: e.city
        };
    }
}, s = (i = {}, e(i, c.default.Const.ZhangZhou, {
    apply: function(t, e) {
        var n = l.apply(t, e);
        return console.log("[custom]漳州"), Object.assign(n, {
            switchCityEnable: !1,
            guideEnable: !1,
            adEnable: !1,
            promotionEnable: !1,
            suggestEnable: !1,
            city: {
                cityId: "138",
                cityName: "漳州"
            }
        });
    }
}), e(i, c.default.Const.DongGuan, {
    apply: function(t, e) {
        var n = l.apply(t, e);
        return console.log("[custom]东莞"), Object.assign(n, {
            switchCityEnable: !1,
            guideEnable: !1,
            adEnable: !1,
            promotionEnable: !1,
            suggestEnable: !1,
            city: {
                cityId: "008",
                cityName: "东莞"
            }
        });
    }
}), e(i, c.default.Const.DongGuanBus, {
    apply: function(t, e) {
        var n = l.apply(t, e);
        return console.log("[custom]东莞巴士"), Object.assign(n, {
            switchCityEnable: !1,
            guideEnable: !1,
            adEnable: !1,
            promotionEnable: !1,
            suggestEnable: !1,
            city: {
                cityId: "008",
                cityName: "东莞"
            }
        });
    }
}), e(i, c.default.Const.XiaMen, {
    apply: function(t, e) {
        console.log("[custom]厦门");
        var n = l.apply(t, e);
        return Object.assign(n, {
            switchCityEnable: !1,
            city: {
                cityId: "036",
                cityName: "厦门"
            }
        });
    }
}), e(i, c.default.Const.TaiAn, {
    apply: function(t, e) {
        console.log("[custom]泰安");
        var n = l.apply(t, e);
        return Object.assign(n, {
            switchCityEnable: !1,
            city: {
                cityId: "093",
                cityName: "泰安"
            }
        });
    }
}), e(i, c.default.Const.LiuPanShui, {
    apply: function(t, e) {
        console.log("[custom]六盘水");
        var n = l.apply(t, e);
        return Object.assign(n, {
            switchCityEnable: !1,
            city: {
                cityId: "179",
                cityName: "六盘水"
            }
        });
    }
}), e(i, c.default.Const.DEFAULT, {
    apply: function(t, e) {
        return console.log("[custom]default"), l.apply(t, e);
    }
}), i);

module.exports = {
    showContact: function() {
        return this.cfg.contactEnable;
    },
    isPromotionEnable: function() {
        return this.cfg.promotionEnable;
    },
    isSuggestEnable: function() {
        return this.cfg.suggestEnable;
    },
    showNewUserHelp: function() {
        return this.cfg.guideEnable;
    },
    canSwitchCity: function() {
        return this.cfg.switchCityEnable;
    },
    isAdEnable: function() {
        return this.cfg.adEnable;
    },
    showSharePlan: function() {
        return this.cfg.sharePlanEnable;
    },
    getRequestParam: function() {
        return {
            from: this.cfg.from
        };
    },
    handle: function(t, e) {
        var i = n(e);
        this.cfg = i.apply(t, e), this.cfg.city && o.set(this.cfg.city);
    }
};