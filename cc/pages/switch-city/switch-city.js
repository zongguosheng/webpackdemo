var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../mp/framework")), e = require("../../service/city"), i = require("../../service/reset");

t.default.Page({
    data: {
        gpsCity: {},
        hotCities: [],
        searchCities: [],
        allCities: [],
        allRealTimeCities: [],
        currentCityName: "",
        currentCityId: "",
        searchKey: "",
        showSearch: !1,
        noSearchResult: !1,
        pinyins: {
            row: 0,
            column: 0
        },
        toView: ""
    },
    chooseCity: function(t) {
        e.set(t.currentTarget.dataset), i.all(), wx.navigateBack({
            url: "../main/main"
        });
    },
    onLoad: function() {
        var t = this;
        this.setData({
            currentCityName: e.cityName || "",
            currentCityId: e.cityId || ""
        }), wx.pro.request({
            toast: {},
            url: "https://web.chelaile.net.cn/wwd/ncitylist"
        }).then(function(i) {
            if (i.data) {
                var a = {}, s = {}, r = [], n = [];
                i.data.cityList.forEach(function(t) {
                    if (t.isGpsCity && (s = t), 1 === t.isSupport) {
                        var e = t.pinyin.substring(0, 1).toLocaleUpperCase();
                        a[e] || (a[e] = []), a[e].push(t), t.icoName = t.pinyin.toLocaleLowerCase(), n.push(t), 
                        1 === t.isHot && r.push(t);
                    }
                });
                var c = Object.keys(a).map(function(t) {
                    return {
                        k: t,
                        v: a[t]
                    };
                });
                c.sort(function(t, e) {
                    return t.k > e.k ? "1" : "-1";
                }), e.setGpsCity(s), t.setData({
                    hotCities: r,
                    allRealTimeCities: c,
                    gpsCity: s,
                    allCities: n,
                    pinyins: {
                        row: Math.ceil(c.length / 5),
                        column: 5
                    }
                });
            }
        });
    },
    blurInput: function(t) {
        var e = this.data.searchKey;
        this.setData({
            showSearch: !!e
        });
    },
    watchInput: function(t) {
        this.setData({
            showSearch: !0
        });
        var e = t.detail.value;
        if (e) {
            var i = this.data.allCities.filter(function(t) {
                return 0 === t.cityName.indexOf(e) || 0 === t.pinyin.toLocaleUpperCase().indexOf(e.toLocaleUpperCase());
            });
            this.setData({
                searchKey: e,
                searchCities: i,
                noSearchResult: !i.length
            });
        } else this.setData({
            searchKey: "",
            searchCities: [],
            noSearchResult: !1
        });
    },
    clearInput: function() {
        this.setData({
            searchCities: [],
            searchKey: "",
            noSearchResult: !1
        });
    },
    goCity: function(t) {
        this.setData({
            toView: t.currentTarget.dataset.k
        });
    }
});