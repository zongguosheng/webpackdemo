function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, i = e(require("../../mp/framework")), n = e(require("../../service/pv")), s = e(require("../../service/pv.config")), r = e(require("../../router/router.core")), o = e(require("../../utils/timer")), l = e(require("./api")), u = e(require("../guideLineDetail/strategy.js")), d = e(require("../../service/city.mapper")), c = e(require("../../router/router.plugin")), h = e(require("../../service/user.new")), g = e(require("../../application/router/index")), f = e(require("./AdTrigger")), m = e(require("../../application/favorite/index")), v = e(require("../../application/history/QueryHistory")), p = e(require("../../service/api.core")), D = e(require("../../ad/ad.mgr")), b = require("../../utils/util.js"), _ = require("../../service/constant"), w = require("../../utils/es6-promise"), S = require("../../service/user"), y = require("../../service/gps"), I = require("../../service/city"), T = require("../../service/bus"), A = require("../../service/ad"), N = require("../../service/analytic"), x = require("../../service/customize.plugin"), C = require("../../service/prompt").getPrompt, k = getApp(), O = new n.default(k), P = new o.default(k);

i.default.Page({
    adTrigger: new f.default(),
    data: {
        ifShowPay: !1,
        payText: "",
        mFromWxSearch: !1,
        mWxScopeData: {
            service_type: 18,
            province: "",
            city: "",
            line_name: ""
        },
        _cityId: "",
        remindEnable: !1,
        ifShowB: !1,
        shareTheBusOrder: null,
        busListShare: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
        hadRemain: !1,
        remindNub: null,
        loadOver: !1,
        guideShow1: !1,
        guideShow2: !1,
        guideShow3: !1,
        bankArr: [],
        nubArray: [],
        whichStation: 1,
        logs: [],
        color: "#0082dc",
        data: null,
        line: null,
        stations: null,
        Buses: null,
        stationsScrollLine: null,
        currentStation: null,
        nearestBusOrder: null,
        lineState: null,
        canSwap: null,
        leftPosition: null,
        loadSuccess: !1,
        isIpx: k.globalData.isIpx,
        isFav: !1,
        fiveDayDialog: !1,
        showSharePlanDialog: !1,
        shareInfo: {
            title: "快用这个，别再苦等公交了",
            path: "pages/main/main"
        },
        traffics: [],
        stad: null,
        favTag: {
            show: !1,
            status: "0",
            list: []
        },
        favModal: {
            tagName: "",
            show: !1
        },
        favTagInput: {
            tag: {
                l: 0
            },
            show: !1
        },
        notRealTimeCity: !1,
        lineDetailFlag: !0,
        alertLoginDialog: !1,
        alertFavDialog: !1,
        modalFlag: !0,
        isShowSharePlan: x.showSharePlan(),
        isNewUser: !0,
        sessionNoShowAD: A.lineDetailSessionNoShowAD,
        pluginOpts: {
            promotionEnable: x.isPromotionEnable()
        },
        isShowGame: !1,
        suggestEnable: x.isSuggestEnable(),
        showDownloadDialog: !1,
        isAdLoading: !0
    },
    onLoad: function(e) {
      console.log('linedetail')
        var t = this, a = this;
        if (this.userHelp(), wx.reportAnalytics("linedetail_visit", {
            linedetail: "linedetail"
        }), this.data._cityId = e.cityId, e.widgetData) {
            var i = b.getWidgetParam("widgetData", e);
            if (0 !== i.err_code) wx.redirectTo({
                url: "../main/main"
            }); else {
                var n = i.line_data;
                this.wxSearchLoad(n);
            }
        } else if (e.wxParamData) {
            var s = JSON.parse(decodeURIComponent(e.wxParamData)), r = {};
            s.slot_list ? (s.slot_list.forEach(function(e) {
                var t = "line_name" === e.key ? "lineName" : e.key;
                r[t] = e.value;
            }), wx.pro.request({
                url: _.baseUrl + "api/bus/wx!getLineInfo.action",
                data: r
            }).then(function(e) {
                var a = b.handlerResponse(e).line_data;
                t.wxSearchLoad(a);
            })) : wx.redirectTo({
                url: "../main/main"
            });
        } else {
            this.load(e), this._initWxScopeData(e.cityId, e.lineName);
            var o = setTimeout(function() {
                a.data.loadOver && (u.default.howManyTimesEnter(), a._guideShow(a.data.ifShowB), 
                clearTimeout(o));
            }, 1e3);
        }
        this.data._systemInfo = wx.getSystemInfoSync(), this._getPromptConfig(), this._intiGameGuide();
    },
    onShow: function() {
        var e = this;
        O.onEnterPage(), this.otherInit(), this.adTrigger.bindLoader({
            show: function() {
                e.setData({
                    isAdLoading: !1
                });
            },
            hide: function() {
                e.setData({
                    isAdLoading: !0
                });
            }
        }).kick(), N.trackPage({
            curPage: "lineDetail",
            describ: "line_detail_page",
            platform: this.data._systemInfo.system
        }, k);
    },
    onHide: function() {
        this._onLeavePage("onHide"), P.stop(), wx.hideLoading(), this.adTrigger.unbind();
    },
    onUnload: function() {
        this._onLeavePage("onUnload"), P.stop();
    },
    onShareAppMessage: function(e) {
        var t = this, a = "pages/main/main";
        if ("button" === e.from) {
            if ("noShareBus" === e.target.dataset.src) {
                S.info.phoneNumber && S.info.nickName && (a += "?phone=" + S.info.phoneNumber + "&nickName=" + S.info.nickName, 
                wx.reportAnalytics("click_share", {
                    phone: S.info.phoneNumber,
                    nickname: S.info.nickName
                }), N.track("WECHAT_MP_ZHUANFA", {
                    u_phone: S.info.phoneNumber,
                    u_name: S.info.nickName
                }, k));
                var i = {
                    title: this.data.shareInfo.title,
                    path: a
                };
                return i.imageUrl = "https://image3.chelaile.net.cn/d46e667c105b4d2585caf03e06b81aa8", 
                i.success = function() {
                    "noShareBus" === e.target.dataset.src && t.hideNoBus();
                }, i;
            }
            if ("share2Group" === e.target.dataset.src) return N.trackClick({
                curPage: "lineDetail",
                describ: "old_recommend_click"
            }, k), {
                title: "这个冬天，不想你等公交挨冻",
                path: "pages/main/main?from=please",
                imageUrl: "https://image3.chelaile.net.cn/d46e667c105b4d2585caf03e06b81aa8"
            };
        }
    },
    _onLeavePage: function(e) {
        console.log("leave reason:" + e);
        s.default.lineDetail;
    },
    _initWxScopeData: function(e, t) {
        var a = d.default.getNameById(e), i = this.data.mWxScopeData;
        Object.assign(i, {
            city: a,
            line_name: t
        }), this.setData({
            mFromWxSearch: !0,
            mWxScopeData: i
        });
    },
    _getCity: function() {
        return {
            cityId: this.data._cityId || I.cityId
        };
    },
    emptyEvent: function() {
        return !1;
    },
    closeSearchBubble: function() {
        this.setData({
            lineDetailFlag: !1
        }), wx.setStorageSync("lineDetailFlag", "false");
    },
    closePayBubble: function() {
        var e = this;
        wx.showLoading({
            title: "loading...",
            icon: "none",
            mask: !0
        }), this.getUserMsg().then(function(t) {
            l.default.lineDetailBubbleClick(t).then(function() {
                e.setData({
                    payText: ""
                }), e.goPay();
            });
        });
    },
    closePayBubbleIn: function() {
        var e = this;
        this.getUserMsg().then(function(t) {
            l.default.lineDetailBubbleClick(t).then(function() {
                e.setData({
                    payText: ""
                });
            });
        });
    },
    saveRecent: function() {
        var e = this.data.line, t = this.data.currentStation, a = {
            isLine: !0,
            sId: t.sId,
            lineId: e.lineId,
            loadKey: e.lineId + "," + t.sId,
            key: [ "bus", I.cityId, e.lineNo ].join("_"),
            timestamp: new Date().getTime()
        };
        v.default.addItemSync({
            cityId: I.cityId
        }, a);
    },
    triggerAcLoad: function() {
        this.adTrigger.kick();
    },
    changeStation: function(e) {
        var t = this.data, a = parseInt(e.currentTarget.dataset.index);
        this.triggerAcLoad(), this.load({
            targetOrder: a + 1,
            lineId: t.line.lineId
        });
    },
    refresh: function() {
        var e = this.data.data;
        this.triggerAcLoad(), this.load({
            targetOrder: e.targetOrder,
            lineId: e.line.lineId,
            direction: e.line.direction,
            lineName: e.line.name,
            stationName: e.stations[e.targetOrder - 1].sn
        });
    },
    _refreshAd: function(e, t) {
        var a = this;
        l.default.getStationAds({
            lineId: e.lineId,
            lineNo: e.lineNo,
            direction: e.direction,
            stationName: t.sn,
            stationId: t.sId
        }).then(function(e) {
            a._makeStationAD(e);
        });
    },
    swap: function() {
        var e = this.data.data, t = e.targetOrder;
        this.load({
            lineId: e.otherlines[0].lineId,
            direction: 1 === e.line.direction ? "0" : "1",
            lineName: e.line.name,
            stationName: e.stations[t - 1].sn,
            nextStationName: e.stations[t - 2] && e.stations[t - 2].sn || "-1",
            targetOrder: ""
        });
    },
    closeSharePlanDialog: function() {
        this.setData({
            showSharePlanDialog: !1
        });
    },
    sharePlan: function() {
        if (this.data.showSharePlanDialog || N.track("WECHAT_MP_CLICK", {
            curPage: "lineDetail",
            describ: "share_trip"
        }, k), !this.data.shareBusRedPoint) return this.goTakeBus(), void this.closeMask();
        wx.setStorage({
            key: "share_bus_red_point",
            data: 1
        }), this.setData({
            showSharePlanDialog: !this.data.showSharePlanDialog,
            shareBusRedPoint: !1
        });
    },
    hideNoBus: function() {
        this.setData({
            noShareBus: !1
        });
    },
    showNoBus: function() {
        this.setData({
            noShareBus: !0
        });
    },
    goTakeBus: function() {
        N.track("WECHAT_MP_CLICK", {
            curPage: "lineDetail",
            describ: "share_trip"
        }, k);
        var e = this.data.shareTheBusOrder.busId, t = this.data.targetOrder;
        this.closeMask(), wx.navigateTo({
            url: "../takebus/takebus?targetOrder=" + t + "&busId=" + e
        });
    },
    catchEvent: function() {
        return !1;
    },
    saveFavSixDayUse: function() {
        this.setData({
            alertFavDialog: !1
        }), this.toggleFav();
    },
    cancelFavSixDayUse: function() {
        this.setData({
            alertFavDialog: !1
        });
    },
    hideFavTagMenu: function() {
        this.setData({
            favTag: {
                status: "0",
                list: this.data.favTag.list,
                show: !1
            }
        });
    },
    changeFavStatus: function(e) {
        this.setData({
            favTag: {
                status: e.currentTarget.dataset.type,
                list: this.data.favTag.list,
                show: !0
            }
        });
    },
    removeFav: function(e) {
        this.setData({
            favModal: {
                tagName: e.currentTarget.dataset.tagName,
                show: !0
            }
        });
    },
    cancelRemoveFavTag: function() {
        this.setData({
            favModal: {
                show: !1,
                tagName: ""
            }
        });
    },
    removeFavTag: function() {
        var e = this;
        m.default.removeTagName(this.data.favModal.tagName).finally(function(t) {
            e.setData({
                favTag: {
                    show: !0,
                    status: "1",
                    list: t
                },
                favModal: {
                    show: !1,
                    tagName: ""
                }
            });
        });
    },
    showFavTagInput: function() {
        this.setData({
            favTagInput: {
                tag: {
                    l: 0
                },
                show: !0
            }
        });
    },
    hideFavTagInput: function() {
        return this.setData({
            favTagInput: {
                tag: {
                    l: 0
                },
                show: !1
            }
        }), !1;
    },
    favTagChange: function(e) {
        return this.setData({
            favTagInput: {
                tag: {
                    l: e.detail.value.trim().length,
                    v: e.detail.value.trim()
                },
                show: !0
            }
        }), e.detail.value.trim();
    },
    favTagSubmit: function() {
        this.handelFav({
            currentTarget: {
                dataset: {
                    tagName: this.data.favTagInput.tag.v
                }
            }
        });
    },
    handelFav: function(e) {
        if ("1" !== this.data.favTag.status) {
            var t = e ? e.currentTarget.dataset.tagName : "1";
            t = t.replace(",", "，"), t = t.replace(";", "；");
            var a = this, i = this.data.line, n = {
                lineId: i.lineId,
                sn: i.currentStation.sn,
                order: i.currentStation.order,
                nsn: i.currentStation.nsn,
                tagName: t
            };
            n.fav = m.default.isFav(n) ? 1 : 0, m.default.toggleFav(n).then(function() {
                a.setData({
                    favTag: {
                        show: !1,
                        status: "0",
                        list: m.default.getTags()
                    },
                    favTagInput: {
                        show: !1,
                        tag: {
                            l: 0
                        }
                    },
                    isFav: !(1 === n.fav)
                }), 0 === n.fav && wx.showToast({
                    icon: "none",
                    title: "成功收藏到“" + t + "”标签",
                    duration: 2e3,
                    mask: !0
                });
            });
        }
    },
    toggleFav: function() {
        var e = this.data.line, t = {
            lineId: e.lineId,
            sn: e.currentStation.sn,
            order: e.currentStation.order,
            nsn: e.currentStation.nsn
        };
        t.fav = m.default.isFav(t) ? 1 : 0, t.fav ? this.handelFav() : this.setData({
            favTag: {
                show: !0,
                status: "0",
                list: this.data.favTag.list
            }
        });
    },
    goMoreBus: function() {
        wx.navigateTo({
            url: "../morebus/morebus"
        });
    },
    mergeArrivedBus: function(e, t) {
        var a = _.LINESTATE.BUS_STATE, i = _.LINESTATE.DELAY, n = {}, s = [];
        return t.filter(function(t) {
            return t.order <= e.targetOrder;
        }).forEach(function(e) {
            if (e.isArriving && e.state === a.ARRIVED) {
                var t = n[e.order];
                t ? (e.delay === i.DELAYED && e.delay === t.delay ? t.syncTime = Math.min(t.syncTime, e.syncTime) : t.delay = i.UNDELAYED, 
                ++t.count) : (e.count = 1, n[e.order] = e, s.push(e));
            } else s.push(e);
        }), s;
    },
    makeStations: function(e) {
        var t = e.length, a = 0;
        return e.forEach(function(i, n) {
            i.displaySn = i.sn, a = i.displaySn.length >= a ? i.displaySn.length : a, i.nsn = n + 1 < t ? e[n + 1].sn : "-1";
        }), this.setData({
            maxStationNameLength: a
        }), e;
    },
    makeBuses: function(e, t, a) {
        var i = this, n = [];
        if (Array.isArray(e) && e.length) {
            e.reverse();
            var s = e.map(function(e) {
                return T.factory(e);
            });
            (n = i.mergeArrivedBus(t, s))[0] && i.setData({
                nearestBusOrder: n[0].order
            });
        }
        i.makeDisplayBuses(n);
    },
    makeDisplayBuses: function(e) {
        var t = T.makeDisplayBuses(e).slice(0, 2);
        t.length > 1 && t[1].travels.length && t[1].travels[0].travelTime > 3600 && (t = t.slice(0, 1)), 
        this.setData({
            notRealTimeCity: T.notRealTimeCity,
            Buses: t
        });
    },
    hidedelay: function(e) {
        var t = this.data.Buses;
        t.forEach(function(t, a) {
            a === e.currentTarget.dataset.index && (t.showDelay = !t.showDelay);
        }), this.setData({
            Buses: t
        });
    },
    drawTraffic: function() {
        var e = [];
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(t) {
            t.forEach(function(t) {
                e.push({
                    l: (70 * t.TPC.toFixed(2)).toFixed(2) + "px",
                    bgColor: "traffic traffic-level-" + (t.TVL || 0)
                });
            });
        }), this.setData({
            traffics: e
        });
    },
    drawDisplayStations: function(e, t) {
        var a = this, i = this;
        e.forEach(function(e) {
            e.numberClass = "station-number fg-6 f-11", e.nameClass = "station-name fg-3 f-14", 
            e.order === t.targetOrder && (e.isCurrentIcon = !e.arrivalNum || e.arrivalNum < 1, 
            e.arrowIcon = !0, e.nameClass = "station-name fg-red f-14", e.numberClass = "station-number fg-red f-11"), 
            e.arrivalNum > 0 && (e.order === i.data.nearestBusOrder ? e.busArriveIconClass = "icon_line_bus_large bus-current" : e.busArriveIconClass = "icon_line_bus_little bus-little-current"), 
            e.onTheWayNum > 0 && (e.busArriveIconClass && e.busArriveIconClass.indexOf("icon_line_bus_large") >= 0 ? e.busOnTheWayIconClass = "icon_line_bus_little bus-coming" : e.order === i.data.nearestBusOrder ? e.busOnTheWayIconClass = "icon_line_bus_large bus-nearest" : e.busOnTheWayIconClass = "icon_line_bus_little bus-coming"), 
            e.arrivalNum > 1 && (e.busArriveCountClass = "current-bus-count f-10 fg-3"), e.onTheWayNum > 1 && (e.busOnTheWayCountClass = "near-bus-count f-10 fg-3"), 
            e.busArriveIconClass && (e.busArriveIconClass.indexOf("icon_line_bus_large") >= 0 ? e.busArriveCountClass += " big-bus-count" : e.busArriveCountClass += " little-bus-count"), 
            e.busOnTheWayIconClass && (e.busOnTheWayIconClass.indexOf("icon_line_bus_large") >= 0 ? e.busOnTheWayCountClass += " big-bus-count" : e.busOnTheWayCountClass += " little-bus-count");
        });
        var n = 70 * e.length, s = 70 * t.targetOrder - 35, r = n - s, o = this.data._systemInfo.windowWidth, l = void 0;
        l = r > .5 * o ? Math.round(s - .5 * o) : Math.round(n - o), l = l > 0 ? l : 0;
        var u = 21 * i.data.maxStationNameLength + 230, d = 164 + u;
        this.setData({
            stationsScrollLine: n + "px",
            scrollHeight: u + "px",
            stations: e,
            overScrollBarHeight: d + "px"
        }), setTimeout(function() {
            a.setData({
                leftPosition: l
            });
        }, 50);
    },
    goTimetable: function() {
        wx.navigateTo({
            url: "../timetable/timetable"
        });
    },
    goStationAD: function() {
        var e = this.data.stad;
        this._goStationAD(e);
    },
    _goStationAD: function(e) {
        A.logs("<STN_ADV_CLICK>", {
            adv_id: e.id
        }), wx.reportAnalytics("station_ad_click", {
            adv_id: e.wxMiniProId
        }), A.navigateAD({
            targetType: e.targetType,
            linkUrl: e.link,
            appId: e.wxMiniProId,
            path: e.wxMiniProPath
        });
    },
    _makeStationAD: function(e) {
        this._checkStationAd(e) ? (A.logs("<ADV_EXHIBIT>", {
            adv_id: e.id
        }), P.setInterval(e.autoInterval), e.displayClass = this._makeStaADClass(e), this.setData({
            stad: e
        })) : this.setData({
            stad: null
        });
    },
    _checkStationAd: function(e) {
        return !!e;
    },
    _makeStaADClass: function(e) {
        var t = [], a = e.bannerInfo.bannerType;
        return a >= 3 && t.push("flex-between"), 2 !== a && 5 !== a && t.push("pl-15"), 
        a <= 3 && t.push("rf-15"), {
            adblock: t.join(" ")
        };
    },
    load: function(e) {
        var t = this, a = this;
        e = Object.assign(e, this._getCity()), l.default.ifShowPayEnter(e).then(function(e) {
            t.setData({
                ifShowPay: e.openPayEntry
            });
        }), wx.pro.request({
            toast: {
                duration: 8e3
            },
            url: _.baseUrl + "api/bus/line!lineDetail.action",
            data: e
        }).then(function(e) {
            var i = b.handlerResponse(e), n = i.line, s = i.targetOrder - 1 || 0, r = a.makeStations(i.stations);
            n.targetOrder = i.targetOrder, n.currentStation = r[s], wx.setNavigationBarTitle({
                title: b.prettyLineName(i.line.name)
            }), a.setData({
                loadOver: !0,
                userLoad: !1,
                data: i,
                line: n,
                lineState: n.state,
                currentStation: n.currentStation,
                canSwap: i.otherlines && i.otherlines.length > 0,
                targetOrder: i.targetOrder
            }), T.setLine(n), T.setStation(r), a.makeBuses(i.buses, n, r), a.drawDisplayStations(r, i), 
            a.drawTraffic(i.roads), a.saveRecent(), a.setData({
                isFav: m.default.isFav({
                    lineId: n.lineId,
                    sn: n.currentStation.sn,
                    order: n.currentStation.order
                }),
                favTag: {
                    show: !1,
                    status: "0",
                    list: m.default.getTags()
                }
            });
            var o = i.stad;
            a._makeStationAD(o), P.start(function(e) {
                a._refreshAd(n, n.currentStation);
            }), a.setData({
                loadSuccess: !0
            }), t.setBusList(JSON.stringify(i));
            var l = [], u = [];
            i.stations.forEach(function(e) {
                l.push(e.sn), u.push(e.order);
            }), t.setData({
                bankArr: l,
                nubArray: u
            }), a.ifRemind(i);
        });
    },
    hideShare: function() {
        this.setData({
            fiveDayDialog: !1
        });
    },
    userHelp: function() {
        var e = this;
        wx.getStorageSync("lineDetailFlag") ? e.setData({
            lineDetailFlag: !1
        }) : e.setData({
            lineDetailFlag: !0
        });
    },
    wxSearchLoad: function(e) {
        var t = this;
        t._initWxScopeData(e.cityId, e.lineName), I.set({
            cityId: e.cityId,
            cityName: e.cityName || "选择城市"
        }), w.all([ y.get(), S.get() ]).finally(function() {
            N.login(S.userId, k), t.load({
                lineName: e.lineName,
                lineId: e.lineId
            });
        });
    },
    otherInit: function() {
        wx.showShareMenu({
            withShareTicket: !0
        }), this.setData({
            shareBusRedPoint: !wx.getStorageSync("share_bus_red_point"),
            noShowAD: !x.isAdEnable(),
            sessionNoShowAD: A.lineDetailSessionNoShowAD,
            isNewUser: 1 === S.isNewUser
        });
    },
    goStationDetail: function() {
        var e = this.data.currentStation;
        r.default.toStationDetail(e);
    },
    _guideShow: function(e) {
        this.setData(t({}, "guideShow" + u.default.showWhich(e), !0));
    },
    closeGuide: function(e) {
        var a = e.currentTarget.dataset.name;
        this.setData(t({}, "guideShow" + a, !1));
    },
    closeMask: function() {
        this.setData({
            busListShow: !1
        });
    },
    shareThisBus: function(e) {
        var t = e.currentTarget.dataset.bus, a = this.data.busListShare;
        a.forEach(function(e) {
            e.current = !1, t.busId === e.busId && (e.current = !0);
        }), this.setData({
            busListShare: a,
            shareTheBusOrder: t
        });
    },
    setBusList: function(e) {
        var t = JSON.parse(e), a = t.buses.reverse(), i = t.targetOrder, n = 0, s = !1;
        try {
            a.forEach(function(e, t) {
                if (e.current = !1, e.order > i || e.order < 0) throw n = t, s = !0, "Jump out now!";
            });
        } catch (e) {
            console.log(e);
        }
        s || (n = a.length), a.length = n, a = a.reverse(), n && (a[0].current = !0, this.setData({
            shareTheBusOrder: a[0]
        })), this.setData({
            busListShare: a
        });
    },
    ifRemind: function(e) {
        var t = this, a = {
            direction: this.data.line.direction,
            lineId: this.data.line.lineId,
            openid: S.info.openid,
            stnNum: this.data.nubArray.length
        };
        l.default.ifRemind(a).then(function(a) {
            var i = e.targetOrder < 2 ? 0 : e.targetOrder - 2;
            t.setData({
                whichStation: a.stnOrder ? a.stnOrder - 1 : i,
                hadRemain: !!a.stnOrder
            });
        });
    },
    shareBus: function() {
        var e = this.data.busListShare.length;
        this.data.targetOrder === this.data.line.stationsNum ? wx.showToast({
            title: "您已经位于终点站了哦亲~",
            icon: "none"
        }) : e ? this.setData({
            busListShow: !0
        }) : wx.showToast({
            title: "您前方暂无车辆哦亲~",
            icon: "none"
        });
    },
    formSubmit: function(e) {},
    formReset: function() {
        this.setData({
            modalFlag: !1
        });
    },
    hideAlertLoginDialog: function() {
        this.setData({
            alertLoginDialog: !1
        });
    },
    goMinePage: function() {
        wx.navigateTo({
            url: "../main/main?from=mine"
        });
    },
    bindGetUserInfo: function(e) {
        S.bindGetUserInfo(e);
    },
    closeAD: function() {
        A.lineDetailSessionNoShowAD = !0, this.setData({
            sessionNoShowAD: !0
        });
    },
    clickPicker: function() {
        N.track("WECHAT_MP_CLICK", {
            curPage: "lineDetail",
            describ: "rem_in_car"
        }, k);
    },
    bindPickerChange: function(e) {
        var t = this;
        N.track("WECHAT_MP_CLICK", {
            curPage: "lineDetail",
            describ: "line_confirm"
        }, k);
        var a = e.detail.value, i = this.data.bankArr[a], n = this.data.nubArray[a], s = this.data.line;
        this.setData({
            remindNub: n
        });
        var r = {
            openid: S.info.openid,
            lineId: s.lineId,
            lineName: s.name,
            stopName: i,
            stnOrder: n,
            direction: s.direction,
            destOrder: s.targetOrder,
            stnNum: this.data.nubArray.length
        };
        l.default.addAboardMsg(r).then(function(e) {
            t.setData({
                hadRemain: !0
            }), wx.showToast({
                title: "设置成功",
                icon: "none"
            });
        }).catch(function(e) {
            wx.showToast({
                title: "设置失败,请稍后重试",
                icon: "none"
            });
        });
    },
    goPay: function() {
        r.default.toPay({
            _f_: "lineDetail"
        });
    },
    goRemindDownload: function() {
        var e = this.data._systemInfo.system.indexOf("Android") > -1 ? "Android" : "IOS";
        N.trackPage({
            curPage: "remind_page",
            describ: "xiao_to_app",
            platform: e
        }, k), r.default.toRimindDownload();
    },
    _getPromptConfig: function() {
        var e = this;
        this.setData({
            remindEnable: !1
        }), C(I.cityId).then(function(t) {
            t.prompt && t.prompt.forEach(function(t) {
                "menu" === t.showOn && "remind" === t.referenceId && "dot" === t.style && e.setData({
                    xctxDotEnable: !0,
                    xctxDotContent: t.content
                });
            }), t.menu && t.menu.forEach(function(t) {
                "lineDetail" === t.page && "remind" === t.id.trim() && e.setData({
                    remindEnable: !0,
                    remindName: t.name,
                    remindIcon: t.ico
                });
            });
        }).catch(function(e) {
            console.error(e);
        });
    },
    _intiGameGuide: function() {
        this.setData({
            isShowGame: !1,
            gameGif: "http://cdn.web.chelaile.net.cn/res_mp/game_enter/init_0.gif",
            isAuthorize: !1,
            isComplateGameGuide: !1,
            isRedBagRaining: !1
        }), this._getGameGuideStatus(), this._btnStatus = !0, this._gameBtnTimes = 1;
    },
    _getGameGuideStatus: function() {
        var e = this;
        wx.pro.request({
            url: _.baseApiUrl + "game-zillionaire/game/guide/status"
        }).then(function(t) {
            t.data && (setTimeout(function() {
                e.setData({
                    isShowGame: t.data.open,
                    isComplateGameGuide: t.data.complete,
                    _gameUrl: t.data.h5Url
                });
            }, 100), t.data.open && !t.data.complete && N.trackPage({
                curPage: "lineDetail",
                describ: "commute_baby_picture_show",
                platform: e.data._systemInfo
            }, k));
        });
    },
    reportFormId: function(e) {
        var t = b.getFormId(e);
        p.default.reportFormId(t);
    },
    playGame: function() {
        var e = this;
        this._btnStatus && (this._btnStatus = !1, N.trackClick({
            curPage: "lineDetail",
            describ: "commute_baby_picture",
            game_step: this._gameBtnTimes,
            platform: this.data._systemInfo
        }, k), this.setData({
            gameGif: "http://cdn.web.chelaile.net.cn/res_mp/game_enter/step_" + this._gameBtnTimes + ".gif"
        }), setTimeout(function() {
            if (e._gameBtnTimes < 3 && e.setData({
                gameGif: "http://cdn.web.chelaile.net.cn/res_mp/game_enter/init_" + e._gameBtnTimes + ".gif"
            }), e._gameBtnTimes = e._gameBtnTimes + 1, e._gameBtnTimes > 3) {
                N.trackPage({
                    curPage: "lineDetail",
                    describ: "commute_baby_red_packet_show",
                    platform: e.data._systemInfo
                }, k), e.setData({
                    isRedBagRaining: !0,
                    isComplateGameGuide: !0
                }), e._complateGuide();
                var t = null;
                e._hideRedBagRainingTime = 15, t = setInterval(function() {
                    e._hideRedBagRainingTime = e._hideRedBagRainingTime - 1, 0 == e._hideRedBagRainingTime && clearInterval(t);
                }, 1e3), setTimeout(function() {
                    e.setData({
                        isRedBagRaining: !1
                    });
                }, 15e3);
            } else e._btnStatus = !0;
        }, 5e3));
    },
    _complateGuide: function() {
        wx.pro.request({
            url: _.baseApiUrl + "game-zillionaire/game/guide/complete",
            data: {
                gv: 1e3,
                frdUserId: "",
                groupId: ""
            }
        });
    },
    enterGame: function() {
        var e = a({}, _.requestParams, {
            cityId: I.getCityId(),
            targetOrder: this.data.data.targetOrder,
            lineName: this.data.data.line.name,
            lineId: this.data.data.line.lineId,
            gv: 1e3,
            from: "NO_FROM",
            userId: S.getUserId(),
            gameUrl: this.data._gameUrl
        });
        c.default.toGameEnter(e);
    },
    getUserMsg: function() {
        return h.default.getUser().then(function(e) {
            var t = e.info;
            return {
                accountId: t.accountId,
                openId: t.openid,
                cityId: I.getCityId()
            };
        }).catch(function(e) {
            console.error(e);
        });
    },
    showDownload: function() {
        this.setData({
            showDownloadDialog: !0
        });
    },
    closeDownload: function() {
        this.setData({
            showDownloadDialog: !1
        });
    },
    onClickCloseDownload: function() {
        this.closeDownload();
    },
    onClickDownload: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.closeDownload(), e.detail.isApple || g.default.push({
            name: "increase-download"
        });
    },
    onClickBannerAd: function(e) {
        this.showDownload();
    },
    onClickTopAd: function(e) {
        var t = e.detail;
        D.default.navigate(t) || this.showDownload(), this.setData({
            mineDatalist: A.mineCenterAD
        });
    }
});