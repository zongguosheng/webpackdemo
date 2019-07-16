var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../mp/framework")), a = require("../../utils/util"), t = require("../../service/constant"), i = require("../../service/bus");

e.default.Page({
    data: {
        line: {}
    },
    onShareAppMessage: function() {
        return {
            title: "快用这个，别再苦等公交了",
            imageUrl: "https://image3.chelaile.net.cn/d46e667c105b4d2585caf03e06b81aa8",
            path: "pages/main/main"
        };
    },
    drawDisplayBus: function(e) {
        var a = [];
        return e.forEach(function(e) {
            a.push(i.make(e));
        }), i.makeDisplayBuses(a);
    },
    load: function() {
        var e = this;
        wx.pro.request({
            toast: {},
            url: t.baseUrl + "/api/bus/line!timeTable.action",
            data: {
                lineId: i.line.lineId,
                targetOrder: i.line.targetOrder
            }
        }).then(function(t) {
            var i = a.handlerResponse(t), r = e.drawDisplayBus(i.buses);
            e.setData({
                buses: r.reverse()
            });
        });
    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: a.prettyLineName(i.line.name)
        }), this.setData({
            line: i.line
        }), this.load();
    }
});