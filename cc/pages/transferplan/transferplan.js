function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../mp/framework")), a = t(require("../../application/history/TransitHistory")), r = require("../../utils/util.js"), s = require("../../service/customize.plugin"), i = require("../../service/transfer"), n = require("../../service/user"), o = require("../../service/city");

e.default.Page({
    data: {
        templateActive: 0,
        tabs: [ {
            strategy: 0,
            title: "时间短"
        }, {
            strategy: 1,
            title: "步行少"
        }, {
            strategy: 2,
            title: "换乘少"
        }, {
            strategy: 3,
            title: "不坐地铁"
        } ],
        routePlans: {},
        plans: [],
        segments: [],
        noSearchResult: !1,
        showAd: !1
    },
    onLoad: function() {
        this.setData({
            showAd: !n.isNew() && s.isAdEnable()
        }), this.loadData();
    },
    loadData: function() {
        var t = this;
        i.load().then(function(e) {
            var s = r.handlerResponse(e);
            if (s.route) {
                var n = t.dataProcessing(s.route.transits), l = {
                    origin_lng: i.depart.origin_lng,
                    origin_lat: i.depart.origin_lat,
                    dest_lng: i.arrive.dest_lng,
                    dest_lat: i.arrive.dest_lat,
                    gpstype: "gcj",
                    strategy: i.strategy,
                    origin_name: i.depart.name,
                    dest_name: i.arrive.name
                };
                a.default.addItemSync({
                    cityId: o.cityId
                }, l), t.setData({
                    plans: n
                });
            } else t.setData({
                noSearchResult: !0
            });
        });
    },
    dataProcessing: function(t) {
        return t.forEach(function(t) {
            var e = !0;
            t.display = {
                duration: r.formatTime(t.duration),
                distance: i.formatDistance(t.distance),
                walking_distance: i.formatDistance(t.walking_distance),
                cost: i.formatCost(t.cost)
            }, t.segments.forEach(function(a, r) {
                a.bus && a.bus.buslines && (e && (t.firstLine = a.bus.buslines[0], e = !1), t.lastLineIndex = r);
            });
        }), t;
    },
    goPlanDetail: function(t) {
        var e = t.currentTarget.dataset.i;
        i.setSegments(this.data.plans[e].segments), wx.navigateTo({
            url: "../transferdetail/transferdetail"
        });
    },
    planTabClick: function(t) {
        i.setStrategy(t.currentTarget.dataset.index), this.loadData(), this.setData({
            templateActive: t.currentTarget.dataset.index
        });
    }
});