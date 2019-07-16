function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var i = Object.assign || function(a) {
    for (var i = 1; i < arguments.length; i++) {
        var t = arguments[i];
        for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
    }
    return a;
}, t = a(require("../../api")), e = a(require("../../route")), s = a(require("../../../../../mp/framework")), r = require("../../../../../service/user"), d = require("../../../../../service/analytic"), o = getApp();

s.default.Page({
    data: {
        userId: "",
        hdId: "",
        goodsId: "",
        authDialog: !1,
        showHelpFriends: !1,
        vShowMyBargain: !1,
        vShowShareBargain: !1,
        isLoadedSuccess: !1,
        mLoadError: !1,
        isFriend: !1,
        isZHY: !1,
        groupId: "",
        options: {},
        activity: {},
        process: {},
        endTime: 0,
        shareData: {},
        isShareBargain: !1,
        hasBeenShareBargain: !1
    },
    onLoad: function(a) {
        this.setData({
            options: a,
            hdId: a.hdId,
            goodsId: a.goodsId
        });
    },
    onShow: function() {
        var a = this;
        r.get().then(function() {
            d.login(r.userId, o), a.setData({
                isFriend: a.options.fUserId !== r.userId,
                userId: r.getUserId()
            }), a.loadShareData(), r.info.nickName ? a._loadNormalProgress() : a.showAuthDialog();
        }).catch(function() {
            a.showAuthDialog();
        });
    },
    onShareAppMessage: function() {
        wx.updateShareMenu({
            withShareTicket: !0
        });
        var a = this.data.hdId, i = this.data.goodsId, t = this.data.activity, e = this.data.shareData, s = {
            title: e.doc || "竟然可以0元吃鸭脖，吓得我的冰阔落都掉了！",
            path: "pages/specialtopics/kanjia/pages/index/index?target=live&hdId=" + a + "&goodsId=" + i + "&fUserId=" + r.userId,
            imageUrl: e.pic || "../../images/share@2x.png"
        };
        return this.data.isFriend || this.data.process.success || (s.path = "pages/specialtopics/kanjia/pages/index/index?target=live&fUserId=" + r.userId + "&hdId=" + a + "&goodsId=" + i + "&shareId=" + (e.id || "")), 
        this.data.isFriend && t.partIn && !this.data.process.success && (s.path = "pages/specialtopics/kanjia/pages/index/index?target=live&fUserId=" + this.data.options.fUserId + "&hdId=" + a + "&goodsId=" + i + "&shareId=" + (e.id || "")), 
        console.log("share", s), s;
    },
    _loadProgress: function() {
        var a = this, i = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        wx.showToast({
            icon: "loading",
            duration: 1e4
        });
        var s = this.data.options, d = {
            hdId: this.data.hdId,
            goodsId: this.data.goodsId,
            userId: r.getUserId(),
            fUserId: s.fUserId,
            groupId: this.data.groupId || s.groupId,
            shareBargainCount: i ? 1 : 0
        };
        t.default.process(d).then(function(t) {
            wx.hideToast(), a._handleProcess(t, i);
        }).catch(function(i) {
            console.log(i), a.data.isLoadedSuccess || (a.setData({
                mLoadError: !0
            }), setTimeout(function() {
                e.default.backToModuleIndex();
            }, 3e3));
        });
    },
    _loadNormalProgress: function() {
        this._loadProgress();
    },
    _loadShareProgress: function() {
        this.data.hasBeenShareBargain || this._loadProgress(!0);
    },
    _getUserBargain: function(a) {
        return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).filter(function(i) {
            return i.openId === a;
        });
    },
    _handleProcess: function(a, i) {
        var t = this, s = a.process, c = a.goods, h = this.data.isFriend;
        if (!s.finish || s.success) {
            var n = this._getUserBargain(r.userId, s.details).length > 1;
            if (h && s.details) {
                var u = r.getUserId();
                s.details.sort(function(a, i) {
                    return a.openId === u ? -1 : i.openId === u ? 1 : 0;
                }), s.details = s.details.slice(0, 4);
            }
            this.setData({
                activity: c,
                process: s,
                isZHY: "1" === c.merchantId,
                isLoadedSuccess: !0,
                isShareBargain: i,
                hasBeenShareBargain: n
            }), setTimeout(function() {
                t.setData({
                    isShowTimecount: !0
                });
            }, 0), a.amount && (h ? this.showFriendDialog() : n ? this.showShareDialog() : this.showMyDialog(), 
            setTimeout(function() {
                t.tapCloseDialog();
            }, 8e3), d.trackPage({
                curPage: "cut_price_help",
                describ: "bargain_popup_show",
                prize: this.data.activity.prizeName,
                activity_id: this.data.activity.activityId
            }, o)), d.trackPage({
                curPage: this.data.isFriend ? "cut_price_help" : this.data.process.success ? "cut_price_success" : "cut_price_process_page",
                describ: this.data.isFriend ? "cut_price_help" : this.data.process.success ? "cut_price_success" : "cut_price_process_page",
                prize: this.data.activity.prizeName,
                activity_id: this.data.hdId,
                qun_id: this.data.options.groupId || "",
                active_number: this.data.options.shareId || ""
            }, o);
        } else h ? wx.navigateBack({
            delta: 1
        }) : e.default.toFail(this.data.hdId, c.goodsId, c.appId, c.fPage, s.reason);
    },
    showAuthDialog: function() {
        this.setData({
            authDialog: !0,
            showHelpFriends: !1,
            vShowMyBargain: !1,
            vShowShareBargain: !1
        }), d.trackClick({
            curPage: "砍价详情页",
            describ: "authorization_popup_show",
            prize: this.data.activity.prizeName || "",
            activity_id: this.data.hdId
        }, o);
    },
    showMyDialog: function() {
        this.setData({
            authDialog: !1,
            showHelpFriends: !1,
            vShowMyBargain: !0,
            vShowShareBargain: !1
        });
    },
    showShareDialog: function() {
        this.setData({
            authDialog: !1,
            showHelpFriends: !1,
            vShowMyBargain: !1,
            vShowShareBargain: !0
        });
    },
    showFriendDialog: function() {
        this.setData({
            authDialog: !1,
            showHelpFriends: !0,
            vShowMyBargain: !1,
            vShowShareBargain: !1
        });
    },
    tapCloseDialog: function() {
        this.setData({
            authDialog: !1,
            showHelpFriends: !1,
            vShowMyBargain: !1,
            vShowShareBargain: !1
        });
    },
    tapWxCircle: function() {
        d.trackClick({
            curPage: "cut_price_process_page",
            describ: "speed_cut"
        }, o), e.default.toShare(this.data.hdId, this.data.goodsId, r.getUserId());
    },
    tapToGot: function() {
        var a = this.data.hdId, i = this.data.activity, t = i.goodsId;
        e.default.redirectPrize(a, t), d.trackClick({
            curPage: "cut_price_success",
            describ: "receive_click",
            prize: i.prizeName,
            activity_id: i.activityId
        }, o);
    },
    goIndex: function() {
        e.default.backToModuleIndex();
    },
    bottomFreeGet: function() {
        d.trackClick({
            curPage: "cut_price_help",
            describ: "participate_click",
            prize: this.data.activity.prizeName,
            activity_id: this.data.hdId
        }, o), this.goIndex();
    },
    bottomHelpFriendsClick: function() {
        d.trackClick({
            curPage: "cut_price_help",
            describ: "help_friends_click",
            prize: this.data.activity.prizeName,
            activity_id: this.data.hdId
        }, o);
    },
    helpFriendsDialogClick: function() {
        d.trackClick({
            curPage: "cut_price_help",
            describ: "participate_popup_click",
            prize: this.data.activity.prizeName,
            activity_id: this.data.hdId
        }, o), this.goIndex();
    },
    viewMyBargain: function() {
        d.trackClick({
            curPage: "cut_price_help",
            describ: "view_click",
            prize: this.data.activity.prizeName,
            activity_id: this.data.hdId
        }, o), this.goIndex();
    },
    tapToShop: function() {
        var a = this.data.activity;
        d.trackClick({
            curPage: "cut_price_process_page",
            describ: "shop_enter",
            prize: a.prizeName,
            activity_id: this.data.hdId
        }, o), e.default.toPath({
            forceWeb: !0,
            appId: a.appId,
            path: a.page
        });
    },
    _triggerShare: function(a, t) {
        this._loadShareProgress(), d.trackClick(i({}, t, {
            prize: a.prizeName,
            activity_id: this.data.hdId
        }), o);
    },
    tapPopupShare: function() {
        this._triggerShare(this.data.activity, {
            curPage: "cut_price_process_page",
            describ: "invite_friends_bargain_popup_click"
        });
    },
    tapPageShare: function() {
        this._triggerShare(this.data.activity, {
            curPage: "cut_price_process_page",
            describ: "invite_friends_bargain_page_click"
        });
    },
    goToBus: function() {
        e.default.toHome();
    },
    loadShareData: function() {
        var a = this;
        t.default.share(r.getUserId(), this.data.hdId, this.data.goodsId).then(function(i) {
            a.setData({
                shareData: i
            });
        });
    },
    bindGetUserInfo: function(a) {
        var i = this;
        d.trackClick({
            curPage: "砍价详情页",
            describ: "authorization_button_click",
            prize: this.data.activity.prizeName || "",
            activity_id: this.data.hdId
        }, o), r.bindGetUserInfo(a).then(function() {
            i.setData({
                authDialog: !1
            }), i._loadNormalProgress(), d.trackClick({
                curPage: "砍价详情页",
                describ: "authorized_success",
                prize: i.data.activity.prizeName || "",
                activity_id: i.data.hdId
            }, o);
        });
    },
    onCountdownEnd: function() {
        this._loadNormalProgress();
    }
});