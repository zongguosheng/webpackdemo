function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = getCurrentPages(), a = t.find(function(t) {
        return t.route.match("^" + e);
    });
    if (a) {
        var n = t.lastIndexOf(a);
        return wx.navigateBack({
            delta: t.length - n - 1
        }), !0;
    }
    return !1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../mp/url")), n = e(require("../pages/web/router")), i = "/pages/main/main";

exports.default = {
    toLineDetail: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {
            lineId: e.lineId
        };
        e.lineName && (n.lineName = e.lineName), void 0 !== e.targetOrder && (n.targetOrder = e.targetOrder), 
        void 0 !== e.direction && (n.direction = e.direction), Object.assign(n, t);
        var i = a.default.toQueryString(n, !1), o = a.default.toUrlString("/pages/linedetail/linedetail", i);
        wx.navigateTo({
            url: o
        });
    },
    toStationDetail: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        wx.navigateTo({
            url: "/pages/stationdetail/stationdetail?stationId=" + e.sId + "&stationName=" + e.sn + "&cityId=" + (t.cityId || "")
        });
    },
    toSearch: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    toRedPacket: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        wx.navigateTo({
            url: "/added/redPacket/redPacket?activityId=" + e + "&userId=" + t
        });
    },
    toOnlineBoard: function(e) {
        wx.navigateTo({
            url: "/added/onlineBoard/pages/onlineBoard?id=" + e.id + "&cityId=" + e.cityId
        });
    },
    backTo: t,
    backToHome: function() {
        t(i) || wx.redirectTo({
            url: i
        });
    },
    toRimindDownload: function() {
        wx.navigateTo({
            url: "/pages/remind-download/remind-download"
        });
    },
    openWeb: n.default.open,
    toPay: function(e) {
        wx.navigateTo({
            url: "/added/pay/pages/account/account?from=" + e._f_
        });
    }
};