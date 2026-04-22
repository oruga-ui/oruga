<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Delay from "./delay.vue";
import DelayCode from "./delay.vue?raw";
</script>

<template>
    <h3>Base</h3>

    <p>
        Usually the trigger element for a popover is a `button` element.
        However, you can also use any other HTML element. By default, opening a
        popover will close any other open popovers and it can be closed by
        clicking outside the content. The behavior can be changed with the
        <code>behavior</code> property.
    </p>

    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        If your trigger does not have a visible label, provide an accessible or
        visually hidden label and communicates the popover's state to assistive
        technologies.
    </div>

    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        Use the <code>aria-haspopup</code> attribute on the trigger to indicate
        the type of interactive popup that this element triggers, usually
        <code>dialog</code> or <code>menu</code>; this should match the role of
        the popover. You can see all possible values
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup">
            here
        </a>
        .
    </div>

    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3>Position</h3>

    <p>
        The direction in which the popover opens can be explicity defined using
        the `position` property. By default, the direction is automatically
        calculated based on the distance to the edge of the window.
    </p>
    <p>
        Additionally, adding the `teleport` property will move the content to
        the referenced DOM location instead of the current one.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3>Delay</h3>
    <p>
        The appearance of the content can be delayed using the
        <code>delay</code> property.
    </p>
    <ExampleViewer :component="Delay" :code="DelayCode" />
</template>
