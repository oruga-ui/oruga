<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field v-bind="s" label="Field">
                    <o-input name="name" placeholder="Name" expanded></o-input>
                    <o-input name="email" type="email" placeholder="nobody@nowhere.com" expanded></o-input>
                </o-field>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: ""
                },
                {
                    class: "horizontalClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "groupedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.grouped = true;
                    }
                },
                {
                    class: "groupMultilineClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.groupMultiline = true;
                    }
                },
                {
                    class: "labelClass",
                    description: ""
                },
                {
                    class: "labelSizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.labelSize = "large";
                    }
                },
                {
                    class: "labelHorizontalClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "bodyClass",
                    description: ""
                },
                {
                    class: "bodyHorizontalClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "addonsClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "messageClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.message = 'This is a message for the field';
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.variant = "info";
                        cmp.data.message = 'This is a message for the field';
                    }
                }
            ],
        };
    },
};
</script>
