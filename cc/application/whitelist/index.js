function e(e) {
    return 1037 !== e && 1035 !== e;
}

function a(e) {
    var a = e.appId;
    return !!c[a];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var c = {
    wx4fa6145de6213326: "漳州港交通管家",
    wx3aa6e3df1fd0ab03: "东莞交通",
    wxfb2020fd03a41c7c: "东莞巴士",
    wx3818cc86dbef2c5a: "泰安公交",
    wxb72b396bbc1098fb: "北仑公交",
    wx295793171336fa2d: "嘉兴公交乘委会",
    wx10ea3b625e9a65f0: "嘉兴国鸿公交官微",
    wx1759dfa16e8b71b9: "雪城巴士",
    wx4c31343306084c3d: "牡丹江公交集团",
    wxe02c67ade6d6e4d5: "张家口公交",
    wxa0ac4c562ecc0310: "反扒联盟平安公交",
    wxfe7333cbee2166d8: "广汉交通运输",
    wxc29b020394d16fdf: "钟山区道路运输局",
    wxbddfa9a4542032b5: "车来了",
    wx76f54e79ac3d7877: "盐田民意通",
    wxb7a2dab56d4c18f3: "东莞和兴巴士"
};

exports.default = {
    checkPassport: function(c) {
        return e(c.scene) ? {
            pass: !0
        } : a(c.params) ? {
            pass: !0
        } : {
            pass: !1
        };
    }
};