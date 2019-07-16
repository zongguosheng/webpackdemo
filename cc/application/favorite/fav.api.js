function e(e) {
    return e.lineId + "," + e.sn + "," + (e.nsn || "-1") + "," + e.tagName;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("../../utils/util"), a = require("../../service/constant").baseUrl, t = {
    RECOMMEND: 1,
    FAV: 2,
    HISTORY: 3
}, n = {
    MP: 2
}, u = {
    allLines: function() {
        return wx.pro.request({
            url: a + "api/bus/stop!homePageInfo.action",
            data: {
                act: 1,
                type: t.FAV
            }
        }).then(function(e) {
            var a = r.handlerResponse(e);
            return a || Promise.reject("res error");
        });
    },
    addLine: function(r) {
        var t = e(r);
        return wx.pro.request({
            url: a + "api/bus/fav!addFav.action",
            data: {
                favs: t,
                userType: n.MP
            }
        });
    },
    removeLine: function(r) {
        var t = e(r);
        return wx.pro.request({
            url: a + "api/bus/fav!deleteFav.action",
            data: {
                favs: t,
                userType: n.MP
            }
        });
    },
    removeTag: function(e) {
        return wx.pro.request({
            url: a + "api/bus/fav!deleteFavTag.action",
            data: {
                favTagName: e
            }
        });
    }
};

exports.default = u;