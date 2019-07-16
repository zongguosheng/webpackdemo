function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("./mp/framework")), n = e(require("./mp/env"));

require("./utils/sensors");

var o = e(require("./mp/sys")), r = e(require("./service/protocol")), a = e(require("./service/customize.style"));

require("./service/wx.pro"), require("./service/wx.pro.request");

var i = e(require("./service/user.new")), u = e(require("./application/city/city.mgr")), c = e(require("./application/user/user.mgr")), l = e(require("./application/location/location.mgr")), s = e(require("./ad/ad.mgr")), g = e(require("./service/realtimelog")), p = e(require("./application/fetcher/index")), f = e(require("./application/context/index")), d = require("./service/analytic"), h = require("./service/customize.plugin");

p.default.setup(function() {
    var e = {}, t = u.default.getSelectedSync();
    t && (e.cityId = t.getId());
    var n = c.default.getUserSync();
    n && (e.userId = n.getId(), e.h5Id = n.getId(), n.getUnionId() && (e.unionId = n.getUnionId()));
    var o = l.default.getLocationSync();
    return o && (e.lat = o.getLatitude(), e.lng = o.getLongitude(), e.gpstype = o.getType()), 
    e;
}), t.default.beforeApp("onLaunch", function(e, t) {
    console.log("onLaunch", new Date().toISOString(), t), n.default.env = t.query._env_;
}), t.default.beforeApp("onShow", function(e, t) {
    console.log("onShow", new Date().toISOString(), t);
}), t.default.beforePage("onLoad", function(e, t) {
    var n = getApp();
    console.log("page[" + e.route + "] onLoad", new Date().toISOString(), t), e.onGetStyle ? e.onGetStyle().apply(n) : n.getStyle().apply(n);
}), t.default.beforePage("onHide", function(e, t) {
    getApp().globalData.lastPage = e.route;
}), t.default.beforePage("onUnload", function(e, t) {
    getApp().globalData.lastPage = e.route;
}), t.default.App({
    globalData: {
        isIpx: !1,
        lastPage: "pages/main/main",
        _foreground: !1,
        scene: "",
        noNetwork: !1
    },
    options: {},
    onLaunch: function(e) {
      console.log('777')
        f.default.update(e), s.default.init(function() {
            return {
                gender: i.default.getUserSync().info.gender || ""
            };
        }), this._getSystemInfo(), this._trackOpen(e), wx.onNetworkStatusChange(function(e) {
            this.globalData.noNetwork = "none" === e.networkType;
        });
    },
    onShow: function(e) {
        f.default.update(e), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), this.globalData._foreground = !0, this.options = e;
        var t = r.default.getFromApp(e);
        this.globalData.scene = t.scene, this.style = a.default.getStyle(t), h.handle(this, t), 
        r.default.checkOptions(e) && (this._reportAnalytics(e), this._reportLog(e));
    },
    onHide: function() {
        this.globalData._foreground = !1;
    },
    onError: function(e) {
        console.log(e);
    },
    onPageNotFound: function(e) {
        console.log(e);
    },
    _getSystemInfo: function() {
        var e = this;
        o.default.getSystemInfo({
            success: function(t) {
                e.globalData.isIpx = !!t.model.match(/iPhone X/);
            }
        });
    },
    _trackOpen: function(e) {
        var t = this;
        i.default.getUser().then(function(n) {
            d.trackAppOpen({
                curPage: "",
                describ: "wechat_open",
                scene: e.scene
            }, t);
        }).catch(function(e) {
            console.error(e), d.trackAppOpen({
                curPage: "",
                describ: "wechat_open"
            }, t);
        });
    },
    _reportAnalytics: function(e) {
        var t = {
            scene: e.scene || "NO_SCENE"
        };
        e.referrerInfo && (t.appid = e.referrerInfo.appId), e.query && (t.from = e.query.from || "NO_FROM"), 
        setTimeout(function() {
            wx.reportAnalytics("from", t);
        }, 2e3);
    },
    _reportLog: function(e) {
        g.default.logs("APP_ONSHOW", {
            options: JSON.stringify(e)
        });
    },
    getStyle: function() {
        return this.style;
    },
    isForeground: function() {
        return this.globalData._foreground;
    }
});