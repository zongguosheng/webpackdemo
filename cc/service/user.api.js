Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../service/constant").baseUrl + "wechat";

exports.default = {
    getOpenId: function(t) {
        return wx.pro.request({
            url: e + "/getOpenId?pro_type=2&grant_type=authorization_code&js_code=" + t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            }
        });
    },
    mpGetUserInfo: function(t, r, o) {
        return wx.pro.request({
            url: e + "/mpGetUserInfo",
            data: {
                grant_type: "authorization_code",
                encrypted_data: t.encryptedData,
                iv: t.iv,
                pro_type: 2,
                js_code: r,
                ns: o
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            }
        });
    },
    getPhoneNumber: function(t, r, o) {
        return wx.pro.request({
            toast: {
                duration: 4e3
            },
            url: e + "/getPhoneNumber",
            data: {
                grant_type: "authorization_code",
                encrypted_data: t.encryptedData,
                iv: t.iv,
                pro_type: 2,
                js_code: r,
                ns: o
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            }
        });
    },
    getIsNew: function() {
        return wx.pro.request({
            url: "https://api.chelaile.net.cn/adpub/adv!getIsNew.action"
        });
    }
};