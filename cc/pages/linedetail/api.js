Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../utils/util.js"), n = require("../../service/constant"), r = getApp(), t = {
    getStationAds: function(r) {
        return wx.pro.request({
            url: n.AdBaseUrl + "/adpub/adv!getStationAds.action?",
            data: r
        }).then(function(n) {
            var r = e.handlerResponse(n).ads;
            if (r && r.length > 0) return r[0];
        });
    },
    ifShowOfficialAccount: function(e, t) {
        var a = /\./g, o = wx.getSystemInfoSync().SDKVersion, u = (o = o.replace(a, "")) >= 230, i = r.globalData.scene;
        return 1011 !== i && 1047 !== i || !u ? new Promise(function(e, n) {
            e(!1);
        }) : wx.pro.request({
            url: n.baseUrl + "api/mp-marketing/isShowOfficialAccount",
            data: e
        }).then(function(e) {
            return e.data.show;
        }).catch(function() {
            return !1;
        });
    },
    addAboardMsg: function(r) {
        return wx.pro.request({
            url: n.baseApiUrl + "bus/reminder!mp-add.action",
            data: r
        }).then(function(n) {
            return e.handlerResponse(n);
        }).catch(function(e) {
            console.log("上报 到站提醒报错", e);
        });
    },
    ifRemind: function(r) {
        return wx.pro.request({
            url: n.baseApiUrl + "bus/reminder!mp-list.action",
            data: r
        }).then(function(n) {
            return e.handlerResponse(n);
        }).catch(function(e) {
            console.log("是否设置到站提醒报错", e);
        });
    },
    ifShowPayBubble: function(r) {
        return wx.pro.request({
            url: n.baseApiUrl + "buspay/lineDetailBubble",
            data: r
        }).then(function(n) {
            return e.handlerResponse(n);
        }).catch(function(e) {
            console.error("err", e);
        });
    },
    ifShowPayEnter: function(e) {
        return wx.pro.request({
            url: n.baseApiUrl + "adpub/adv!getPayEntrySwitch.action",
            data: e
        }).then(function(e) {
            return e.jsonr.data;
        }).catch(function(e) {
            console.error("err", e);
        });
    },
    lineDetailBubbleClick: function(r) {
        return wx.pro.request({
            url: n.baseApiUrl + "buspay/lineDetailBubbleClick",
            data: r
        }).then(function(n) {
            return e.handlerResponse(n);
        }).catch(function(e) {
            console.error("err", e);
        });
    }
};

exports.default = t;