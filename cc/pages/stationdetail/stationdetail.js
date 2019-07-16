function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../router/router.core")), i = t(require("../../service/city.mapper")), a = t(require("../../mp/framework")), s = require("../../utils/util"), r = require("../../service/constant"), n = require("../../service/user"), o = require("../../service/city"), c = require("../../service/customize.plugin");

a.default.Page({
    data: {
        mShowWxScopeData: !1,
        mWxScopeData: {
            service_type: 79,
            station: "",
            city: ""
        },
        displayLines: [],
        option: {},
        loadSuccess: !1,
        isAdEnable: !1,
        _cityId: ""
    },
    onLoad: function(t) {
        if (t && "wxsearch" === t.from && o.set({
            cityId: t.cityId,
            cityName: t.cityName
        }), this.data._cityId = t.cityId, t && t.widgetData) {
            var e = s.getWidgetParam("widgetData", t);
            return 0 !== e.err_code ? void wx.redirectTo({
                url: "../main/main"
            }) : void this.wxSearchLoad(e.stn_data);
        }
        this.setData({
            option: t,
            isAdEnable: !n.isNew() && c.isAdEnable()
        }), this.load(t);
    },
    onPullDownRefresh: function() {
        this.refresh();
    },
    _getCity: function() {
        return {
            cityId: this.data._cityId || o.cityId
        };
    },
    refresh: function() {
        var t = this.data.option;
        this.load(t);
    },
    reverseLine: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.displayLines, a = i[e].reverseDirection;
        if (void 0 === a) return !1;
        i[e] = this.data.lines[a], this.setData({
            displayLines: i
        });
    },
    goLineDetail: function(t) {
        var i = t.currentTarget.dataset;
        e.default.toLineDetail(i, this._getCity());
    },
    load: function(t) {
        var e = this, i = this;
        t = Object.assign(t, this._getCity()), wx.pro.request({
            url: r.baseUrl + "api/bus/stop!stationDetail.action",
            data: t
        }).then(function(t) {
            var a = s.handlerResponse(t);
            wx.setNavigationBarTitle({
                title: a.sn
            });
            var r = s.mergeDisplayLines(a.lines);
            i.setData({
                data: a,
                displayLines: r,
                lines: a.lines
            }), e._initWxScopeData(e._getCity().cityId, a.sn), setTimeout(function() {
                e.setData({
                    loadSuccess: !0
                });
            });
        });
    },
    wxSearchLoad: function(t) {
        o.set({
            cityId: t.cityId,
            cityName: t.cityName
        });
        var e = {
            stationId: t.stnId,
            stationName: t.name,
            targetOrder: 2
        };
        this.setData({
            option: e
        }), this.load(e);
    },
    _initWxScopeData: function(t, e) {
        var a = i.default.getNameById(t), s = this.data.mWxScopeData;
        Object.assign(s, {
            city: a,
            station: e
        }), this.setData({
            mShowWxScopeData: !0,
            mWxScopeData: s
        });
    }
});