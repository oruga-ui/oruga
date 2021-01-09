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
                    description: "Class of the root element",
                },
                {
                    class: "prevBtnClass",
                    description: "Class of the prev. button",
                },
                {
                    class: "nextBtnClass",
                    description: "Class of the next button",
                },
                {
                    class: "listClass",
                    description: "Class of the pagination list",
                },
                {
                    class: "linkClass",
                    description: "Class of the link button",
                },
                {
                    class: "linkCurrentClass",
                    description: "Class of the current link",
                },
                {
                    class: "ellipsisClass",
                    description: "Class of the pagination ellipsis ",
                },
                {
                    class: "infoClass",
                    description: "Class of the info in `simple` mode",
                    properties: ['simple'],
                    action: (cmp) => {
                        cmp.data.simple = true;
                    }
                },
                {
                    class: "orderClass",
                    description: "Class of the pagination order",
                    properties: ['order'],
                    suffixes: ['centered', 'right', 'left'],
                    action: (cmp) => {
                        cmp.data.order = 'centered';
                    }
                },
                {
                    class: "simpleClass",
                    description: "Class of the pagination in `simple` mode",
                    properties: ['simple'],
                    action: (cmp) => {
                        cmp.data.simple = true;
                    }
                },
                {
                    class: "roundedClass",
                    description: "Class of the pagination when rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    }
                },
                {
                    class: "linkDisabledClass",
                    description: "Class of the disabled link",
                    action: () => {
                        this.current = 20;
                    }
                },
                {
                    class: "sizeClass",
                    description: "Class for the pagination size",
                    properties: ['size'],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'small';
                    }
                }
            ],
        };
    },
};
</script>
