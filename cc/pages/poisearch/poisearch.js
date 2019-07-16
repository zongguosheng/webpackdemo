function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../mp/framework")), a = t(require("../../application/history/PoiHistory")), i = require("../../utils/util.js"), n = require("../../service/constant.js"), r = require("../../service/transfer"), s = require("../../service/gps"), o = require("../../service/city");

e.default.Page({
    data: {
        placeholder: "输入起点",
        poiList: [],
        type: "1",
        poiSearchHistories: [],
        noSearchResult: !1,
        searchValue: ""
    },
    onLoad: function(t) {
        this.setData({
            placeholder: "1" === t.type ? "输入起点" : "输入终点",
            type: t.type
        });
    },
    onShow: function() {
        this.setData({
            poiSearchHistories: a.default.getItemsSync({
                cityId: o.cityId
            })
        });
    },
    prettyLineName: function(t) {
        return t && /[0-9]/.test(t[t.length - 1]) && (t += "路"), t;
    },
    myPositionClick: function() {
        var t = this, e = function() {
            t.poiClick({
                currentTarget: {
                    dataset: {
                        poi: {
                            lng: s.longitude,
                            lat: s.latitude,
                            name: "我的位置",
                            sn: "我的位置"
                        }
                    }
                }
            });
        };
        s.valid() ? e() : wx.openSetting({
            success: function(t) {
                t.authSetting["scope.userLocation"] && s.refresh().then(function() {
                    e();
                });
            }
        });
    },
    poiClick: function(t) {
        var e = t.currentTarget.dataset.poi;
        "我的位置" !== e.sn && a.default.addItemSync({
            cityId: o.cityId
        }, e);
        var i = r.depart, n = r.arrive;
        "1" === this.data.type ? (i = {
            origin_lng: e.lng,
            origin_lat: e.lat,
            name: e.sn
        }, "我的位置" === r.arrive.name && (n = {
            dest_lng: s.longitude,
            dest_lat: s.latitude,
            name: "我的位置"
        })) : "2" === this.data.type && (n = {
            dest_lng: e.lng,
            dest_lat: e.lat,
            name: e.sn
        }, "我的位置" === r.depart.name && (i = {
            origin_lng: s.longitude,
            origin_lat: s.latitude,
            name: "我的位置"
        })), i.name !== n.name ? (r.setDepart(i), r.setArrive(n), r.goPlan()) : wx.showToast({
            title: "起始站和终点站位置不能相同",
            icon: "none",
            duration: 2e3,
            mask: !0
        });
    },
    clearInput: function() {
        this.setData({
            searchValue: "",
            poiList: []
        });
    },
    formSubmit: function(t) {
        var e = this, a = this, r = t.detail.searchValue;
        a.setData({
            noSearchResult: !1
        }), r.length < 1 ? a.setData({
            poiList: []
        }) : (a.setData({
            searchValue: r
        }), wx.pro.request({
            toast: {
                duration: 4e3
            },
            url: n.baseUrl + "api/basesearch/client/clientSearchList.action",
            data: {
                key: r,
                formId: t.detail.formId,
                type: 3
            },
            header: {
                Accept: "text/plan"
            }
        }).then(function(t) {
            var a = i.handlerResponse(t);
            a.pois.length > 0 ? e.setData({
                poiList: a.pois
            }) : e.setData({
                noSearchResult: !0
            });
        }));
    },
    showClearModel: function() {
        var t = this;
        wx.pro.showModal({
            title: "提示",
            content: "确定清空记录"
        }).then(function(e) {
            if (e.confirm) {
                var i = {
                    cityId: o.cityId
                };
                a.default.clearSync(i), t.setData({
                    poiSearchHistories: a.default.getItemsSync(i)
                });
            }
        });
    }
});