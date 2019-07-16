function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = e(require("../../mp/framework")), i = e(require("../../service/pv")), n = e(require("../../service/pv.config")), o = e(require("../linedetail/api.js")), r = e(require("../../service/api.core")), s = e(require("../../router/router.core")), c = e(require("../../service/reporter")), l = require("../../service/redirector.core"), d = require("../../service/redirector.conf"), u = e(require("../../service/flow")), h = e(require("../../service/connector.risk")), f = e(require("../../ad/ad.mgr")), g = e(require("../../service/realtimelog")), m = e(require("../../application/increase/HomeOpenCounter")), p = e(require("../../application/router/index")), v = e(require("../../application/context/index")), D = e(require("../../application/whitelist/index")), S = e(require("./home-loader")), y = e(require("../../application/favorite/index")), w = e(require("../../application/history/TransitHistory")), b = require("../../utils/util"), T = require("../../utils/es6-promise"), A = require("../../service/user"), C = require("../../service/gps"), _ = require("../../service/city"), P = require("../../service/constant"), N = require("../../service/customize.plugin"), k = require("../../service/ad"), I = require("../../service/analytic"), L = require("../../service/transfer"), E = getApp(), F = new i.default(E), x = require("../../service/prompt").getPrompt, H = new l.PageRedirector(d.DefaultHandler);

