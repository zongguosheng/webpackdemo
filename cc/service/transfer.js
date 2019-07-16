var t = require("constant");

module.exports = {
    depart: {
        origin_lng: "",
        origin_lat: "",
        name: "我的位置"
    },
    arrive: {
        dest_lng: "",
        dest_lat: "",
        name: "你要去哪儿？"
    },
    strategy: 0,
    setSegments: function(t) {
        this.segments = t;
    },
    setStrategy: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.strategy = t;
    },
    validDepart: function() {
        return !(!this.depart.origin_lng || !this.depart.origin_lat);
    },
    validArrive: function() {
        return !(!this.arrive.dest_lng || !this.arrive.dest_lat);
    },
    valid: function() {
        return this.validDepart() && this.validArrive() && this.depart.name !== this.arrive.name;
    },
    setDepart: function(t) {
        this.depart = t;
    },
    setArrive: function(t) {
        this.arrive = t;
    },
    load: function() {
        var e = {
            origin_lng: this.depart.origin_lng,
            origin_lat: this.depart.origin_lat,
            dest_lng: this.arrive.dest_lng,
            dest_lat: this.arrive.dest_lat,
            gpstype: "gcj",
            strategy: this.strategy,
            origin_name: this.depart.name,
            dest_name: this.arrive.name
        };
        return wx.pro.request({
            toast: {
                duration: 4e3
            },
            url: t.baseUrl + "api/transfer/transit!integrate.action",
            data: e
        });
    },
    formatDistance: function(t) {
        return t >= 1e4 ? Math.floor(t / 1e3) + "km" : t >= 1e3 ? parseFloat((t / 1e3).toFixed(1)) + "km" : t + "m";
    },
    formatCost: function(t) {
        return parseFloat(t) ? " · " + parseFloat(t) + "元" : "";
    },
    formatEntrance: function(t) {
        return t ? "(" + t + "进)" : "";
    },
    formatExit: function(t) {
        return t ? "(" + t + "出)" : "";
    },
    reset: function() {
        this.depart = {
            origin_lng: "",
            origin_lat: "",
            name: "我的位置"
        }, this.arrive = {
            dest_lng: "",
            dest_lat: "",
            name: "你要去哪儿？"
        };
    },
    swapLocation: function() {
        var t = "你要去哪儿？" === this.arrive.name ? "你从哪里出发？" : this.arrive.name, e = this.depart.name;
        "我的位置" === this.depart.name ? e = "我的位置" : "你从哪里出发？" === this.depart.name && (e = "你要去哪儿？");
        var i = this.depart.origin_lat, a = this.depart.origin_lng, r = this.arrive.dest_lat, n = this.arrive.dest_lng;
        this.setDepart({
            origin_lat: r,
            origin_lng: n,
            name: t
        }), this.setArrive({
            dest_lat: i,
            dest_lng: a,
            name: e
        });
    },
    goPlan: function() {
        if (this.valid()) wx.navigateTo({
            url: "../transferplan/transferplan"
        }); else {
            var t = "我的位置" === this.depart.name && "你要去哪儿？" !== this.arrive.name, e = "我的位置" === this.arrive.name && "你从哪里出发" !== this.depart.name;
            if (!this.valid() && (e || t)) return wx.showToast({
                icon: "none",
                title: "定位失败",
                duration: 2e3,
                mask: !0
            }), void setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
            wx.navigateBack();
        }
    }
};