function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../web/router")), a = e(require("../../mp/framework")), r = require("../../service/constant"), n = require("../../service/bus"), s = require("../../utils/util.js");

a.default.Page({
    data: {
        option: {}
    },
    mergeArrivedBus: function(e, t) {
        var a = r.LINESTATE.BUS_STATE, n = r.LINESTATE.DELAY, s = {}, i = [];
        return t.filter(function(t) {
            return t.order <= e.targetOrder;
        }).forEach(function(e) {
            if (e.isArriving && e.state === a.ARRIVED) {
                var t = s[e.order];
                t ? (e.delay === n.DELAYED && e.delay === t.delay ? t.syncTime = Math.min(t.syncTime, e.syncTime) : t.delay = n.UNDELAYED, 
                ++t.count) : (e.count = 1, s[e.order] = e, i.push(e));
            } else i.push(e);
        }), i;
    },
    makeDisplayBuses: function(e) {
        this.setData({
            Buses: n.makeDisplayBuses(e)
        });
    },
    makeStations: function(e) {
        var t = e.length, a = 0;
        return e.forEach(function(r, n) {
            r.displaySn = r.sn.replace(/[\(|（]/g, "︵").replace(/[\)|）]/g, "︶"), a = r.displaySn.length >= a ? r.displaySn.length : a, 
            r.nsn = n + 1 < t ? e[n + 1].sn : "-1";
        }), this.setData({
            maxStationNameLength: a
        }), e;
    },
    drawTraffic: function() {
        var e = [];
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(t) {
            t.forEach(function(t) {
                e.push({
                    l: (60 * t.tpc.toFixed(2)).toFixed(2) + "px",
                    bgColor: "traffic traffic-level-" + (t.tvl || 0)
                });
            });
        }), this.setData({
            traffics: e
        });
    },
    refresh: function() {
        this.load(this.data.option);
    },
    interval: function() {
        var e = this;
        setInterval(function() {
            e.refresh();
        }, 1e3);
    },
    load: function(e) {
        var t = this;
        e.h5Id = new Date().getTime(), e.targetOrder = e.destOrder, wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3
        }), wx.request({
            url: r.baseUrl + "api/passenger-manager/busUgc/queryShareInfo",
            data: e,
            success: function(e) {
                var a = s.handlerResponse(e.data), r = a.lineInfo;
                0 !== a.status && (r.buses = []);
                var n = r.line, i = r.targetOrder - 1 || 0, o = t.makeStations(r.stations);
                n.targetOrder = r.targetOrder, n.currentStation = o[i], wx.setNavigationBarTitle({
                    title: s.prettyLineName(r.line.name)
                }), t.setData({
                    data: r,
                    line: n,
                    lineState: n.state,
                    shareSate: a.status,
                    arrivedTime: s.dateFilter(a.arrivedTime),
                    currentStation: n.currentStation,
                    lineName: s.prettyLineName(r.line.name)
                }), t.makeBuses(r.buses, n, o), t.drawDisplayStations(o, r), t.drawTraffic(r.roads);
            }
        });
    },
    makeBuses: function(e, t, a) {
        var r = this, s = [];
        if (Array.isArray(e) && e.length) {
            e.reverse(), n.setLine(t), n.setStation(a);
            var i = e.map(function(e) {
                return n.factory(e);
            });
            (s = r.mergeArrivedBus(t, i))[0] && r.setData({
                nearestBusOrder: s[0].order
            });
        }
        r.makeDisplayBuses(s);
    },
    drawDisplayStations: function(e, t) {
        var a = this, r = this;
        e.forEach(function(e) {
            e.numberClass = "station-number fg-6 f-10", e.nameClass = "station-name fg-3 f-16", 
            e.order === t.targetOrder && (e.isCurrentIcon = !e.arrivalNum || e.arrivalNum < 1, 
            e.arrowIcon = !0, e.nameClass = "station-name fg-red f-20", e.numberClass = "station-number fg-red f-10"), 
            e.arrivalNum > 0 && (e.order === r.data.nearestBusOrder ? e.busIconClass = "icon_line_bus_large bus-current" : e.busIconClass = "icon_line_bus_little bus-little-current"), 
            e.onTheWayNum > 0 && (e.order === r.data.nearestBusOrder ? e.busIconClass = "icon_line_bus_large bus-nearest" : e.busIconClass = "icon_line_bus_little bus-coming"), 
            e.arrivalNum > 1 && (e.busCountClass = "current-bus-count f-10 fg-3"), e.onTheWayNum > 1 && (e.busCountClass = "near-bus-count f-10 fg-3"), 
            e.busIconClass && (e.busIconClass.indexOf("icon_line_bus_large") >= 0 ? e.busCountClass += " big-bus-count" : e.busCountClass += " little-bus-count");
        });
        var n = 60 * e.length, s = 60 * t.targetOrder - 30, i = n - s, o = wx.getSystemInfoSync().windowWidth, u = void 0;
        u = i > .5 * o ? Math.round(s - .5 * o) : Math.round(n - o), u = u > 0 ? u : 0;
        var l = 21 * r.data.maxStationNameLength + 210, c = 164 + l;
        this.setData({
            stationsScrollLine: n + "px",
            scrollHeight: l + "px",
            stations: e,
            overScrollBarHeight: c + "px"
        }), setTimeout(function() {
            a.setData({
                leftPosition: u
            });
        }, 50);
    },
    onLoad: function(e) {
        if ("app" !== e.referer) this.setData({
            option: e
        }), this.load(e); else {
            var a = [];
            for (var r in e) a.push(r + "=" + e[r]);
            t.default.open("https://www.chelaile.net.cn/web_active/sp/index.html?" + a.join("&"));
        }
    }
});