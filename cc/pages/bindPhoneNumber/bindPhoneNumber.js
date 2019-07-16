var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), t = require("../../service/user"), a = require("../../service/constant"), s = require("../../utils/util");

e.default.Page({
    data: {
        telephoneNumber: "",
        validateCode: "",
        disabled: !1,
        currentTime: 60,
        yzText: "验证",
        tip: !1
    },
    onLoad: function(e) {
        "payGuide" === e.from && this.setData({
            tip: !0
        });
    },
    getNumberValue: function(e) {
        this.setData({
            telephoneNumber: e.detail.value
        });
    },
    getValidateValue: function(e) {
        this.setData({
            validateCode: e.detail.value
        });
    },
    djsFn: function() {
        var e = this, t = this.data.currentTime, a = setInterval(function() {
            t > 0 ? e.setData({
                yzText: t-- + "s",
                disabled: !0
            }) : (clearInterval(a), e.setData({
                yzText: "重新验证",
                disabled: !1,
                currentTime: 60
            }));
        }, 1e3);
    },
    handleToast: function(e, t, a) {
        return wx.showToast({
            title: e,
            icon: t || "none",
            duration: a || 3e3
        });
    },
    addSign: function(e, t) {
        return s.sign(e, t);
    },
    getValidateCode: function() {
        var e = this, s = /^1[34578]\d{9}$/;
        if (this.data.telephoneNumber) if (s.test(this.data.telephoneNumber)) {
            var n = this.addSign({
                unionId: t.unionId,
                pro_type: 2,
                phone: this.data.telephoneNumber
            }, t.signKey);
            wx.request({
                url: a.baseUrl + "wechat/phoneNumber/sendCode",
                data: n,
                success: function(t) {
                    var a = t.data;
                    console.log(a), "00" === a.status ? e.handleToast("验证码已发送") : "02" !== a.status && "03" !== a.status || e.handleToast("短信发送失败");
                }
            }), this.djsFn();
        } else this.handleToast("手机号码格式错误"); else this.handleToast("请输入手机号");
    },
    submitInfo: function() {
        var e = this, s = /^1[34578]\d{9}$/, n = this.data.telephoneNumber;
        n ? s.test(n) ? this.data.validateCode ? wx.pro.request({
            toast: {},
            url: a.baseUrl + "wechat/phoneNumber/bind",
            data: {
                pro_type: 2,
                code: this.data.validateCode
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(a) {
            console.log(a), "00" === a.status ? (e.handleToast("绑定成功", "success"), t.set({
                accountId: a.data.accountId,
                phoneNumber: n.slice(0, 3) + "****" + n.slice(7, n.length)
            }), wx.navigateBack()) : "02" === a.status ? e.handleToast("验证码错误") : "04" === a.status ? e.data.tip ? e.handleToast("该账号已在车来了APP登录并绑定其他微信，请下载车来了APP使用乘车码") : e.handleToast("手机号码已经绑定其它微信") : e.handleToast("绑定失败");
        }) : this.handleToast("请输入验证码") : this.handleToast("手机号码格式错误") : this.handleToast("请输入手机号");
    }
});