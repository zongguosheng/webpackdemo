Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "release", t = e;

exports.default = {
    DEV: "dev",
    TRIAL: "trial",
    RELEASE: e,
    get env() {
        return t;
    },
    set env(r) {
        t = r ? r.toLowerCase() : e;
    }
};