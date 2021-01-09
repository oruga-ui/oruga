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
                    description: ""
                },
                {
                    class: "controlExpandedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "iconsLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconsRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "inputClass",
                    description: ""
                },
                {
                    class: "roundedClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.rounded = true;
                    }
                },
                {
                    class: "iconLeftClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.icon = "envelope";
                    }
                },
                {
                    class: "iconRightClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.iconRight = "times-circle";
                    }
                },
                {
                    class: "counterClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.hasCounter = true;
                        cmp.data.maxlength = 10;
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                    }
                },
                {
                    class: "sizeClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    }
                },
                {
                    class: "variantClass",
                    description: "",
                    action: (cmp) => {
                        cmp.data.fieldvariant = "info";
                    }
                }
            ],
        };
    },
};
</script>
