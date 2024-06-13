<script setup lang="ts">
const tabs = [
    {
        label: "Pictures",
        icon: "image",
        content:
            "What light is light, if Silvia be not seen? <br />What joy is joy.",
    },
    {
        label: "Music",
        icon: "music",
        content: "Lorem <br />ipsum <br />dolor <br />sit <br />amet.",
    },
    {
        label: "Articles",
        icon: "pen",
        content:
            "What light is light, if Silvia be not seen? <br />What joy is joy, if Silvia be not by— <br />Unless it be to think that she is by <br />And feed upon the shadow of perfection? <br />Except I be by Silvia in the night, <br />There is no music in the nightingale.",
    },
    {
        label: "Videos",
        icon: "video",
        content:
            "Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congueluctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehiculapulvinar tellus, id sodales felis lobortis eget.",
        disabled: true,
    },
];
</script>

<template>
    <section>
        <o-tabs size="small" type="boxed">
            <o-tab-item
                v-for="(tab, i) in tabs"
                :key="i"
                :value="i"
                :label="tab.label"
                :icon="tab.icon"
                :disabled="tab.disabled" />
        </o-tabs>

        <o-tabs size="medium" type="boxed">
            <o-tab-item
                v-for="(tab, i) in tabs"
                :key="i"
                :value="i"
                :label="tab.label"
                :icon="tab.icon"
                :disabled="tab.disabled" />
        </o-tabs>

        <o-tabs size="large" type="boxed">
            <o-tab-item
                v-for="(tab, i) in tabs"
                :key="i"
                :value="i"
                :label="tab.label"
                :icon="tab.icon"
                :disabled="tab.disabled" />
        </o-tabs>
    </section>
</template>
