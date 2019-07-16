Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    curPage: "__unknown",
    describ: "__unknown"
};

exports.default = {
    main: {
        curPage: "line-around",
        describ: "homePageDura"
    },
    route_page: {
        curPage: "route_page",
        describ: "route_page"
    },
    mine: {
        curPage: "mine",
        describ: "mine"
    },
    gosearch: {
        curPage: "gosearch",
        describ: "gosearch"
    },
    lineDetail: {
        curPage: "lineDetail",
        describ: "lineDetailDura"
    },
    get: function(r) {
        return this[r] || e;
    }
};