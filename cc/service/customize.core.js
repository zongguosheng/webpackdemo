Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = {
    zhagnzhou: {
        from: "zhangzhou20180925"
    },
    xiamen: {
        appId: "wx9f9d7e7416eafed8"
    },
    dongguan: {
        from: "dongguanjiaotong"
    },
    dongguanbashi: {
        from: "dongguanbashi"
    },
    taian: {
        from: "tianxiataian"
    },
    liupanshui: {
        from: "liupanshui"
    }
}, a = {
    DEFAULT: 0,
    ZhangZhou: 1,
    XiaMen: 2,
    DongGuan: 3,
    DongGuanBus: 4,
    TaiAn: 5,
    LiuPanShui: 6
};

exports.default = {
    Const: a,
    get: function(e) {
        return 1035 !== e.scene && 1012 !== e.scene || e.from !== n.zhagnzhou.from ? e.appId === n.xiamen.appId ? a.XiaMen : 1035 !== e.scene && 1012 !== e.scene || e.from !== n.dongguan.from ? 1035 !== e.scene && 1012 !== e.scene || e.from !== n.dongguanbashi.from ? 1035 !== e.scene && 1012 !== e.scene || e.from !== n.taian.from ? 1035 !== e.scene && 1012 !== e.scene || e.from !== n.liupanshui.from ? a.DEFAULT : a.LiuPanShui : a.TaiAn : a.DongGuanBus : a.DongGuan : a.ZhangZhou;
    }
};