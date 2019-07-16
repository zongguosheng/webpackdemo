var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./api.core")), e = require("../utils/es6-promise"), i = require("city"), n = {
    latitude: "",
    longitude: "",
    type: "wgs",
    valid: function() {
        return !(!this.latitude || !this.longitude);
    },
    set: function(t) {
        this.latitude = t.latitude, this.longitude = t.longitude;
    },
    refresh: function() {
        var t = this, e = wx.pro.getLocation({
            type: "wgs84"
        });
        return e.then(function(e) {
            return t.set(e), e;
        }), e;
    },
    get: function() {
        var n = this;
        return n.latitude && n.longitude ? new e(function(t) {
            t();
        }) : wx.pro.getLocation({
            type: "wgs84"
        }).then(function(e) {
            return n.set(e), t.default.localeCity().then(function(t) {
                t.isSupport && (i.valid() || i.set(t), i.setGpsCity(t));
            });
        });
    }
};

module.exports = n;