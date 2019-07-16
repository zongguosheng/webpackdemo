var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../service/api.core")), r = require("../../utils/util");

Component({
    properties: {},
    data: {},
    methods: {
        formSubmit: function(t) {
            var o = r.getFormId(t);
            e.default.reportFormId(o);
        }
    }
});