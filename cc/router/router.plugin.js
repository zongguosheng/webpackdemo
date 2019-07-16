Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../mp/url"));

exports.default = {
    toGameEnter: function(r) {
        var t = e.default.toQueryString(r), u = e.default.toUrlString("/added/game/pages/gameEnter/gameEnter", t);
        wx.navigateTo({
            url: u
        });
    },
    toShareJourney: function(r) {
        var t = e.default.toQueryString(r), u = e.default.toUrlString("/added/shareJourney/journey/journey", t);
        wx.navigateTo({
            url: u
        });
    }
};