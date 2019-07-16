function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function t(t) {
    var n = new Date(t);
    return [ n.getHours(), n.getMinutes() ].map(e).join(":");
}

function n(e) {
    return e < 3600 && e >= 60 ? function() {
        this.time = Math.floor(e / 60), this.unit = "分";
    } : e >= 3600 ? function() {
        this.time = Math.floor(e / 60), this.unit = "分";
    } : function() {
        this.time = e > 30 ? "1" : 30, this.unit = e > 30 ? "分" : "秒";
    };
}

function i(e) {
    return e && /[0-9]/.test(e[e.length - 1]) && (e += "路"), e;
}

function r(e, t) {
    t ? e.$$hashKey = t : delete e.$$hashKey;
}

function a(e) {
    var i = {
        emTime: {
            time: "--",
            unit: "",
            rType: ""
        },
        secondTime: {},
        thirdTime: {}
    };
    return e.forEach(function(r, a) {
        var o = void 0;
        switch (r.value) {
          case c.LINESTATE.STN_STATE.ARRIVED:
            o = function() {
                this.time = "已到站";
            };
            break;

          default:
            o = r.travelTime >= 3600 ? function() {
                this.time = t(r.arrivalTime);
            } : n(r.travelTime);
        }
        switch (a) {
          case 0:
            e.length < 2 && (i.secondTime.time = "下一班时间"), o.call(i.emTime), i.emTime.rType = r.rType !== c.LINESTATE.RTYPE.HISTORY && "已到站" !== i.emTime.time;
            break;

          case 1:
            o.call(i.secondTime);
            break;

          case 2:
            o.call(i.thirdTime);
        }
    }), i;
}

function o(e) {
    return "string" == typeof e && "%" === e.trim()[0];
}

var u = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
}, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../service/request.util")), c = require("../service/constant"), f = require("./md5");

module.exports = {
    formatTime: function(e) {
        if (e >= 3600) {
            var t = Math.ceil(e % 3600 / 60), n = Math.floor(e / 3600);
            return 60 === t ? n + 1 + "小时" : n + "小时" + t + "分钟";
        }
        if (e >= 60) {
            var i = Math.ceil(e / 60);
            return 60 === i ? "1小时" : i + "分钟";
        }
        return e > 30 ? "1分钟" : "30秒";
    },
    formatFullTime: function(t) {
        var n = t.getFullYear(), i = t.getMonth() + 1, r = t.getDate(), a = t.getHours(), o = t.getMinutes(), u = t.getSeconds();
        return [ n, i, r ].map(e).join("/") + " " + [ a, o, u ].map(e).join(":");
    },
    handlerResponse: l.default.handlerResponse,
    prettyDistance: function(e, t) {
        t = t || "en";
        var n = {
            zh: {
                meter: "米",
                kilo: "千米"
            },
            en: {
                meter: "m",
                kilo: "km"
            }
        }, i = e < 1e3 ? n[t].meter : n[t].kilo;
        return isFinite(e) ? (e = e >= 1e3 ? (e / 1e3).toFixed(e >= 1e4 || e % 1e3 < 60 ? 0 : 1) : e.toFixed(0), 
        {
            distance: Number(e),
            unit: i,
            getDescription: function() {
                return this.distance < 100 && "m" === this.unit ? "<100 m" : this.distance + " " + this.unit;
            }
        }) : {
            distance: e,
            unit: i,
            getDescription: function() {
                return "-";
            }
        };
    },
    prettyLineName: i,
    formatBusTime: n,
    dateFilter: t,
    isDefined: function(e) {
        return void 0 !== e;
    },
    isUndefined: function(e) {
        return void 0 === e;
    },
    isObject: function(e) {
        return null !== e && "object" === (void 0 === e ? "undefined" : s(e));
    },
    extend: function(e) {
        for (var t = e.$$hashKey, n = 1, i = arguments.length; n < i; n++) {
            var a = arguments[n];
            if (a) for (var o = Object.keys(a), u = 0, s = o.length; u < s; u++) {
                var l = o[u];
                e[l] = a[l];
            }
        }
        return r(e, t), e;
    },
    isTomorrow: function(e) {
        var t = new Date();
        return e > new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1).getTime();
    },
    makeDisplayBusCard: a,
    mergeDisplayLines: function(e, t) {
        var n = {}, r = [];
        return e.forEach(function(e, o) {
            switch (e.source = t, e.line.displayName = i(e.line.name), e.line.state) {
              case c.LINESTATE.STATE.NORMAL:
                e.line.state_NORMAL = !0;
                break;

              case c.LINESTATE.STATE.WAITING:
                e.line.displayState = "等待发车";
                break;

              case c.LINESTATE.STATE.LOST:
                e.line.displayState = "暂无信息";
                break;

              case c.LINESTATE.STATE.OFF_DUTY:
                e.line.displayState = "末班已过";
                break;

              case c.LINESTATE.STATE.NOT_START:
                e.line.displayState = "首班未发";
                break;

              case c.LINESTATE.STATE.NO_DATA:
                e.line.displayState = "尚未开通";
                break;

              case c.LINESTATE.STATE.LINE_CHANGE:
                e.line.displayState = "线路已变更";
                break;

              case c.LINESTATE.STATE.STATION_CHANGE:
                e.line.displayState = "站点已变更";
            }
            e.displayBus = a(e.stnStates);
            var u = e.line.lineNo, s = n[u];
            if (void 0 === s) return u && (n[u] = {
                displayLinesPosition: r.length,
                linesPosition: o
            }), r.push(e), !1;
            r[s.displayLinesPosition].reverseDirection = o, e.reverseDirection = s.linesPosition;
        }), r;
    },
    pickFavItem: function(e) {
        return [ e.lineId, e.currentStation.sn, e.currentStation.nsn || -1, 1 ].join(",");
    },
    getWidgetParam: function(e, t) {
        if ("query" === e) return "wxSearchQuery" in t ? decodeURIComponent(t.wxSearchQuery) : t.query;
        if (t[e]) return "widgetData" === e || "wxParamData" === e || "data" === e ? o(t[e]) ? JSON.parse(decodeURIComponent(t[e])) : JSON.parse(t[e]) : void 0;
    },
    formatPrice: function(e) {
        return e /= 100;
    },
    debounce: function(e, t) {
        var n = null;
        return function() {
            var i = this, r = arguments;
            n && clearTimeout(n), n = setTimeout(function() {
                e.apply(i, r);
            }, t);
        };
    },
    throttle: function(e, t, n) {
        var i = void 0, r = void 0, a = void 0, o = void 0, u = 0;
        n || (n = {});
        var s = function() {
            u = !1 === n.leading ? 0 : new Date().getTime(), i = null, o = e.apply(r, a), i || (r = a = null);
        }, l = function() {
            var l = new Date().getTime();
            u || !1 !== n.leading || (u = l);
            var c = t - (l - u);
            return r = this, a = arguments, c <= 0 || c > t ? (i && (clearTimeout(i), i = null), 
            u = l, o = e.apply(r, a), i || (r = a = null)) : i || !1 === n.trailing || (i = setTimeout(s, c)), 
            o;
        };
        return l.cancel = function() {
            clearTimeout(i), u = 0, i = r = a = null;
        }, l;
    },
    getFormId: function() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            detail: {
                formId: ""
            }
        }).detail.formId;
    },
    sign: function(e, t) {
        var n = u({}, e), i = [];
        for (var r in n) "sign" !== r && i.push(r + "=" + n[r]);
        return i.sort(), i.push("key=" + t), n.sign = f.hex_md5(i.join("&")).toUpperCase(), 
        n;
    }
};