<script setup>
import { ref } from "vue";

const expanded = ref(false);
const atRight = ref(false);
const size = ref(null);
const type = ref("default");
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-field>
                <o-switch v-model="atRight" label="Right position" />
            </o-field>
            <o-field>
                <o-switch v-model="expanded" label="Expanded" />
            </o-field>
            <o-field label="Size">
                <o-select v-model="size" placeholder="Size">
                    <option :value="null">Default</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </o-select>
            </o-field>
            <o-field label="Type">
                <o-select v-model="type" placeholder="Type">
                    <option value="default">Default</option>
                    <option value="boxed">Boxed</option>
                    <option value="toggle">Toggle</option>
                </o-select>
            </o-field>
        </o-field>

        <o-tabs
            :position="atRight ? 'right' : ''"
            :size="size"
            :type="type"
            vertical
            :expanded="expanded">
            <o-tab-item label="Pictures" icon="images">
                Lorem ipsum dolor sit amet. <br />
                Lorem ipsum dolor sit amet. <br />
                Lorem ipsum dolor sit amet. <br />
                Lorem ipsum dolor sit amet. <br />
                Lorem ipsum dolor sit amet. <br />
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music" icon="music">
                What light is light, if Silvia be not seen? <br />
                What joy is joy, if Silvia be not by— <br />
                Unless it be to think that she is by <br />
                And feed upon the shadow of perfection? <br />
                Except I be by Silvia in the night, <br />
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend. Curabitur
                pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>
</template>
