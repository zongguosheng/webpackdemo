Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    report: function(e, t) {
        wx.reportAnalytics(e, t);
    },
    reportDelay: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3;
        setTimeout(function() {
            wx.reportAnalytics(e, t);
        }, r);
    }
};