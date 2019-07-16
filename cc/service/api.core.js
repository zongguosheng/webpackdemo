Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "https://web.chelaile.net.cn/wwd/";

exports.default = {
    localeCity: function() {
        return wx.pro.request({
            url: t + "ncitylist"
        }).then(function(t) {
            if ("OK" === t.status) {
                var e = t.data.cityList.filter(function(t) {
                    return 1 === t.isGpsCity;
                }).pop() || {};
                return console.log("targetCity", e), e;
            }
            return Promise.reject({
                status: t.status
            });
        });
    },
    reportFormId: function(t) {
        console.log("formId=" + t), wx.pro.request({
            url: "https://logs.chelaile.net.cn/FORMID_MP",
            data: {
                formId: t
            }
        });
    }
};