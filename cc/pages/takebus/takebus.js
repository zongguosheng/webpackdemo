var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), a = require("../../service/bus"), t = require("../../service/user"), r = require("../../service/constant"), i = require("../../service/city"), s = require("../../service/analytic"), n = require("../../utils/util.js"), c = getApp();

e.default.Page({
    data: {
        lineName: "",
        stations: [],
        selectStation: "选择你的下车站",
        active: !1,
        index: 0
    },
    onShareAppMessage: function(e) {
        if ("button" === e.from) {
            s.track("WECHAT_MP_CLICK", {
                curPage: "lineDetail",
                describ: "friends_list"
            }, c);
            var a = this.data.params;
            a.destOrder = a.destOrder ? a.destOrder : this.data.destOrder + 1, a.shareId = this.data.shareId;
            var t = [];
            for (var r in a) t.push(r + "=" + a[r]);
            return {
                title: "还有" + this.data.time + "到站，准备好迎接我",
                imageUrl: "https://image3.chelaile.net.cn/d46e667c105b4d2585caf03e06b81aa8",
                path: "pages/ugc/ugc?" + t.join("&"),
                success: function() {
                    s.track("WECHAT_MP_CLICK", {
                        curPage: "takebus",
                        describ: "分享成功"
                    }, c), wx.navigateBack();
                },
                fail: function(e) {}
            };
        }
        return {
            title: "车来了 - 实时公交",
            desc: "陪你等，伴你行，精准实时公交查询",
            path: "pages/main/main",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    bindPickerChange: function(e) {
        var a = this, t = this.data.params;
        t.destOrder = Number(e.detail.value) + this.data.destOrder + 1, wx.pro.request({
            url: r.baseUrl + "api/passenger-manager/busUgc/createShare",
            data: t
        }).then(function(t) {
            var r = JSON.parse(t.replace(/(^\*\*YGKJ)|(YGKJ##$)/g, "")).jsonr, i = r.data;
            "00" === r.status ? a.setData({
                index: Number(e.detail.value),
                selectStation: a.data.stations[Number(e.detail.value)],
                active: !0,
                time: n.formatTime(i.arriveTime),
                shareId: i.shareId
            }) : (console.log("分享失败", r), wx.showToast({
                title: "分享失败,请刷新后重试~",
                icon: "none"
            }));
        });
    },
    makeSharePath: function(e) {
        this.setData({
            params: {
                lineId: a.line.lineId,
                lineNo: a.line.lineNo,
                direction: a.line.direction,
                shareH5Id: t.userId,
                nickName: "车来了用户",
                avatarUrl: "https://www.chelaile.net.cn/img/logo2.png",
                cityId: i.cityId,
                busNo: e.busId
            }
        });
    },
    onLoad: function(e) {
        var t = a.stations.map(function(e) {
            return e.sn;
        }), r = t.length;
        t = t.slice(Number(e.targetOrder), r), this.setData({
            lineName: n.prettyLineName(a.line.name),
            stations: t,
            destOrder: Number(e.targetOrder)
        }), this.makeSharePath(e);
    }
});