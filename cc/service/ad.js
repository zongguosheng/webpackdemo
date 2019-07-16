function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../ad/ad.mgr")), i = e(require("../ad/ad.type")), t = e(require("../ad/ad.navigator")), n = e(require("./realtimelog")), o = require("../utils/es6-promise"), d = {
    aroundFloatLayerAD: [],
    aroundSessionNoShowAD: !1,
    mineCenterAD: [],
    minePageFlag: !1,
    mineTabShowRedPoint: !1,
    lineDetailSessionNoShowAD: !1,
    logs: function(e, a) {
        n.default.logs(e, a);
    },
    navigateAD: function(e) {
        t.default.navigate(e);
    },
    loadLineAround: function(e) {
        var a = [];
        return ("pages/linedetail/linedetail" === e.globalData.lastPage || "pages/stationdetail/stationdetail" === e.globalData.lastPage) && a.push(this.loadAroundFloatLayer()), 
        o.all(a);
    },
    _setMine: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = wx.getStorageSync("line-around-ad-has-read-ids") || {};
        a.forEach(function(a) {
            a.advs.forEach(function(a) {
                e.logs("<ADV_EXHIBIT>", {
                    adv_id: a.id,
                    adv_type: a.showType
                }), -1 !== a.redPointTime && (!i[a.id] || i[a.id] < a.redPointTime) && (e.mineTabShowRedPoint = !0, 
                a.showRedPoint = !0);
            });
        }), this.mineCenterAD = a;
    },
    clickMine: function(e) {
        var a = this;
        wx.reportAnalytics("mine_ad_click", {
            adv_id: e.id,
            adv_mpid: e.wxMiniProId
        }), this.logs("<ADV_CLICK>", {
            adv_id: e.id,
            adv_type: e.showType
        }), this.mineTabShowRedPoint = !1, this.mineCenterAD.forEach(function(i) {
            i.advs.forEach(function(i) {
                i.id === e.id && (i.showRedPoint = !1), i.showRedPoint && (a.mineTabShowRedPoint = !0);
            });
        });
        var i = wx.getStorageSync("line-around-ad-has-read-ids") || {};
        i[e.id] = e, wx.setStorage({
            key: "line-around-ad-has-read-ids",
            data: i
        }), this.navigateAD({
            adType: e.adType,
            linkUrl: e.link,
            appId: e.wxMiniProId,
            path: e.wxMiniProPath || ""
        });
    },
    loadMineAD: function() {
        var e = this;
        return a.default.getMineAds().then(function(a) {
            e._setMine(a);
        });
    },
    closeAroundFloat: function(e, a) {
        this.logs("<ADV_CLOSE>", {
            adv_type: e.showType,
            adv_id: e.id,
            stats_referer: a
        });
    },
    clickAroundFloat: function(e, a) {
        wx.reportAnalytics("main_float_click", {
            adv_mpid: e.wxMiniProId,
            adv_id: e.id
        }), this.logs("<ADV_CLICK>", {
            adv_type: e.showType,
            adv_id: e.id,
            stats_referer: a
        }), this.navigateAD({
            targetType: e.targetType,
            linkUrl: e.link,
            appId: e.wxMiniProId,
            path: e.wxMiniProPath || ""
        });
    },
    _setAroundFloat: function(e) {
        e ? i.default.supportTargetType(e.targetType) && (this.aroundFloatLayerAD = [ e ]) : this.aroundFloatLayerAD = [];
    },
    aroundFloatLayerADSendLogs: function(e, a) {
        this.logs("<ADV_EXHIBIT>", {
            adv_type: e.showType,
            adv_id: e.id,
            stats_referer: a
        });
    },
    loadAroundFloatLayer: function() {
        var e = this;
        return a.default.getFullAds().then(function(a) {
            e._setAroundFloat(a);
        });
    }
};

module.exports = d;