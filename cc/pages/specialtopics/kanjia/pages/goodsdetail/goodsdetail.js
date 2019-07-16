function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("../../../../../mp/framework")), t = e(require("../../api")), a = e(require("../../route")), r = require("../../../../../service/analytic"), s = require("../../../../../service/user"), o = getApp();

i.default.Page({
    data: {
        hdId: "",
        goodsId: "",
        isLoadedSuccess: !1,
        usage: [],
        prize: {},
        isWebTarget: !1
    },
    onLoad: function(e) {
        var i = e.hdId, t = e.goodsId;
        if (this.setData({
            hdId: i,
            goodsId: t
        }), "b" === e._type) this._queryConsolationPrize(i, t); else {
            var a = e.bargainStartTime;
            this.setData({
                bargainStartTime: a || ""
            }), this._queryPrize(i, t, a);
        }
    },
    onShareAppMessage: function() {
        r.trackClick({
            curPage: "prize_page",
            describ: "recommend_friend_click",
            prize: this.data.prize.prizeName,
            activity_id: this.data.hdId
        }, o), wx.updateShareMenu({
            withShareTicket: !0
        });
        var e = {
            title: "搞到着了！你也来砍一哈嘛！",
            path: "/pages/specialtopics/kanjia/pages/index/index?hdId=" + this.data.hdId + "&goodsId=" + this.data.goodsId + "&bargainStartTime=" + this.data.bargainStartTime,
            imageUrl: "../../images/share@2x.png"
        };
        return console.log("share", e), e;
    },
    _showPrize: function(e, i, t) {
        var s = t.prizeDesc.split("\n");
        this.setData({
            usage: s,
            prize: t,
            isLoadedSuccess: !0,
            isWebTarget: a.default.isWeb(t.path)
        }), this._reportPrizeGot(e, i), 1 === t.prizeType ? r.trackPage({
            curPage: "prize_page",
            describ: "prize_page",
            prize: t.prizeName,
            activity_id: e
        }, o) : r.trackPage({
            curPage: "sunshine_page",
            describ: "sunshine_page"
        }, o);
    },
    _showPrizeError: function(e) {
        wx.showToast({
            icon: "none",
            title: e.msg,
            duration: 5e3
        });
    },
    _queryPrize: function(e, i, a) {
        var r = this;
        t.default.queryPrize(s.getUserId(), e, i, a).then(function(t) {
            r._showPrize(e, i, t);
        }).catch(this._showPrizeError);
    },
    _queryConsolationPrize: function(e, i) {
        var a = this;
        t.default.queryConsolationPrize(s.getUserId(), e, i).then(function(t) {
            a._showPrize(e, i, t);
        }).catch(this._showPrizeError);
    },
    _reportPrizeGot: function(e, i) {
        this.data.bargainStartTime || t.default.gotit(s.getUserId(), e, i).then(function() {
            console.log("上报领奖状态成功");
        });
    },
    tapToHome: function() {
        r.trackClick({
            curPage: "sunshine_page",
            describ: "more_prize_click"
        }, o), a.default.backToModuleIndex();
    },
    tapReceive: function() {
        var e = this.data.prize, i = this.data.hdId, t = e.sPath;
        1 === e.prizeType ? r.trackClick({
            curPage: "prize_page",
            describ: e.amount ? "prize_view_click" : "prize_use_click",
            prize: e.prizeName,
            activity_id: i
        }, o) : (t = e.sunPath, r.trackClick({
            curPage: "sunshine_page",
            describ: "click_receive"
        }, o));
        var s = {
            appId: e.appId,
            path: t
        };
        e.prizeCode ? wx.setClipboardData({
            data: e.prizeCode,
            success: function() {
                wx.showToast({
                    icon: "none",
                    title: "兑换码已复制到剪切板",
                    success: function() {
                        a.default.toPath(s);
                    }
                }), setTimeout(function() {
                    wx.hideToast();
                }, 3e3);
            }
        }) : a.default.toPath(s);
    },
    tapCopyUrl: function(e) {
        var i = this.data.prize.path;
        wx.setClipboardData({
            data: i,
            success: function() {
                wx.showToast({
                    icon: "none",
                    title: "兑奖地址已复制到剪切板"
                });
            }
        });
    }
});