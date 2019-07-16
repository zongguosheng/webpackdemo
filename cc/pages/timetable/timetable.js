var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), t = require("../../utils/util"), a = require("../../service/constant"), i = require("../../service/bus");

e.default.Page({
    data: {
        line: {},
        timetable: []
    },
    openTimeTable: function(e) {
        var t = this.data.timetable;
        t.forEach(function(t, a) {
            a === e.currentTarget.dataset.index ? t.open = !t.open : t.open = !1;
        }), this.setData({
            timetable: t
        });
    },
    load: function() {
        var e = this;
        wx.pro.request({
            toast: {},
            url: a.baseUrl + "api/bus/line!depTimeTable.action",
            data: {
                lineId: i.line.lineId
            }
        }).then(function(a) {
            var i = t.handlerResponse(a), r = i.timetable;
            r && r[i.currX] && (r[i.currX].isCurrent = !0, r[i.currX].open = !0), e.setData({
                currY: i.currY,
                timetable: r
            });
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: t.prettyLineName(i.line.name)
        }), this.setData({
            line: i.line
        }), this.load();
    }
});