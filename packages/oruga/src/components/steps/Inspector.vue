<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-steps v-bind="s">
                    <o-step-item label="Account" icon="user-lock">
                        <h1 class="title has-text-centered">Account</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                    <o-step-item label="Profile" icon="user" clickable>
                        <h1 class="title has-text-centered">Profile</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                    <o-step-item label="Social" icon="user-plus">
                        <h1 class="title has-text-centered">Social</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                </o-steps>
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
                    class: "sizeClass",
                    description: "-",
                    action: () => {
                    }
                },
                {
                    class: "verticalClass",
                    description: "Class of the tooltip trigger",
                    properties: ['vertical'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                    }
                },
                {
                    class: "positionClass",
                    description: "Class of the Steps component when is vertical and its position changes",
                    properties: ['position', 'vertical'],
                    suffixes: ['bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "stepsClass",
                    description: "Class of the steps container",
                    action: () => {
                    }
                },
                {
                    class: "animatedClass",
                    description: "Class of Steps component when animation gets triggered",
                    action: (cmp) => {
                        cmp.data.animated = true
                    }
                },
                {
                    class: "stepMarkerRoundedClass",
                    description: "Class of the Steps markers trigger when are rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "stepDividerClass",
                    description: "Class of the Steps component dividers",
                    action: () => {
                    }
                },
                {
                    class: "stepMarkerClass",
                    description: "Class of the Steps component marker",
                    action: () => {
                    }
                },
                {
                    class: "stepContentClass",
                    description: "Class of the Steps component content",
                    action: () => {
                    }
                },
                {
                    class: "stepContentTransitioningClass",
                    description: "Class of the Steps component content when transition is happening",
                    warning: "Click on the 'Profile' marker to see it in action",
                    action: () => {
                    }
                },
                {
                    class: "stepNavigationClass",
                    description: "Class of the Steps component navigation element",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkLabelClasses",
                    description: "Class of the Step component link label",
                    action: () => {
                    }
                },
                {
                    class: "stepTitleClass",
                    description: "-",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkClass",
                    description: "Class of the Steps component link",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkClickableClass",
                    description: "Class of the Steps component link when clickable",
                    properties: ["clickable"],
                    action: () => {
                    }
                },
                {
                    class: "stepLinkLabelPositionClass",
                    description: "Class of the Step component link label when positioned",
                    properties: ['labelPosition'],
                    suffixes: ['bottom', 'right', 'left'],
                    action: (cmp) => {
                        cmp.data.labelPosition = "right"
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the Steps component variant',
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
