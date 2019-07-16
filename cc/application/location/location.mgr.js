Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../core/location/index")), t = {};

exports.default = {
    getLocationSync: function() {
        return t;
    },
    getLocation: function() {
        return e.default.getLocation({
            type: "wgs84"
        }).then(function(e) {
            return Object.assign(t, e), t;
        });
    }
};