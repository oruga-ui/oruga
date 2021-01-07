<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-pagination
                    v-bind='s'
                    :total="total"
                    :current.sync="current"
                    :range-before="rangeBefore"
                    :range-after="rangeAfter"
                    :per-page="perPage"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page"
                    icon-prev='chevron-left'
                    icon-next='chevron-right'
                    >
                </o-pagination>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 200,
            current: 10,
            perPage: 10,
            rangeBefore: 3,
            rangeAfter: 1,
            inspectData: [
                {
                    class: "rootClass",
                    description: "",
                },
                {
                    class: "prevBtnClass",
                    description: "",
                },
                {
                    class: "nextBtnClass",
                    description: "",
                },
                {
                    class: "listClass",
                    description: "",
                },
                {
                    class: "linkClass",
                    description: "",
                },
                {
                    class: "linkCurrentClass",
                    description: "",
                },
                {
                    class: "ellipsisClass",
                    description: "",
                },
                {
                    class: "infoClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.simple = true;
                    }
                },
                {
                    class: "orderClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.order = 'centered';
                    }
                },
                {
                    class: "simpleClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.simple = true;
                    }
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    }
                },
                {
                    class: "linkDisabledClass",
                    description: "",
                    action: () => {
                        this.current = 20;
                    }
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = 'small';
                    }
                }
            ],
        };
    },
};
</script>
