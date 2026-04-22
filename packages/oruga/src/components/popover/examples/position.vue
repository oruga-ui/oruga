<script setup lang="ts">
import { ref } from "vue";

const teleport = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-field>
            <o-switch v-model="teleport" label="Teleport to Body" />
        </o-field>

        <p>
            <o-popover position="right" :teleport="teleport">
                <o-button label="Right Popover" />

                <template #content>
                    <h4>Heading</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur warning elit.
                        Fusce id fermentum quam
                    </p>
                    <a href="#">Some Link</a>
                </template>
            </o-popover>

            <o-popover position="top" :teleport="teleport">
                <o-button label="Top Popover" />

                <template #content>
                    <h4>Heading</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur warning elit.
                        Fusce id fermentum quam
                    </p>
                    <a href="#">Some Link</a>
                </template>
            </o-popover>

            <o-popover position="bottom" :teleport="teleport">
                <o-button label="Bottom Popover" />

                <template #content>
                    <h4>Heading</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur warning elit.
                        Fusce id fermentum quam
                    </p>
                    <a href="#">Some Link</a>
                </template>
            </o-popover>

            <o-popover position="left" :teleport="teleport">
                <o-button label="Left Popover" />

                <template #content>
                    <h4>Heading</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur warning elit.
                        Fusce id fermentum quam
                    </p>
                    <a href="#">Some Link</a>
                </template>
            </o-popover>
        </p>
    </section>
</template>
