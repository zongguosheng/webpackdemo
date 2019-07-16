function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../../../mp/framework")), a = e(require("../../api")), d = e(require("../../route")), r = require("../../../../../service/user");

t.default.Page({
    data: {
        _hdId: "",
        prizes: []
    },
    onLoad: function(e) {
        var t = this;
        this.setData({
            _hdId: e.hdId
        }), a.default.getHistory(this.data._hdId, r.getUserId()).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            t.setData({
                prizes: e
            });
        });
    },
    onShow: function() {},
    tapReceive: function(e) {
        var t = e.detail.prize;
        t.gotIt ? d.default.toPrize(this.data._hdId, t.goodsId, t.bargainStartTime) : d.default.toPrize(this.data._hdId, t.goodsId);
    }
});