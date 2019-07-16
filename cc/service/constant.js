module.exports = {
    version: "3.8.35",
    name: "车来了精准实时公交",
    requestParams: {
        s: "h5",
        wxs: "wx_app",
        src: "weixinapp_cx",
        sign: "1",
        v: "3.8.35"
    },
    baseUrl: "https://web.chelaile.net.cn/",
    baseApiUrl: "https://api.chelaile.net.cn/",
    baseOpenUrl: "https://open.chelaile.net.cn/",
    baseDevUrl: "https://dev.chelaile.net.cn/",
    AdBaseUrl: "https://api.chelaile.net.cn",
    tongchengUrl: "https://web.chelaile.net.cn/api/",
    LINESTATE: {
        STATE: {
            ARRIVED: 3,
            STATION_CHANGE: 2,
            LINE_CHANGE: 1,
            NORMAL: 0,
            WAITING: -1,
            LOST: -2,
            OFF_DUTY: -3,
            NOT_START: -4,
            NO_DATA: -5
        },
        STN_STATE: {
            ON_THE_WAY: -2,
            ARRIVED: -1,
            ARRIVING: 0
        },
        RTYPE: {
            REALTIME: 0,
            HISTORY: 1,
            CRAWL: 2
        },
        BUS_STATE: {
            ON_THE_WAY: 0,
            ARRIVED: 1
        },
        DELAY: {
            DELAYED: 1,
            UNDELAYED: 0
        }
    }
};