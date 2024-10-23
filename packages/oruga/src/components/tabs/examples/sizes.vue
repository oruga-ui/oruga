<script setup lang="ts">
import type { OptionsProp } from "@oruga-ui/oruga-next";

const options: OptionsProp = [
    {
        label: "Pictures",
        value: 0,
        attrs: {
            icon: "image",
            content:
                "What light is light, if Silvia be not seen? What joy is joy.",
        },
    },
    {
        label: "Music",
        value: 1,
        attrs: {
            icon: "music",
            content: "Lorem ipsum dolor sit amet.",
        },
    },
    {
        label: "Articles",
        value: 2,
        attrs: {
            icon: "pen",
            content:
                "What light is light, if Silvia be not seen? What joy is joy, if Silvia be not by— Unless it be to think that she is by And feed upon the shadow of perfection? Except I be by Silvia in the night, There is no music in the nightingale.",
        },
    },
    {
        label: "Videos",
        value: 3,
        attrs: {
            icon: "video",
            content:
                "Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congueluctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehiculapulvinar tellus, id sodales felis lobortis eget.",
            disabled: true,
        },
    },
];
</script>

<template>
    <section>
        <o-tabs size="small" type="boxed" :options="options" />

        <o-tabs size="medium" type="boxed" :options="options" />

        <o-tabs size="large" type="boxed" :options="options" />
    </section>
</template>
