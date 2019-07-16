Component({
    behaviors: [],
    properties: {
        placeholder: {
            type: String,
            value: "搜索公交线路、车站、地点"
        },
        searchValue: {
            type: String,
            value: ""
        }
    },
    data: {},
    attached: function() {},
    ready: function() {},
    methods: {
        onSubmitSearch: function(e) {
            var t = e.detail.value.searchValue;
            this.triggerEvent("onSubmitSearch", {
                searchValue: t
            }, {});
        },
        onClickClear: function(e) {
            this.triggerEvent("onClickClear", {}, {});
        },
        onBlur: function(e) {
            var t = e.detail.value;
            this.triggerEvent("onBlur", {
                searchValue: t
            }, {});
        }
    }
});