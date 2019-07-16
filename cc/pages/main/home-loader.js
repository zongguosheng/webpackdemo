function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./home-api")), a = e(require("../../application/favorite/index")), o = e(require("../../application/history/QueryHistory")), r = {
    RECOMMEND: 1,
    FAV: 2,
    HISTORY: 3
}, n = {
    name: "推荐",
    type: "recommend"
}, u = {
    name: "历史",
    type: "history"
};

exports.default = {
    getTags: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = a.default.updateTags(e.favTagList);
        return t.unshift(n), t.push(u), t;
    },
    loadRecommend: function() {
        return t.default.getHomePageInfo({
            act: 1,
            type: r.RECOMMEND
        });
    },
    loadFavorite: function(e) {
        return a.default.getByTag(e);
    },
    loadHistory: function(e) {
        var a = [];
        return o.default.getItemsSync(e).forEach(function(e) {
            a.push(e.loadKey);
        }), t.default.getHomePageInfo({
            act: 1,
            type: r.HISTORY,
            hist: a.join(";")
        });
    },
    RECOMMEND: n,
    HISTORY: u
};