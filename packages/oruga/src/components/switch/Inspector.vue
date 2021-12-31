<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-switch v-bind="s" v-model="checkValue">Switch</o-switch>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkValue: true,
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "inputClass",
                    description: "Root class of the native input checkbox",
                },
                {
                    class: "checkClass",
                    description: "Class of the switch check",
                    action: () => {
                    }
                },
                {
                    class: "checkCheckedClass",
                    description: "Class of the switch check when checked",
                    action: () => {
                        this.checkValue = true;
                    }
                },
                {
                    class: "checkSwitchClass",
                    description: "Class of the switch check",
                },
                {
                    class: "roundedClass",
                    description: "Class of the switch when rounded",
                    properties: ["rounded"],
                    action: (cmp) => {
                        cmp.data.rounded = true
                    }
                },
                {
                    class: "disabledClass",
                    description: "Class when slider is disabled",
                    properties: ["disabled"],
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "labelClass",
                    description: "Class of the switch label"
                },
                {
                    class: "positionClass",
                    description: "Class of switch label position",
                    properties: ["position"],
                    action: (cmp) => {
                        cmp.data.position = 'left';
                    }
                },
                {
                    class: 'sizeClass',
                    description : 'Class of the switch size',
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    }
                },
                {
                    class: 'variantClass',
                    description : 'Class of the switch variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                        this.checkValue = true;
                    }
                },
                {
                    class: "passiveVariantClass",
                    description : 'Class of the switch passive variant',
                    properties: ["passiveVariant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.passiveVariant = 'danger';
                        this.checkValue = false;
                    }
                }
            ],
        };
    },
};
</script>
