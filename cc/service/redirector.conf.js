function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.shareJourneyHandler = exports.PaySharePageHandler = exports.OnlineBoardScanPageHandler = exports.TravelShareHandler = exports.RemindPushHandler = exports.WebHandlers = exports.AppHandlers = exports.DefaultHandler = exports.TO = exports.FROM = void 0;

var r = require("./redirector.const"), t = e(require("../router/router.core")), n = e(require("../router/router.plugin")), a = (e(require("./redirector.util")), 
require("./city")), o = require("./analytic"), d = {
    handle: function() {
        return console.log("no redirector"), !1;
    }
}, l = {
    handle: function(e, n, a, o) {
        return a.from === r.FROM.PUSH_REMIND && (a.to === r.TO.LINE_DETAIL && (t.default.toLineDetail({
            lineId: o.lineId,
            lineName: o.lineName,
            targetOrder: o.targetOrder
        }, {
            cityId: o.cityId,
            cityType: o.supportGreyVersion
        }), !0));
    }
}, i = {
    handle: function(e, r, t, n) {
        return !1;
    }
}, u = {
    handle: function(e, n, a, o) {
        return a.to === r.TO.LINE_BOARD && (t.default.toOnlineBoard(o), !0);
    }
}, s = {
    handle: function(e, n, o, d) {
        return !(o.to !== r.TO.PAY || !a.getCityId()) && (t.default.toPay(d), !0);
    }
}, c = {
    handle: function(e, t, a, o) {
        return a.from === r.FROM.SHARE && (a.to === r.TO.SHARE_JOURNEY && (n.default.toShareJourney(o), 
        !0));
    }
}, p = [ {
    track: function(e, r) {
        o.trackPage({
            curPage: "home_page",
            describ: "home_page",
            plug: 0,
            plug_id: r
        }, e);
    },
    handle: function(e, n, a, o, d, l) {
        return a === r.FROM.PLUGIN && (this.track(e, d.vendor), o === r.TO.LINE_DETAIL ? (t.default.toLineDetail({
            lineId: d.lineId,
            lineName: d.lineName,
            targetOrder: d.targetOrder
        }, {
            cityId: d.cityId
        }), !0) : o === r.TO.STOP_DETAIL && (t.default.toStationDetail({
            sn: d.sn,
            sId: d.sId
        }, {
            cityId: d.cityId
        }), !0));
    }
} ], O = [ {
    handle: function(e, n, a, o) {
        return a.to === r.TO.WEB && (t.default.openWeb({
            src: decodeURIComponent(o.web_src),
            title: o.web_title
        }), !0);
    }
} ];

exports.FROM = r.FROM, exports.TO = r.TO, exports.DefaultHandler = d, exports.AppHandlers = p, 
exports.WebHandlers = O, exports.RemindPushHandler = l, exports.TravelShareHandler = i, 
exports.OnlineBoardScanPageHandler = u, exports.PaySharePageHandler = s, exports.shareJourneyHandler = c;