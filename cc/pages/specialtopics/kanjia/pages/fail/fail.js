function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../../../mp/framework")), e = a(require("../../route")), d = a(require("../../api")), i = require("../../../../../service/analytic"), r = require("../../../../../service/user"), o = getApp();

t.default.Page({
    data: {
        hdId: "",
        goodsId: "",
        reason: null,
        _appId: "",
        _path: ""
    },
    onLoad: function(a) {
        this.setData({
            hdId: a.hdId,
            goodsId: a.goodsId,
            reason: a.reason,
            _appId: a.appId,
            _path: decodeURIComponent(a.path)
        }), i.trackPage({
            curPage: "cut_price_fail",
            describ: "cut_price_fail",
            activity_id: this.data.hdId
        }, o);
    },
    tapToPrize: function() {
        var a = this.data.hdId, t = this.data.goodsId;
        i.trackClick({
            curPage: "cut_price_fail",
            describ: "receive_consolation_prize_cilck",
            activity_id: a
        }, o), d.default.gotit(r.getUserId(), a, t).then(function() {}), e.default.toPath({
            appId: this.data._appId,
            path: this.data._path
        });
    }
});