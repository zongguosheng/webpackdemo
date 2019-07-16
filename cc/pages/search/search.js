function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../mp/framework")), a = e(require("../../service/pv")), i = e(require("../../service/pv.config")), n = e(require("../../router/router.core")), s = e(require("../../application/history/SearchHistory")), r = e(require("../../application/router/index")), o = require("../../utils/util"), l = require("../../service/constant"), c = require("../../service/transfer"), u = require("../../service/user"), d = require("../../service/analytic"), h = require("../../service/gps"), p = require("../../service/city"), f = require("../../service/customize.plugin"), m = getApp(), y = new a.default(m);

t.default.Page({
    data: {
        lines: [],
        stations: [],
        pois: [],
        searchKey: "",
        haveMoreItems: null,
        lineCount: 0,
        stationCount: 0,
        poiCount: 0,
        noSearchResult: !1,
        histories: [],
        showAd: !1
    },
    onShow: function() {
        y.onEnterPage(), this.setData({
            debounceSearch: o.debounce(this.formSubmit, 150),
            histories: s.default.getItemsSync({
                cityId: p.cityId
            }),
            showAd: this._showAd(this.data.lines)
        });
    },
    onHide: function() {
        this._onLeavePage("onHide");
    },
    onUnload: function() {
        this._onLeavePage("onUnload");
    },
    _onLeavePage: function(e) {
        console.log("leave reason:" + e);
        i.default.gosearch;
    },
    _showAd: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return !u.isNew() && f.isAdEnable() && 0 === e.length;
    },
    goStationDetail: function(e) {
        n.default.toStationDetail(e);
    },
    goLineDetail: function(e) {
        n.default.toLineDetail({
            lineId: e.lineId,
            lineName: e.name
        }, {
            cityId: p.getCityId()
        });
    },
    goTransfer: function(e) {
        c.setDepart({
            origin_lng: h.longitude,
            origin_lat: h.latitude,
            name: "我的位置"
        }), c.setArrive({
            dest_lng: e.lng,
            dest_lat: e.lat,
            name: e.sn
        }), wx.navigateTo({
            url: "../transferplan/transferplan"
        });
    },
    redirectPage: function(e) {
        var t = e.currentTarget.dataset, a = this, i = {
            cityId: p.cityId
        };
        "line" === t.type ? (s.default.addItemSync(i, {
            type: "line",
            displayName: a.prettyLineName(t.item.name),
            name: t.item.name,
            lineId: t.item.lineId
        }), this.goLineDetail(t.item)) : "station" === t.type ? (s.default.addItemSync(i, {
            type: "station",
            displayName: t.item.sn,
            sn: t.item.sn,
            sId: t.item.sId
        }), this.goStationDetail(t.item)) : "poi" === t.type && (s.default.addItemSync(i, {
            type: "poi",
            displayName: t.item.sn,
            sn: t.item.sn,
            lng: t.item.lng,
            lat: t.item.lat
        }), this.goTransfer(t.item));
    },
    back: function() {
        wx.navigateBack();
    },
    prettyLineName: function(e) {
        return e && /[0-9]/.test(e[e.length - 1]) && (e += "路"), e;
    },
    moreLines: function() {
        var e = this;
        wx.pro.request({
            url: l.baseUrl + "api/basesearch/client/clientSearchList.action",
            data: {
                key: e.data.searchKey,
                type: 1
            },
            header: {
                Accept: "text/plan"
            }
        }).then(function(t) {
            var a = o.handlerResponse(t), i = [];
            a.lines && (i = a.lines.slice(0, 50)), i.forEach(function(t) {
                t.displayName = e.prettyLineName(t.name);
            }), e.setData({
                lines: i,
                haveMoreItems: !1,
                stations: [],
                pois: []
            });
        });
    },
    moreStations: function() {
        var e = this;
        wx.pro.request({
            url: l.baseUrl + "api/basesearch/client/clientSearchList.action",
            data: {
                key: e.data.searchKey,
                type: 2
            },
            header: {
                Accept: "text/plan"
            }
        }).then(function(t) {
            var a = o.handlerResponse(t), i = [];
            a.stations && (i = a.stations.slice(0, 50)), e.setData({
                lines: [],
                pois: [],
                haveMoreItems: !1,
                stations: i
            });
        });
    },
    morePois: function() {
        var e = this;
        wx.pro.request({
            url: l.baseUrl + "api/basesearch/client/clientSearchList.action",
            data: {
                key: e.data.searchKey,
                type: 3
            },
            header: {
                Accept: "text/plan"
            }
        }).then(function(t) {
            var a = o.handlerResponse(t), i = [];
            a.pois && (i = a.pois.slice(0, 50)), e.setData({
                lines: [],
                stations: [],
                haveMoreItems: !1,
                pois: i
            });
        });
    },
    showClearModel: function() {
        var e = this;
        wx.pro.showModal({
            title: "提示",
            content: "确定清空记录"
        }).then(function(t) {
            if (t.confirm) {
                var a = {
                    cityId: p.cityId
                };
                s.default.clearSync(a), e.setData({
                    histories: s.default.getItemsSync(a)
                });
            }
        });
    },
    clearInput: function() {
        this.setData({
            searchKey: "",
            haveMoreItems: !1,
            stations: [],
            pois: [],
            lines: [],
            showAd: this._showAd([])
        });
    },
    debounce: function(e) {
        this.data.debounceSearch(e);
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.searchValue;
        if (a) if ("openid" !== a) if ("chelaile://debug" !== a) {
            var i = this;
            i.setData({
                noSearchResult: !1
            }), a.length < 1 ? i.setData({
                lines: [],
                stations: [],
                pois: []
            }) : (d.track("WECHAT_MP_CLICK", {
                curPage: "search",
                describ: "搜索"
            }, m), i.setData({
                searchKey: a
            }), wx.pro.request({
                toast: {
                    duration: 4e3
                },
                url: l.baseUrl + "api/basesearch/client/clientSearch.action",
                data: {
                    key: a,
                    formId: e.detail.formId || ""
                },
                header: {
                    Accept: "text/plan"
                }
            }).then(function(e) {
                var a = o.handlerResponse(e), n = [];
                a.lines && (n = a.lines.slice(0, 20)), n.forEach(function(e) {
                    e.displayName = i.prettyLineName(e.name);
                }), i.setData({
                    lines: n,
                    stations: a.stations,
                    pois: a.pois,
                    haveMoreItems: !0,
                    lineCount: a.lineCount,
                    stationCount: a.stationCount,
                    poiCount: a.poiCount,
                    showAd: t._showAd(n)
                }), 0 === n.length && 0 === a.stations.length && 0 === a.pois.length && i.setData({
                    noSearchResult: !0
                });
            }));
        } else r.default.push({
            name: "debug"
        }); else wx.setClipboardData({
            data: u.userId
        });
    }
});