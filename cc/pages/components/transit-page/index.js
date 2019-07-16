Component({
    behaviors: [],
    properties: {},
    data: {
        start: [],
        dest: [],
        items: []
    },
    attached: function() {},
    ready: function() {},
    methods: {
        clearHistory: function() {},
        clearTransferPlan: function() {
            var e = this;
            Recent.showClearModel().then(function(n) {
                n.confirm && (Recent.removeTransferPlanHistory(), e.setData({
                    transferPlanHistories: Recent.loadTransferPlanHistory()
                }));
            });
        },
        goPlan: function() {
            Transfer.goPlan();
        },
        transferPlanClick: function(e) {
            var n = e.currentTarget.dataset.poi, t = function() {
                var e = {
                    origin_lng: n.origin_lng,
                    origin_lat: n.origin_lat,
                    name: n.origin_name
                }, t = {
                    dest_lng: n.dest_lng,
                    dest_lat: n.dest_lat,
                    name: n.dest_name
                };
                "我的位置" === n.origin_name && (e.origin_lat = GPS.latitude, e.origin_lng = GPS.longitude), 
                "我的位置" === n.dest_name && (t.dest_lng = GPS.longitude, t.dest_lat = GPS.latitude), 
                Transfer.setDepart(e), Transfer.setArrive(t), wx.navigateTo({
                    url: "../transferplan/transferplan"
                });
            };
            "我的位置" !== n.origin_name && "我的位置" !== n.dest_name || GPS.valid() ? t() : wx.openSetting({
                success: function(e) {
                    e.authSetting["scope.userLocation"] ? GPS.refresh().then(function() {
                        t();
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
            "click" === e && Transfer.reset();
            var n = !1;
            Transfer.valid() && (n = !0), this.setData({
                adSite: 3,
                canTransfer: n,
                transferPlanHistories: Recent.loadTransferPlanHistory(),
                loadSuccess: !0,
                transfer: {
                    depart: Transfer.depart,
                    arrive: Transfer.arrive
                }
            });
        }
    }
});