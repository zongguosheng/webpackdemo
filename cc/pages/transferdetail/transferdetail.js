function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../router/router.core")), r = e(require("../../mp/framework")), t = require("../../service/transfer"), i = require("../../utils/util"), n = require("../../service/city");

r.default.Page({
    data: {
        segments: [],
        depart: [],
        arrow: "up"
    },
    showBusList: function() {
        this.setData({
            arrow: "up" === this.data.arrow ? "down" : "up"
        });
    },
    goLineDetail: function(e) {
        var r = e.currentTarget.dataset.bus;
        r.lineId && a.default.toLineDetail({
            lineId: r.lineId,
            lineName: r.name,
            direction: r.direction || 0,
            targetOrder: r.departure_stop.order
        }, {
            cityId: n.getCityId()
        });
    },
    makeDisplay: function(e) {
        var a = e.map(function(e) {
            var a = {
                walking: {
                    sameTransfer: !1
                }
            };
            if (e.walking && e.walking.distance ? (a.walking.distance = t.formatDistance(e.walking.distance), 
            a.walking.duration = i.formatTime(e.walking.duration)) : a.walking.sameTransfer = !0, 
            e.bus.buslines) {
                var r = e.bus.buslines[0];
                "地铁线路" === r.type ? (a.subway = r, a.subway.entrance = e.entrance, a.subway.exit = e.exit, 
                a.subway.via_num = Number(r.via_num), a.subway.via_num = Number(r.via_num), a.subway.subway_info && (a.subway.subway_info.interval = i.formatTime(a.subway.subway_info.interval)), 
                a.subway.entrance && (a.subway.entrance.name = t.formatEntrance(a.subway.entrance.name)), 
                a.subway.exit && (a.subway.exit.name = t.formatExit(a.subway.exit.name))) : (a.bus = r, 
                a.bus.via_num = Number(r.via_num));
            }
            return a;
        });
        this.setData({
            segments: a,
            depart: t.depart,
            arrive: t.arrive
        });
    },
    onLoad: function() {
        this.makeDisplay(t.segments);
    }
});