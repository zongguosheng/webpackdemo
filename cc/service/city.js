var t = {
    cityId: "",
    cityName: "",
    supportSubway: "",
    gpsCity: {
        cityId: "",
        cityName: "",
        isSupport: 0
    },
    valid: function() {
        return !(!this.cityId || !this.cityName);
    },
    set: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.cityId = t.cityId || "", this.cityName = t.cityName || "", wx.setStorageSync("city", t);
    },
    setGpsCity: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.gpsCity.cityId = t.cityId || "", this.gpsCity.cityName = t.cityName || "", 
        this.gpsCity.isSupport = t.isSupport || 0;
    },
    getSelected: function() {
        return {
            cityId: this.cityId,
            cityName: this.cityName
        };
    },
    getCityId: function() {
        return this.cityId;
    },
    init: function() {
        var t = wx.getStorageSync("city");
        this.set(t);
    }
};

t.init(), module.exports = t;