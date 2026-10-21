<script setup lang="ts">
import { ref } from "vue";

type Animation =
    | "fade"
    | "scale"
    | "zoom-out"
    | "slide-up"
    | "slide-down"
    | "slide-from-left"
    | "slide-from-right"
    | "slide-from-top"
    | "slide-from-bottom";

const active = ref(false);
const position = ref<"left" | "top" | "bottom" | "right">("left");
/** `undefined` is the default, which slides in from the edge of the position */
const animation = ref<Animation | false | undefined>(undefined);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Position">
                <o-select v-model="position">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </o-select>
            </o-field>
            <o-field label="Animation">
                <o-select
                    v-model="animation"
                    placeholder="Default (slide from edge)">
                    <option :value="undefined">
                        Default (slide from edge)
                    </option>
                    <option :value="false">None</option>
                    <option value="fade">fade</option>
                    <option value="scale">scale</option>
                    <option value="zoom-out">zoom-out</option>
                    <option value="slide-up">slide-up</option>
                    <option value="slide-down">slide-down</option>
                    <option value="slide-from-left">slide-from-left</option>
                    <option value="slide-from-right">slide-from-right</option>
                    <option value="slide-from-top">slide-from-top</option>
                    <option value="slide-from-bottom">slide-from-bottom</option>
                </o-select>
            </o-field>
        </o-field>

        <o-button
            label="Show Drawer"
            variant="primary"
            @click="active = true" />

        <o-drawer
            v-model:active="active"
            backdrop
            closeable
            title="Animation"
            content="The animation is played when the drawer opens and closes. It is skipped when the user prefers reduced motion."
            :position="position"
            :animation="animation" />
    </section>
</template>
