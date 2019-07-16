var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./user.api")), n = require("../utils/es6-promise"), t = require("../service/constant"), i = {
    userId: "",
    unionId: "",
    info: {
        openid: "",
        unionid: "",
        userId: "",
        unionId: "",
        phoneNumber: "",
        nickName: "",
        avatarUrl: "",
        gender: 0,
        accountId: ""
    },
    signKey: "",
    loginRequestCount: 2,
    newUserRequestCount: 1,
    isNewUser: 1,
    isNew: function() {
        return 1 === this.isNewUser;
    },
    getUserId: function() {
        return this.userId;
    },
    valid: function() {
        return !!this.userId && wx.getStorageSync("version") === t.version;
    },
    validUnionId: function() {
        return !!this.unionId;
    },
    set: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        for (var n in e) this.info[n] = e[n];
        this.userId = this.info.userId || this.info.openid || "bower_" + Date.now(), this.unionId = this.info.unionid || this.info.unionId || "", 
        this.info.phoneNumber || this.unionId || this.info.clearTime || (this.info.nickName = "", 
        this.info.avatarUrl = "", this.info.clearTime = new Date().getTime()), wx.pro.setStorageSync("userInfo", this.info);
    },
    validSignKeyTime: function(e) {
        return new Date().getTime() - parseInt(e) < 24192e5;
    },
    getSignKey: function() {
        var e = wx.pro.getStorageSync("signKey") || {};
        e.signKey && this.validSignKeyTime(e.date) ? this.signKey = e.signKey : this.signKey = "";
    },
    setSignKey: function(e) {
        wx.pro.setStorageSync("signKey", {
            signKey: e,
            date: new Date().getTime()
        }), this.signKey = e;
    },
    request: function(n) {
        var i = this, s = function(e) {
            i.set(e), n(e);
        };
        wx.login({
            success: function(o) {
                e.default.getOpenId(o.code).then(function(e) {
                    wx.setStorageSync("version", t.version), i.setSignKey(e.signKey || ""), "00" === e.status ? s(e) : (i.loginRequestCount--, 
                    i.loginRequestCount > -1 ? i.request(n) : s());
                }).catch(function() {
                    s();
                }), console.log(o);
            },
            fail: function() {
                s();
            }
        });
    },
    refresh: function() {
        var e = this;
        return new n(function(n, t) {
            e.request(n);
        });
    },
    get: function() {
        var e = this, t = this;
        return new n(function(n, i) {
            if (t.valid() && 0 !== e.userId.indexOf("bower_")) return console.log("user success"), 
            void n();
            t.request(n);
        });
    },
    bindUserInfoRequest: function(n, t, i, s) {
        var o = this;
        e.default.mpGetUserInfo(n, t, s).then(function(e) {
            console.log("mpGetUserInfo", e);
            var n = e.data;
            "00" === e.status && (o.setSignKey(n.signKey || ""), o.set(n)), i();
        });
    },
    bindGetUserInfo: function(e) {
        var t = this;
        return new n(function(n, i) {
            var s = e.detail;
            s.userInfo ? s.encryptedData ? wx.checkSession({
                success: function() {
                    t.bindUserInfoRequest(s, "", n, 0);
                },
                fail: function() {
                    wx.login({
                        success: function(e) {
                            t.bindUserInfoRequest(s, e.code, n, 1);
                        }
                    });
                }
            }) : n() : i();
        });
    },
    handleToast: function(e, n, t) {
        return wx.showToast({
            title: e,
            icon: n || "none",
            duration: t || 4e3
        });
    },
    phoneNumberRequest: function(n, t, i, s, o, u) {
        var r = this, a = this;
        return e.default.getPhoneNumber(n, t, o).then(function(e) {
            console.log("--------------"), console.log(JSON.stringify(e)), "00" === e.status ? e.data && (r.set({
                phoneNumber: e.data,
                accountId: e.accountId
            }), i()) : "03" === e.status || "04" === e.status ? (a.handleToast("获取手机号码失败"), 
            s(e)) : "05" === e.status && ("QRGuide" === u ? a.handleToast("该账号已在车来了APP登录并绑定其他微信，请下载车来了APP使用乘车码") : a.handleToast("手机号码已经绑定其它微信"), 
            s(e));
        });
    },
    getPhoneNumber: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = this;
        return new n(function(n, s) {
            var o = e.detail;
            o && o.encryptedData ? wx.checkSession({
                success: function() {
                    i.phoneNumberRequest(o, "", n, s, 0, t);
                },
                fail: function() {
                    wx.login({
                        success: function(e) {
                            i.phoneNumberRequest(o, e.code, n, s, 1, t);
                        }
                    });
                }
            }) : s();
        });
    },
    requestIsNewUser: function() {
        var t = this;
        return --this.newUserRequestCount > -1 ? e.default.getIsNew().then(function(e) {
            t.isNewUser = e.jsonr.data;
        }) : new n(function(e) {
            e();
        });
    },
    init: function() {
        var e = wx.pro.getStorageSync("userInfo");
        e.userId && (e.openid = e.userId), e.unionId && (e.unionid = e.unionId), this.set(e), 
        this.getSignKey();
    }
};

i.init(), module.exports = i;