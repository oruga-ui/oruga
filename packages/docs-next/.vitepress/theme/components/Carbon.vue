<script setup lang="ts">
import { ref, onMounted, nextTick, watch, useAttrs } from "vue";

const show = ref(false);
const carboncc = ref<any | null>(null);

const attrs = useAttrs();

watch(
    () => attrs.route,
    (to: any, from: any) => {
        const carbonadsObj: any = (window as any)._carbonads;
        if (to.path !== from.path && typeof carbonadsObj === "object") {
            // eslint-disable-next-line no-undef
            carbonadsObj.refresh();
        }
    },
);

onMounted(() => {
    if (new URL(location.href).hostname !== "oruga.io") return;

    nextTick(() => {
        const newScript = document.createElement("script");
        newScript.src =
            "//cdn.carbonads.com/carbon.js?serve=CESI42JW&placement=orugaio";
        newScript.id = "_carbonads_js";
        carboncc.value?.appendChild(newScript);
        setTimeout(() => {
            show.value = true;
            setTimeout(() => {
                document
                    .querySelectorAll("div[id^=carbonads_]")
                    .forEach((el) => el.remove());
            }, 1000);
        }, 1000);
    });
});
</script>

<template>
    <ClientOnly>
        <span v-show="show">
            <div ref="carboncc" class="carbon-container"></div>
            <span class="ad-block-msg">
                If you want to support Oruga, please disable ad blockers on this
                site, if any 🙏
            </span>
        </span>
    </ClientOnly>
</template>

<style lang="css">
div[id^="carbonads_"] {
    display: none;
}
.carbon-container {
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: 300px;
    min-height: 140px;
    min-width: 280px;
    font-size: 0.75rem;
    line-height: 16px;
    margin-bottom: -10px;
}
a {
    color: #444;
    font-weight: normal;
    display: inline;
}
.carbon-img {
    float: left;
    margin-right: 1rem;
    border: 1px solid #444;
}
.carbon-img img {
    display: block;
}
.carbon-poweredby {
    color: #999;
    display: block;
    margin-top: 0.5em;
}
.ad-block-msg {
    font-size: 12px;
    margin-top: -5px;
    color: var(--vp-c-brand);
    font-weight: 500;
}
@media (max-width: 480px) {
    .carbon-ads .carbon-img img {
        width: 100px;
        height: 77px;
    }
}
</style>
