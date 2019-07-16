var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../mp/sys")), r = require("constant"), t = require("city"), n = require("user"), u = t.getCityId(), o = n.info.gender, s = e.default.getSystemInfoSync().platform;

module.exports = {
    getPrompt: function(e) {
        return wx.pro.request({
            url: r.baseOpenUrl + "mp-assist/pager/shown",
            data: {
                cityId: e || u,
                gender: o,
                platform: s
            }
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.error(e);
        });
    }
};