H.addHandler(d.RemindPushHandler), H.addHandler(d.TravelShareHandler), H.addHandler(d.OnlineBoardScanPageHandler), 
H.addHandler(d.WebHandlers), H.addHandler(d.PaySharePageHandler), H.addHandler(d.shareJourneyHandler), 
a.default.Page({
    data: {
        mCanDownloadAndroid: !1,
        ifShowOfficial: !0,
        logs: [],
        activeTab: "main",
        activeTag: S.default.RECOMMEND,
        mGridAds: [],
        isOpenWebView: !1,
        isIpx: E.globalData.isIpx,
        nearLines: null,
        hidden: !1,
        history: null,
        loadSuccess: !1,
        gpsCity: {
            cityName: "洛阳",
            cityId: ""
        },
        firstNoLinesPosition: -1,
        showSwitchGpsCity: !1,
        transfer: {
            depart: {
                name: ""
            },
            arrive: {
                name: ""
            }
        },
        transferPlanHistories: [],
        switchCity: N.canSwitchCity(),
        showCustomService: N.showContact(),
        noShowAD: !N.isAdEnable(),
        showQQCustom: !1,
        suggestEnable: !1,
        authorizationFlag: !0,
        nickName: A.info.nickName,
        avatarUrl: A.info.avatarUrl,
        unionId: A.unionId,
        phoneNumber: A.info.phoneNumber || "",
        mineCenterAD: [],
        mineTabShowRedPoint: !1,
        mainsearchFlag: !1,
        isOpenTip: !1,
        aroundFloatLayerAD: [],
        floatLayerAD: !1,
        isNewUser: !0,
        sessionNoShowAD: k.aroundSessionNoShowAD,
        scanScene: "",
        adSite: 0,
        userLoad: !0,
        showDownloadDialog: !1,
        serviceAvailable: !0,
        showOtherCityService: !1,
        selectedCity: {
            name: ""
        },
        tags: []
    },
    onLoad: function(e) {
        console.log('首页main')
        var a = this;
        new u.default().next(function(t) {
            v.default.update(e), t();
        }).next((0, h.default)(function() {
            a._showServiceStopped(!0);
        })).next(function(e) {
            D.default.checkPassport(v.default.get()).pass ? e() : a._showServiceStopped();
        }).next(function(e, i, n, o, r) {
            if (a._showServiceAvailable(), r && "object" === (void 0 === r ? "undefined" : t(r))) {
                var s = r.templateActive;
                "transfer" === s ? a.setData({
                    activeTab: "transfer"
                }) : "mine" === s && a.setData({
                    activeTab: "mine"
                }), r.scene && (c.default.report("scan_scene", {
                    scan_scene: r.scene
                }), a.setData({
                    scanScene: r.scene
                }));
            }
            H.handle(n, a, r), "suggest" === r.from && I.trackPage({
                curPage: "home_page",
                describ: "old_recommend_sure"
            }, n), "please" === r.from && I.trackPage({
                curPage: "home_page",
                describ: "recommend_sure"
            }, n);
        }).start(E, this, e);
    },
    onShow: function() {
        var e = this;
        new u.default().next((0, h.default)(function() {
            e._showServiceStopped(!0);
        })).next(function(t) {
            D.default.checkPassport(v.default.get()).pass ? t() : e._showServiceStopped();
        }).next(function(t, a, i) {
            e._showServiceAvailable(), c.default.reportDelay("main_visit", {
                main: "main"
            }, 1e3), T.all([ C.get(), A.get() ]).finally(function() {
                if (wx.showShareMenu({
                    withShareTicket: !0
                }), e.setData({
                    selectedCity: {
                        name: _.cityName || ""
                    }
                }), I.login(A.userId, i), I.promotionChannel(i), _.valid()) {
                    if (e.updateCustom(), A.requestIsNewUser().then(function() {
                        e.setData({
                            isNewUser: 1 === A.isNewUser
                        });
                    }), "main" === e.data.activeTab) return wx.startPullDownRefresh(), void e._getPrompt();
                    e.initTabs();
                } else e.goSwitchCity();
            }), m.default.increase(function() {
                I.trackPage({
                    curPage: "home_page",
                    describ: "app_wx_mp"
                }, i), e.showDownload();
            });
        }).start(E, this);
       
    },
    onHide: function() {
        this._onLeavePage("main onHide");
    },
    onUnload: function() {
        this._onLeavePage("main onUnload");
    },
    onShareAppMessage: function(e) {
        this.closeGuide();
        var t = this;
        "button" === e.from && I.trackClick({
            curPage: "home_page",
            describ: "recommend_click",
            tpye_recommend: 1
        }, E);
        var a = "pages/main/main?from=suggest";
        return A.info.phoneNumber && A.info.nickName && (a += "&phone=" + A.info.phoneNumber + "&nickName=" + A.info.nickName, 
        wx.reportAnalytics("click_share", {
            phone: A.info.phoneNumber,
            nickname: A.info.nickName
        }), I.track("WECHAT_MP_ZHUANFA", {
            u_phone: A.info.phoneNumber,
            u_name: A.info.nickName
        }, E)), {
            title: "快用这个，别再苦等公交了",
            imageUrl: "https://image3.chelaile.net.cn/d46e667c105b4d2585caf03e06b81aa8",
            path: a,
            complete: function() {
                t.setData({
                    showShare: !1
                });
            }
        };
    },
    _showServiceStopped: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.setData({
            serviceAvailable: !1,
            showOtherCityService: e
        }), I.trackPage({
            curPage: "home_page",
            describ: "service_sopped"
        }, getApp());
    },
    _showServiceAvailable: function() {
        this.setData({
            serviceAvailable: !0,
            showOtherCityService: !1
        });
    },
    emptyEvent: function() {
        return !1;
    },
    closeFloatLayerAD: function() {
        k.closeAroundFloat(k.aroundFloatLayerAD[0], E.globalData.lastPage), this.setData({
            floatLayerAD: !1
        });
    },
    closeSearchBubble: function() {
        this.setData({
            mainsearchFlag: !1
        }), wx.setStorageSync("mainsearchFlag", "1");
    },
    closeCllBubble: function(e) {
        var t = b.getFormId(e);
        r.default.reportFormId(t), I.track("WECHAT_MP_CLICK", {
            curPage: "introduction",
            describ: e.currentTarget.dataset.type
        }, E), this.setData({
            isOpenTip: !1,
            mainsearchFlag: !wx.getStorageSync("mainsearchFlag")
        }), wx.setStorageSync("firstOpenPage", "1");
    },
    goStationDetail: function(e) {
        var t = b.getFormId(e);
        r.default.reportFormId(t);
        var a = e.currentTarget.dataset;
        s.default.toStationDetail(a);
    },
    goLineDetail: function(e) {
        var t = b.getFormId(e);
        r.default.reportFormId(t);
        var a = e.currentTarget.dataset;
        s.default.toLineDetail(a, {
            cityId: _.getCityId()
        });
    },
    goSearch: function(e) {
        var t = b.getFormId(e);
        r.default.reportFormId(t), I.track("WECHAT_MP_CLICK", {
            curPage: "gosearch",
            describ: "去搜索"
        }, E), s.default.toSearch();
    },
    goSwitchCity: function() {
        this.setData({
            guideSuggestShow: !1
        }), this.data.switchCity && wx.navigateTo({
            url: "../switch-city/switch-city"
        });
    },
    hideShare: function() {
        this.setData({
            showShare: !1
        });
    },
    tabClick: function(e) {
        var t = b.getFormId(e);
        r.default.reportFormId(t);
        var a = e.currentTarget.dataset.tab;
        console.log("----- tab click-----", a), a !== this.data.activeTab && this._onTabChanged(a);
    },
    _onTabChanged: function(e) {
        "mine" === e && this.mineIfShowOffical(), this._onLeavePage("_onTabChanged"), this.setData({
            activeTab: e,
            showShare: !1
        }), this.initTabs("click");
    },
    _onLeavePage: function(e) {
        console.log("leave reason:" + e);
        this._getTabPvConfig(this.data.activeTab);
    },
    _getTabPvConfig: function(e) {
        var t = {
            main: "main",
            transfer: "route_page",
            mine: "mine"
        };
        return n.default.get(t[e]);
    },
    reverseLine: function(e) {
        var t = this, a = e.currentTarget.dataset.nearLineIndex, i = e.currentTarget.dataset.index, n = t.data.nearLines[a], o = n.lines, r = n.displayLines[i].reverseDirection;
        if (void 0 === r) return !1;
        t.data.nearLines[a].displayLines[i] = o[r], t.setData({
            nearLines: t.data.nearLines
        });
    },
    makeDisplayData: function(e) {
        var t = P.LINESTATE;
        e.lines.forEach(function(e, a) {
            if (e.display = {
                endSn: e.line.endSn,
                sn: e.targetStation.sn,
                lineName: b.prettyLineName(e.line.name),
                state: e.line.state,
                desc: e.line.desc,
                distanceClass: "fg-3",
                time: "--",
                signal: ""
            }, e.line.state === t.STATE.NORMAL) {
                var i = b.prettyDistance(e.stnState.distanceToDest).getDescription();
                e.stnState.value === t.STN_STATE.ARRIVING ? (e.display.distance = "即将到站 / " + i, 
                e.display.distanceClass = "fg-red", e.display.signal = "red") : e.stnState.value === t.STN_STATE.ARRIVED ? (e.display.isArrived = !0, 
                e.display.distanceClass = "fg-red", e.display.signal = "red") : (e.display.distanceClass = "fg-blue", 
                e.stnState.rType === t.RTYPE.HISTORY ? (e.display.distance = "准点率 " + Math.round(100 * e.stnState.pRate) + "%", 
                e.display.signal = "") : (e.display.distance = e.stnState.value + "站 / " + i, e.display.signal = "blue"));
                (e.stnState.travelTime >= 3600 ? function() {
                    this.time = b.dateFilter(e.stnState.arrivalTime);
                } : b.formatBusTime(e.stnState.travelTime)).call(e.display);
            } else e.line.state === t.STATE.LINE_CHANGE && (e.display.lineChange = !0), e.line.state !== t.STATE.NOT_START && e.line.state !== t.STATE.WAITING || (e.display.distanceClass = "fg-blue"), 
            e.display.distance = e.line.desc;
        }), e.nearSts.forEach(function(e) {
            e.displayDis = e.distance > 0 ? b.prettyDistance(e.distance).getDescription() : "";
        }), this.setData({
            lines: e.lines,
            stations: e.nearSts
        });
    },
    errorDialog: function(e) {
        wx.showToast({
            icon: "none",
            title: e,
            duration: 8e3,
            mask: !0
        });
    },
    refreshAd: function() {
        var e = this;
        this.setData({
            userLoad: !0
        }), setTimeout(function() {
            e.setData({
                userLoad: !1
            });
        });
    },
    loadRecommend: function() {
        var e = this;
        this.refreshAd(), S.default.loadRecommend().then(function(t) {
            t ? (e.showTags(t), e.makeDisplayData(t)) : e.errorDialog("服务器出了一个问题~");
        }).catch(function(t) {
            e.errorDialog("网络貌似不给力~");
        });
    },
    loadUseHistory: function() {
        var e = this;
        this.refreshAd();
        var t = {
            cityId: _.cityId
        };
        S.default.loadHistory(t).then(function(t) {
            t ? e.makeDisplayData(t) : e.errorDialog("服务器出了一个问题~");
        }).catch(function(t) {
            e.errorDialog("网络貌似不给力~");
        });
    },
    showClearModel: function() {},
    customClick: function() {
        this.setData({
            showQQCustom: !0
        });
    },
    hideCustomClick: function() {
        this.setData({
            showQQCustom: !1
        });
    },
    loadAd: function() {
        var e = this;
        N.isAdEnable() && (f.default.getGridAds().then(function(t) {
            e.setData({
                mGridAds: t
            }), t.forEach(function(e) {
                g.default.logs("<ADV_EXHIBIT>", {
                    adv_id: e.id,
                    adv_type: e.showType
                });
            });
        }), k.loadLineAround(E).finally(function() {
            var t = ("pages/linedetail/linedetail" === E.globalData.lastPage || "pages/stationdetail/stationdetail" === E.globalData.lastPage) && k.aroundFloatLayerAD.length > 0;
            if (t) if (19 == k.aroundFloatLayerAD[0].targetType) {
                var a = wx.createInterstitialAd({
                    adUnitId: "adunit-6d4a52b1f44b9cbb"
                });
                a.show().then(function(e) {
                    k.aroundFloatLayerADSendLogs(k.aroundFloatLayerAD[0], E.globalData.lastPage);
                }).catch(function(e) {
                    return console.log(e.errMsg);
                }), a.onClose(function() {
                    k.closeAroundFloat(k.aroundFloatLayerAD[0], E.globalData.lastPage), a.offClose();
                });
            } else k.aroundFloatLayerADSendLogs(k.aroundFloatLayerAD[0], E.globalData.lastPage), 
            e.setData({
                aroundFloatLayerAD: k.aroundFloatLayerAD,
                floatLayerAD: t
            });
        }));
    },
    loadMineAD: function() {
        var e = this;
        N.isAdEnable() && k.loadMineAD().finally(function() {
            e.setData({
                mineCenterAD: k.mineCenterAD,
                mineTabShowRedPoint: k.mineTabShowRedPoint
            });
        });
    },
    noTouchMove: function() {
        return !1;
    },
    clickAroundFloat: function() {
        this.setData({
            floatLayerAD: !1
        }), k.clickAroundFloat(k.aroundFloatLayerAD[0], E.globalData.lastPage);
    },
    homeADTime: function(e) {
        var t = e.detail;
        console.log(t), F.onClick("WECHAT_MP_ADV_RUNNING", {
            adv_id: t.id,
            click_time: b.formatFullTime(Date.now())
        }, "gap_time");
    },
    initTag: function() {
        switch (this.data.activeTag.type) {
          case S.default.RECOMMEND.type:
            this.loadRecommend();
            break;

          case S.default.HISTORY.type:
            this.loadUseHistory();
            break;

          default:
            this.loadFavorite();
        }
    },
    onClickTag: function(e) {
        var t = e.detail.tag, a = this.data.activeTag;
        t.name === a.name && t.type === a.type || (this.setData({
            activeTag: t
        }), this.initTag());
    },
    showTags: function(e) {
        var t = S.default.getTags(e);
        this.setData({
            tags: t
        });
    },
    loadFavorite: function() {
        var e = this;
        this.refreshAd(), S.default.loadFavorite(this.data.activeTag.name).then(function(t) {
            e.makeDisplayData({
                lines: t,
                nearSts: []
            });
        });
    },
    onTapDelFavAction: function(e) {
        var t = this, a = e.detail;
        y.default.removeLine({
            tagName: a.favTagName,
            lineId: a.line.lineId,
            sn: a.targetStation.sn,
            order: a.targetStation.order,
            nsn: a.nextStn.sn
        }).then(function() {
            t.loadFavorite();
        });
    },
    clearTransferPlan: function() {
        var e = this;
        wx.pro.showModal({
            title: "提示",
            content: "确定清空记录"
        }).then(function(t) {
            if (t.confirm) {
                var a = {
                    cityId: _.cityId
                };
                w.default.clearSync(a), e.setData({
                    transferPlanHistories: w.default.getItemsSync(a)
                });
            }
        });
    },
    goPlan: function() {
        L.goPlan();
    },
    transferPlanClick: function(e) {
        var t = e.currentTarget.dataset.poi, a = function() {
            var e = {
                origin_lng: t.origin_lng,
                origin_lat: t.origin_lat,
                name: t.origin_name
            }, a = {
                dest_lng: t.dest_lng,
                dest_lat: t.dest_lat,
                name: t.dest_name
            };
            "我的位置" === t.origin_name && (e.origin_lat = C.latitude, e.origin_lng = C.longitude), 
            "我的位置" === t.dest_name && (a.dest_lng = C.longitude, a.dest_lat = C.latitude), L.setDepart(e), 
            L.setArrive(a), wx.navigateTo({
                url: "../transferplan/transferplan"
            });
        };
        "我的位置" !== t.origin_name && "我的位置" !== t.dest_name || C.valid() ? a() : wx.openSetting({
            success: function(e) {
                e.authSetting["scope.userLocation"] ? C.refresh().then(function() {
                    a();
                }) : wx.showToast({
                    icon: "none",
                    title: "地理位置信息未授权",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    },
    loadTransfer: function(e) {
        "click" === e && L.reset();
        var t = !1;
        L.valid() && (t = !0);
        var a = {
            cityId: _.cityId
        };
        this.setData({
            adSite: 3,
            canTransfer: t,
            transferPlanHistories: w.default.getItemsSync(a),
            loadSuccess: !0,
            transfer: {
                depart: L.depart,
                arrive: L.arrive
            }
        });
    },
    swapLocation: function() {
        L.swapLocation();
        var e = !1;
        L.valid() && (e = !0), this.setData({
            canTransfer: e,
            transfer: {
                depart: L.depart,
                arrive: L.arrive
            }
        });
    },
    goPoiSearch: function(e) {
        wx.navigateTo({
            url: "../poisearch/poisearch?type=" + e.target.dataset.type
        });
    },
    changeCity: function() {
        _.set(this.data.gpsCity), this.setData({
            selectedCity: {
                name: _.cityName || ""
            }
        }), this.initTabs(), this.setData({
            guideSuggestShow: !1
        }), this._getPrompt();
    },
    hideChangeCity: function() {
        this.setData({
            lifeCircleNoShowSwithGpsCity: !0,
            showSwitchGpsCity: !1
        });
    },
    minePage: function() {
        var e = this;
        this.setData({
            adSite: 2
        }), A.refresh().then(function() {
            e.setData({
                nickName: A.info.nickName,
                avatarUrl: A.info.avatarUrl,
                phoneNumber: A.info.phoneNumber
            });
        });
        var t = [];
        this.data.mineCenterAD.forEach(function(e) {
            e.advs.forEach(function(e) {
                t.push(e.id);
            });
        });
    },
    catchEvent: function() {
        return !1;
    },
    initMain: function() {
        if (this.setData({
            adSite: 0
        }), C.valid()) {
            var e = "你似乎位于" + _.gpsCity.cityName + "，点击此处切换城市";
            this.setData({
                showSwitchGpsCity: N.canSwitchCity() && _.cityId !== _.gpsCity.cityId && _.gpsCity.isSupport && !this.data.lifeCircleNoShowSwithGpsCity,
                gpsCity: _.gpsCity,
                warningContent: e
            });
        }
        this.initTag();
    },
    initTabs: function(e) {
        switch (I.track("WECHAT_MP_PAGE", {
            curPage: this.data.activeTab,
            describ: this.data.activeTab
        }, E), F.onEnterPage(), this.data.activeTab) {
          case "main":
            this.initMain(), this.data.noShowAD || this.loadAd();
            break;

          case "transfer":
            this.loadTransfer(e);
            break;

          case "mine":
            this.minePage(), this.data.noShowAD || this.loadMineAD();
        }
    },
    onPullDownRefresh: function() {
        this.initTabs("refresh");
    },
    updateCustom: function() {
        this.setData({
            switchCity: N.canSwitchCity(),
            showCustomService: N.showContact(),
            noShowAD: !N.isAdEnable(),
            phoneNumber: A.info.phoneNumber,
            sessionNoShowAD: k.aroundSessionNoShowAD
        });
    },
    bindGetUserInfo: function(e) {
        var t = this;
        I.track("WECHAT_MP_CLICK", {
            curPage: "我",
            describ: "点击用户信息授权"
        }, E), A.bindGetUserInfo(e).then(function() {
            t.setData({
                authorizationFlag: !0,
                nickName: A.info.nickName,
                avatarUrl: A.info.avatarUrl,
                unionId: A.unionId,
                phoneNumber: A.info.phoneNumber
            });
        }).catch(function() {
            t.setData({
                authorizationFlag: !1,
                nickName: A.info.nickName,
                avatarUrl: A.info.avatarUrl,
                unionId: A.unionId
            });
        });
    },
    navigateToBindPhonePage: function() {
        wx.navigateTo({
            url: "../bindPhoneNumber/bindPhoneNumber"
        });
    },
    getPhoneNumber: function(e) {
        var t = this;
        I.track("WECHAT_MP_CLICK", {
            curPage: "我",
            describ: "点击手机号信息授权"
        }, E), A.getPhoneNumber(e).then(function() {
            console.log("main get phone Number Success"), t.setData({
                phoneNumber: A.info.phoneNumber
            });
        }).catch(function() {
            setTimeout(function() {
                t.navigateToBindPhonePage();
            }, 2e3);
        });
    },
    mineIfShowOffical: function() {
        var e = this;
        N.isPromotionEnable() && o.default.ifShowOfficialAccount({}, "mine").then(function(t) {
            console.log("mine是否展示关注公众号组件", t), e.setData({
                ifShowOfficial: t
            });
        });
    },
    goToMiniAppsOne: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.parentIndex;
        console.log(k.mineCenterAD[a].advs[t]), k.clickMine(k.mineCenterAD[a].advs[t]), 
        this.setData({
            mineCenterAD: k.mineCenterAD,
            mineTabShowRedPoint: k.mineTabShowRedPoint
        });
    },
    openContact: function() {
        I.track("WECHAT_MP_CLICK", {
            curPage: "我",
            describ: "客服点击"
        }, E);
    },
    openCityServicePage: function() {
        wx.navigateTo({
            url: "../cityService/cityService"
        });
    },
    closeAD: function() {
        k.aroundSessionNoShowAD = !0, this.setData({
            sessionNoShowAD: !0
        });
    },
    lanzhouDownloadApp: function() {
        this.setData({
            mCanDownloadAndroid: !0
        });
    },
    AndroidloadSuccess: function() {
        this.setData({
            mCanDownloadAndroid: !1
        });
    },
    _getPrompt: function() {
        var e = this;
        x(_.getCityId()).then(function(t) {
            t.menu && t.menu.forEach(function(t) {
                "main" == t.page.trim() && "suggest" == t.id.trim() && N.isSuggestEnable() ? e.setData({
                    suggestEnable: !0
                }) : e.setData({
                    suggestEnable: !1
                });
            }), t.prompt && t.prompt.forEach(function(t) {
                "menu" == t.showOn.trim() && "suggest" == t.referenceId.trim() && "tip" == t.style && wx.getStorageSync("guideSuggestVersion") !== t.version && (e.setData({
                    bubbleContext: t.content,
                    guideSuggestShow: !0
                }), wx.setStorage({
                    key: "guideSuggestVersion",
                    data: t.version
                }));
            });
        });
    },
    closeGuide: function(e) {
        this.setData({
            guideSuggestShow: !1
        });
    },
    enablePullDownRefresh: function() {},
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
        this.closeDownload(), e.detail.isApple || p.default.push({
            name: "increase-download"
        });
    },
    onClickBannerAd: function(e) {
        this.showDownload();
    },
    onClickTopAd: function(e) {
        var t = e.detail;
        f.default.navigate(t) || this.showDownload(), this.setData({
            mineDatalist: k.mineCenterAD
        });
    }
});