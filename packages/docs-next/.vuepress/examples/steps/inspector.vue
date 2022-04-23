<template>
    <doc-wrapper :inspect-class="inspectClass">
        <template v-slot:default="s">
            <o-steps v-bind="s" v-model="activeStep">
                <o-step-item v-bind="s" label="Account" icon="user-lock" step="1">
                    <h1 class="title has-text-centered">Account</h1>
                    Lorem ipsum dolor sit amet.
                </o-step-item>
                <o-step-item v-bind="s" label="Profile" icon="user" clickable step="2">
                    <h1 class="title has-text-centered">Profile</h1>
                    Lorem ipsum dolor sit amet.
                </o-step-item>
                <o-step-item v-bind="s" label="Social" icon="user-plus" step="3">
                    <h1 class="title has-text-centered">Social</h1>
                    Lorem ipsum dolor sit amet.
                </o-step-item>
            </o-steps>
        </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData" :subitem="subitem" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
    data() {
        return {
            activeStep: 1,
            subitem: 'step-item',
            inspectClass: {},
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "mobileClass",
                    description: "Class of steps component when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                },
                {
                    class: "sizeClass",
                    description: "Size of the steps",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
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
                    class: "itemClass",
                    description: "Class of the content item",
                    subitem: true
                },
                {
                    class: "itemHeaderClass",
                    description: "Class of the nav item",
                    specificity: "when <b>positionClass</b> is applied",
                    subitem: true
                },
                {
                    class: "itemHeaderActiveClass",
                    description: "Class of the nav item when active",
                    subitem: true
                },
                {
                    class: "itemHeaderPreviousClass",
                    description: "Class of the nav item behind the active one",
                    subitem: true,
                    action: () => {
                        this.activeStep = 2;
                    }
                },
                {
                    class: "itemHeaderVariantClass",
                    description: "Class of the nav item with variant (default value by parent steps component)",
                    subitem: true,
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    }
                },
                {
                    class: "stepsClass",
                    description: "Class of the steps container",
                    specificity: "when <b>positionClass</b> is applied",
                    action: () => {
                    }
                },
                {
                    class: "animatedClass",
                    description: "Class of Steps component when animation gets triggered",
                    properties: ['animated'],
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
                    specificity: "when <b>mobileClass</b> or <b>itemHeaderActiveClass</b> or <b>itemHeaderPreviousClass</b> or <b>positionClass</b> is applied",
                    action: () => {
                    }
                },
                {
                    class: "stepMarkerClass",
                    description: "Class of the Steps component marker",
                    specificity: "when <b>itemHeaderActiveClass</b> or <b>itemHeaderPreviousClass</b> is applied",
                    action: () => {
                    }
                },
                {
                    class: "stepContentClass",
                    description: "Class of the Steps component content",
                    specificity: "when <b>positionClass</b> is applied",
                    action: () => {
                    }
                },
                {
                    class: "stepContentTransitioningClass",
                    description: "Class of the Steps component content when transition is happening",
                    warning: "Click on a marker to see it in action",
                    action: () => {
                    }
                },
                {
                    class: "stepNavigationClass",
                    description: "Class of the Steps component navigation element",
                    specificity: "when <b>positionClass</b> is applied",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkLabelClass",
                    description: "Class of the Step component link label",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkClass",
                    description: "Class of the Steps component link",
                    specificity: "when <b>itemHeaderActiveClass</b> is applied",
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
                }
            ]
        };
    },
};
</script>
