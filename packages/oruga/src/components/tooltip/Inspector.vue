<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-tooltip v-bind="s" label="Tooltip!" always>
                    <o-button>
                        Delayed
                    </o-button>
                </o-tooltip>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
        <br/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "contentClass",
                    description: "Class of the tooltip content",
                    action: () => {
                    }
                },
                {
                    class: "triggerClass",
                    description: "Class of the tooltip trigger",
                    action: () => {
                    }
                },
                {
                    class: "multilineClass",
                    description: "Class of the tooltip trigger",
                    action: (cmp) => {
                        cmp.data.multiline = true
                    }
                },
                {
                    class: "arrowClass",
                    description: "Class of the tooltip trigger",
                    action: () => {
                    }
                },
                {
                    class: "arrowOrderClass",
                    description: "Class of the tooltip trigger",
                    properties: ['position'],
                    suffixes: ['top', 'bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "orderClass",
                    description: "Class of the tooltip trigger",
                    properties: ['position'],
                    suffixes: ['top', 'bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "alwaysClass",
                    description: "Class of the tooltip trigger",
                    action: () => {
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the tooltip variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    }
                }
            ]
        };
    },
};
</script>
