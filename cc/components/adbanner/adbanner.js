function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return 1 === e;
}

var t = e(require("../../ad/ad.mgr")), n = e(require("../../ad/ad.navigator")), i = e(require("../../service/realtimelog")), r = getApp(), o = {
    0: {
        bannerType: "homePage",
        unitId: "adunit-ada74d4d7b400a03",
        interval: 5e3,
        pageRoute: "pages/main/main",
        wxReportEvent: "linearound_ad_click",
        enableClose: !0
    },
    1: {
        bannerType: "linePage",
        unitId: "adunit-2b1d232b7fbba0fd",
        interval: 5e3,
        pageRoute: "pages/linedetail/linedetail",
        wxReportEvent: "linedetail_banner_click",
        enableClose: !0
    },
    2: {
        bannerType: "myPage",
        unitId: "adunit-997d0e38ae45febb",
        interval: 5e3,
        pageRoute: "pages/main/main",
        wxReportEvent: "mypage_banner_click",
        enableClose: !1
    },
    3: {
        bannerType: "routePage",
        unitId: "adunit-0fee29f14f08a20e",
        interval: 5e3,
        pageRoute: "pages/main/main",
        wxReportEvent: "routepage_banner_click",
        enableClose: !1
    },
    4: {
        bannerType: "planningResultPage",
        unitId: "adunit-40b9fdd05acb9695",
        interval: 5e3,
        pageRoute: "pages/transferplan/transferplan",
        wxReportEvent: "planningresultpage_banner_click",
        enableClose: !1
    },
    5: {
        bannerType: "searchPage",
        unitId: "adunit-42b0c9def7792037",
        interval: 5e3,
        pageRoute: "pages/search/search",
        wxReportEvent: "search_banner_click",
        enableClose: !1
    },
    6: {
        bannerType: "sameStationLine",
        unitId: "adunit-2c74bc18b376e092",
        interval: 5e3,
        pageRoute: "pages/stationdetail/stationdetail",
        wxReportEvent: "samestationline_banner_click",
        enableClose: !1
    }
};

Component({
    externalClasses: [ "ad-banner-outer" ],
    properties: {
        adSite: Number,
        globalShow: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        swiper: {
            items: [],
            indicatorDots: !1,
            interval: 5e3
        },
        _bannerType: "",
        showAd: !0,
        enableClose: !1,
        adUnitId: "",
        showSwiper: !1,
        showWxAd: !1,
        backup: {}
    },
    attached: function() {
        var e = this, a = this.data.adSite, t = o[a];
        this.setData({
            enableClose: t.enableClose,
            adUnitId: t.unitId,
            _bannerType: t.bannerType
        }), this.showSwiperAd(a).catch(function(a) {
            e.showWxAd(a);
        });
    },
    ready: function() {},
    detached: function() {},
    methods: {
        showSwiper: function(e) {
            var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (0 !== a.length) {
                var t = {
                    items: a,
                    indicatorDots: a.length > 1,
                    interval: o[e].interval
                };
                this._reportExhibit(this.data._bannerType, t.items[0]), this.setData({
                    swiper: t,
                    showSwiper: !0,
                    showWxAd: !1
                });
            }
        },
        showSwiperAd: function(e) {
            var n = this;
            return console.log("ad:showSwiperAd:adSite=" + e), t.default.getBanner(e).then(function(t) {
                if (!t.ads) throw [];
                if (a(t.backup)) throw t.ads;
                n.showSwiper(e, t.ads);
            });
        },
        showWxAd: function(e) {
            console.log("ad:showWxAd:adSite=" + this.data.adSite), this.setData({
                showSwiper: !1,
                showWxAd: !0,
                backup: e
            });
        },
        showBackupAd: function(e, a) {
            console.log("ad:showBackupAd:adSite=" + e), this.showSwiper(e, a);
        },
        _reportExhibit: function(e, a) {
            i.default.logs("<ADV_EXHIBIT>", {
                adv_type: a.showType,
                adv_id: a.id,
                bannerType: e
            });
        },
        _reportClick: function(e, a) {
            i.default.logs("<ADV_CLICK>", {
                adv_type: a.showType,
                adv_id: a.id,
                bannerType: e
            });
        },
        _reportChange: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            if (this.data.showAd && r.isForeground() && 0 !== this.data.swiper.items.length) {
                var a = getCurrentPages(), t = a[a.length - 1];
                (t ? t.route : "") === o[this.data.adSite].pageRoute && this._reportExhibit(this.data._bannerType, this.data.swiper.items[e]);
            }
        },
        onSwiperItemChanged: function(e) {
            var a = e.detail.current;
            this._reportChange(a);
        },
        onTapSwiperItem: function(e) {
            var a = e.currentTarget.dataset.item;
            wx.reportAnalytics(o[this.data.adSite].wxReportEvent, {
                adv_id: a.id,
                adv_mpid: a.wxMiniProId
            }), this._reportClick(this.data._bannerType, a), n.default.navigate({
                targetType: a.targetType,
                linkUrl: a.link,
                appId: a.wxMiniProId,
                path: a.wxMiniProPath || ""
            }) || this.triggerEvent("onClickAd", {}, {});
        },
        onWxAdLoadSuccess: function() {
            console.log("wx.ad:onWxAdLoadSuccess"), i.default.logs("<ADV_EXHIBIT>", {
                adv_type: "mp_banner",
                adUnitId: this.data.adUnitId,
                bannerType: this.data._bannerType
            });
        },
        onWxAdLoadError: function(e) {
            console.error("wx.ad:onWxAdLoadError", e), this.showBackupAd(this.data.adSite, this.data.backup);
        },
        onWxAdClose: function() {
            console.log("wx.ad:onWxAdClose"), this.setData({
                showAd: !1
            }), i.default.logs("<ADV_CLOSE>", {
                bannerType: this.data._bannerType
            });
        }
    }
});