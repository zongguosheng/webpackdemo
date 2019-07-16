var e = require("../utils/util.js"), t = require("../service/constant");

module.exports = {
    stations: [],
    line: [],
    notRealTimeCity: !1,
    setLine: function(e) {
        this.notRealTimeCity = !1, this.line = e;
    },
    setStation: function(e) {
        this.stations = e;
    },
    factory: function(e) {
        return this.make(e);
    },
    makeDisplayBuses: function(a) {
        var i = this;
        return a.forEach(function(a, s) {
            a.unique = "unique_" + s, a.display = {
                time: "--",
                timeClass: "fg-blue f-24",
                unit: "",
                unitClass: "fg-blue f-10",
                position: "",
                distance: "",
                rType: "",
                distanceToTarget: "",
                signal: "blue"
            }, a.travels.length && (a.moreBusTime = e.dateFilter(a.travels[0].arrivalTime));
            var r = void 0, n = t.LINESTATE;
            if (a.isArriving) {
                if (a.state === n.BUS_STATE.ARRIVED) return a.display.time = "已到站", a.display.timeClass = "f-18 fg-red", 
                a.display.signal = "", a.count > 1 && (a.display.position = a.count + "辆", a.display.unitClass = "f-10 fg-red"), 
                !1;
                a.display.signal = "red", a.state === n.BUS_STATE.ON_THE_WAY && (a.display.timeClass = "f-24 fg-red", 
                a.display.position = "即将到站", a.display.unitClass = "f-10 fg-red");
            }
            a.isArriving || a.rate || (a.display.position = a.toTargetOrder + "站"), !a.isArriving && a.rate && (i.notRealTimeCity = !0, 
            a.display.signal = "", a.display.position = "准点率 " + Math.round(100 * a.travels[0].pRate) + "%"), 
            a.distanceToTarget && (a.display.distanceToTarget = " / " + (a.distanceToTarget + a.unitText)), 
            a.travels[0] && (a.travels[0].travelTime >= 3600 ? (a.showTomorrow = e.isTomorrow(a.travels[0].arrivalTime), 
            r = function() {
                this.time = e.dateFilter(a.travels[0].arrivalTime);
            }) : (r = e.formatBusTime(a.travels[0].travelTime), a.delay === n.DELAY.DELAYED && (a.showDelay = !0, 
            a.showDelayIcon = !0, a.delayTime = "延迟" + Math.floor(a.syncTime / 60) + "分钟")), 
            r.call(a.display));
        }), a;
    },
    make: function(a) {
        var i = this.line, s = this.stations, r = t.LINESTATE.BUS_STATE, n = t.LINESTATE.RTYPE, l = t.LINESTATE.STATE, o = {};
        if (o.lineState = i.state, null !== a) {
            e.extend(o, a, {
                showDistance: !1,
                lastResponseDelayed: !1,
                showTravelTime: !1
            });
            var T = i.targetOrder, d = o.order;
            if (o.distanceToTarget = 0, d > 0 && d < T && s) {
                o.toTargetOrder = T - d;
                for (var u = d; u < T; u++) o.distanceToTarget += s[u].distanceToSp;
                o.state !== r.ARRIVED && (o.distanceToTarget += o.distanceToSc);
            } else d === T && (o.distanceToTarget += o.distanceToSc, o.isArriving = !0);
            if (o.distanceToTarget) {
                var m = e.prettyDistance(o.distanceToTarget);
                o.distanceToTarget = m.distance, o.unitText = m.unit, o.showDistance = o.distanceToTarget > 0;
            }
            d > 0 && s && (s[d - 1].arrivalNum = s[d - 1].arrivalNum || 0, s[d - 1].onTheWayNum = s[d - 1].onTheWayNum || 0, 
            1 === o.state ? s[d - 1].arrivalNum += 1 : s[d - 1].onTheWayNum += 1), o.rType === n.HISTORY && (o.rate = !0);
            var c = void 0;
            return o.lastTime && (c = (c = o.lastTime) > 600 ? 600 : c, o.lastResponseTime = c), 
            o.lastResponseDelayed = e.isDefined(o.delay) && !o.delay, o.travelTime && ((c = o.travelTime) > 0 && !o.lastResponseDelayed && (c = (c = c < 30 ? 30 : c) > 3600 ? 3600 : c), 
            o.travelTime = parseInt(30 * Math.floor(c / 30))), o.showTravelTime = o.travelTime > 0 && !o.lastResponseDelayed && (o.state === l.ON_THE_WAY || o.state === l.ARRIVING), 
            o;
        }
    }
};