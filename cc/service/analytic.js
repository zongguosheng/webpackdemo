var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./user.new.js")), n = require("../service/constant"), t = require("../service/city"), s = require("../service/gps"), o = {
    isOnline: !0,
    isFirst: !0,
    login: function(e, r) {
        r.sensors.register({
            app_name: n.name,
            app_version: n.requestParams.v
        }), r.sensors.identify(e, !0), this.handleSensors(r, r.options);
    },
    handleSensors: function(n, t) {
        var s = "";
        t && "object" === (void 0 === t ? "undefined" : e(t)) ? s = t.scene : t = {};
        var o = {
            scene: s,
            curPage: "app",
            describ: "open",
            userType: "wechat_mp"
        };
        "{}" !== JSON.stringify(t.query) && (o.query = JSON.stringify(t.query)), t && t.referrerInfo && (o.appId = t.referrerInfo.appId), 
        o.userId = r.default.getUserSync().userId, this.isOnline && n.sensors.track("WECHAT_MP_PAGE", o), 
        this.isFirst = !1;
    },
    track: function(e) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments[2];
        o.src = n.requestParams.src, o.userType = "wechat_mp", wx.getSystemInfo({
            success: function(e) {
                o.platform = e.system;
            }
        }), t.valid() && (o.city = t.cityName), s.valid() && (o.geo_lng = String(s.longitude), 
        o.geo_lat = String(s.latitude)), this.isOnline && r.default.getUser().then(function(r) {
            o.userId = r.userId, i.sensors.identify(r.userId, !0), i.sensors.track(e, o);
        }).catch(function(n) {
            console.error(n), o.userId = r.default.getUserSync().userId, i.sensors.track(e, o);
        });
    },
    trackAppOpen: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        this.track("WECHAT_MP_OPEN", e, r);
    },
    trackClick: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        this.track("WECHAT_MP_CLICK", e, r);
    },
    trackPage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        this.track("WECHAT_MP_PAGE", e, r);
    },
    promotionChannel: function(e) {
        var r = e.options, t = this;
        r.query.phone && (r.shareTicket ? wx.getShareInfo({
            shareTicket: r.shareTicket,
            success: function(s) {
                wx.pro.request({
                    url: n.baseUrl + "wechat/getOpenGid?pro_type=2&encryptedData=" + s.encryptedData + "&iv=" + s.iv
                }).then(function(n) {
                    console.log("-------渠道推广上报有群号ID----------"), console.log(n), wx.reportAnalytics("promotion_channel", {
                        phone: r.query.phone,
                        nickname: r.query.nickName,
                        shareticket: n.data
                    }), t.track("WECHAT_MP_RUKOULAIYUAN", {
                        user_phone: r.query.phone,
                        user_name: r.query.nickName,
                        qun_id: n.data
                    }, e);
                });
            }
        }) : (console.log("-------渠道推广上报没有群ID----------"), wx.reportAnalytics("promotion_channel", {
            phone: r.query.phone,
            nickname: r.query.nickName,
            shareticket: ""
        }), t.track("WECHAT_MP_RUKOULAIYUAN", {
            user_phone: r.query.phone,
            user_name: r.query.nickName,
            qun_id: ""
        }, e)));
    }
};

module.exports = o;