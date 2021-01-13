<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field :variant="s.fieldvariant">
                    <o-input v-bind="s" placeholder="Input"></o-input>
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
                    class: "expandedClass",
                    description: "Class of input when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "iconLeftSpaceClass",
                    description: "Class of the left icon space inside the input",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconRightSpaceClass",
                    description: "Class of the right icon space inside the input",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "inputClass",
                    description: "Class of the native input element"
                },
                {
                    class: "roundedClass",
                    description: "Class of input when rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "Class of the left icon",
                    properties: ['icon'],
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconRightClass",
                    description: "Class of the right icon",
                    properties: ['iconRight'],
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "counterClass",
                    description: "Class of the counter element",
                    properties: ['hasCounter', 'maxlength'],
                    action: (cmp) => {
                        cmp.data.hasCounter = true;
                        cmp.data.maxlength = 10;
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                    }
                },
               {
                    class: "sizeClass",
                    description : 'Class of the input size',
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = "large";
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the input variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.fieldvariant = "warning";
                    }
                },
            ],
        };
    },
};
</script>
