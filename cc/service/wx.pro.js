var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = require("../utils/es6-promise");

wx.pro = {}, [ "navigateTo", "checkSession", "getStorageInfo", "removeStorage", "clearStorage", "getNetworkType", "getSystemInfo", "getLocation", "showModal" ].forEach(function(t) {
    wx.pro[t] = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new o(function(o, n) {
            e.success = function(t) {
                o(t);
            }, e.fail = function(o) {
                console.error("wx." + t + " fail", o), n(o);
            }, wx[t](e);
        });
    };
}), wx.pro.getStorage = function(t) {
    return new o(function(o, e) {
        wx.getStorage({
            key: t,
            success: function(t) {
                o(t.data);
            },
            fail: function() {
                o();
            }
        });
    });
}, wx.pro.setStorage = function(t, e) {
    return new o(function(o, n) {
        wx.setStorage({
            key: t,
            data: e,
            success: function(t) {
                o(e);
            },
            fail: function(t) {
                n(t);
            }
        });
    });
}, wx.pro.getStorageSync = function(o) {
    var e = wx.getStorageSync(o);
    if ("string" == typeof e) try {
        var n = JSON.parse(e);
        if (n && "object" === (void 0 === n ? "undefined" : t(n))) return n;
    } catch (t) {
        return e;
    }
    return e;
}, wx.pro.setStorageSync = function(t, o) {
    wx.setStorageSync(t, JSON.stringify(o));
};