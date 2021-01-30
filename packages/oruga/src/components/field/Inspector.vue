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
                    description: "Class of the root element"
                },
                {
                    class: "horizontalClass",
                    description: "Class to align label and control in horizontal forms",
                    properties: ['horizontal'],
                    specificity: "when <b>mobileClass</b> is applied",
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "groupedClass",
                    description: "Class when fields are grouped together",
                    properties: ['grouped'],
                    action: (cmp) => {
                        cmp.data.grouped = true;
                    }
                },
                {
                    class: "groupMultilineClass",
                    description: "Class when fields fill up multiple lines",
                    properties: ['groupMultiline'],
                    action: (cmp) => {
                        cmp.data.groupMultiline = true;
                    }
                },
                {
                    class: "labelClass",
                    description: "Class for field label"
                },
                {
                    class: "labelSizeClass",
                    description: "Class for field label size",
                    properties: ['labelSize'],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.labelSize = "large";
                    }
                },
                {
                    class: "labelHorizontalClass",
                    description: "Class for field label when horizontal",
                    properties: ['horizontal'],
                    specificity: "when <b>mobileClass</b> is applied",
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "bodyClass",
                    description: "Class for field body"
                },
                {
                    class: "bodyHorizontalClass",
                    description: "Class for field body when horizontal",
                    specificity: "when <b>mobileClass</b> is applied",
                    properties: ['horizontal'],
                    action: (cmp) => {
                        cmp.data.horizontal = true;
                    }
                },
                {
                    class: "addonsClass",
                    description: "Class for components automatically attached together when inside a field",
                    warning: "Use the <code>expanded</code> prop on the control to fill up the remaining space",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "messageClass",
                    description: "Class for the field message",
                    properties: ["message"],
                    action: (cmp) => {
                        cmp.data.message = 'This is a message for the field';
                    }
                },
                {
                    class: "variantClass",
                    description: "Class of the field variant",
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
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
