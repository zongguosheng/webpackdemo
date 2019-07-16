function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../../mp/framework")), a = t(require("../../api")), i = t(require("../../route")), o = t(require("../../query")), d = require("../../../../../service/user"), n = require("../../../../../service/analytic"), s = getApp(), r = [ "邀请好友一起砍价，砍到指定金额即可获得奖品，数量有限，先到先得", "每次砍价金额随机，参与好友越多越容易成功", "每个用户每天最多可以帮助3个好友砍价", "对于同一个用户发起的同一个砍价，只能帮助砍价一次", "若被系统判定为异常用户操作，车来了有权取消其砍价资格", "车来了可在法律法规允许范围内对活动规则解释", "邀请好友一起砍价，砍到指定金额即可获得奖品，数量有限，先到先得" ];

e.default.Page({
    data: {
        vShowRule: !1,
        activities: [],
        groupId: "",
        hdId: "",
        rules: r,
        bannerImg: ""
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            options: t
        });
        var n = t.scene, s = t.mbType, r = t.target;
        if (n) a.default.decode(d.getUserId(), n).then(function(t) {
            var a = o.default.fromQuery(t), d = a.hdId;
            e.setData({
                hdId: d
            }), e._loadPage(), a.goodsId && i.default.toProgress(d, a.goodsId, a.userId);
        }); else if (s) {
            var u = t.activityId, c = t.to;
            this.setData({
                hdId: u
            }), "coupon" === c ? i.default.toConsolationPrize(u, t.goodsId) : "live" === c && this._getGroupId(t).then(function() {
                i.default.toProgress(u, t.goodsId, t.fUserId, e.data.groupId, t.shareId);
            });
        } else if (r) {
            var h = t.hdId;
            this.setData({
                hdId: h
            }), "live" === r && this._getGroupId(t).then(function() {
                i.default.toProgress(h, t.goodsId, t.fUserId, e.data.groupId, t.shareId);
            }).catch(function(t) {
                console.log(t);
            });
        } else {
            var g = t.hdId;
            this.setData({
                hdId: g
            });
        }
    },
    onShow: function() {
        var t = this;
        d.get().then(function() {
            t._loadPage(), n.login(d.userId, s), n.trackPage({
                curPage: "cut_price_page",
                describ: "cut_price_page",
                app_userid: t.data.options.udid || ""
            }, s);
        });
    },
    onShareAppMessage: function() {
        wx.updateShareMenu({
            withShareTicket: !0
        });
        var t = {
            title: "搞到着了！你也来砍一哈嘛！",
            path: "/pages/specialtopics/kanjia/pages/index/index?hdId=" + this.data.hdId,
            imageUrl: "../../images/share@2x.png"
        };
        return console.log("onShareAppMessage", t), t;
    },
    _loadPage: function() {
        this.data.hdId && (this._loadActivities(), this._loadConfig());
    },
    _getGroupId: function(t) {
        var e = this;
        return new Promise(function(i, o) {
            t.shareTicket ? wx.getShareInfo({
                shareTicket: t.shareTicket,
                success: function(t) {
                    a.default.getOpenGid(t).then(function(t) {
                        e.setData({
                            groupId: t
                        }), i();
                    });
                },
                fail: function() {
                    i();
                }
            }) : i();
        });
    },
    _loadConfig: function() {
        var t = this;
        a.default.getConfig(this.data.hdId).then(function(e) {
            t.setData({
                bannerImg: e.bannerImg,
                rules: [ e.useRule ]
            });
        });
    },
    _loadActivities: function() {
        var t = this;
        wx.showToast({
            icon: "loading",
            duration: 1e4
        }), a.default.activities(d.userId, this.data.hdId).then(function(e) {
            t.setData({
                activities: e
            }), wx.hideToast();
        }).catch(function(t) {
            wx.showToast({
                icon: "none",
                title: t.msg,
                duration: 5e3
            });
        });
    },
    tapShowRule: function() {
        this.setData({
            vShowRule: !0
        });
    },
    tapCloseRule: function() {
        this.setData({
            vShowRule: !1
        });
    },
    _canJump: function(t) {
        return t.prizeSurplus > 0 || t.success && t.partIn;
    },
    tapActivityCard: function(t) {
        var e = this, a = t.currentTarget.dataset.item;
        this._canJump(a) && (wx.showLoading({
            title: "Loading",
            mask: !0
        }), d.bindGetUserInfo(t).then(function() {
            wx.hideLoading(), i.default.toProgress(e.data.hdId, a.goodsId, d.getUserId(), e.data.groupId);
        }).catch(function() {
            wx.hideLoading();
        }), n.trackClick({
            curPage: "cut_price_page",
            describ: "prize_click",
            prize: a.prizeName || "",
            activity_id: a.activityId
        }, s));
    },
    tapMine: function() {
        n.trackClick({
            curPage: "cut_price_page",
            describ: "cut_gain"
        }, s), i.default.toMine(this.data.hdId);
    },
    onCountdownEnd: function() {
        this._loadActivities();
    }
});