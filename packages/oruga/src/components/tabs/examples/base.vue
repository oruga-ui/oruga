<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(0);
const showBooks = ref(false);
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="showBooks" label="Show Books item" />

            <o-button label="Set Music" @click="activeTab = 1" />
        </o-field>

        <o-tabs v-model="activeTab" destroy-on-hide>
            <o-tab-item :value="0" label="Pictures" icon="image">
                hat light is light, if Silvia be not seen? <br />
                What joy is joy.
            </o-tab-item>

            <o-tab-item :value="1" label="Articles" icon="pen">
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item :value="2" label="Music" icon="music">
                Lorem <br />
                ipsum <br />
                dolor <br />
                sit <br />
                amet.
            </o-tab-item>

            <o-tab-item
                :value="3"
                :visible="showBooks"
                label="Books"
                icon="book">
                What light is light, if Silvia be not seen? <br />
                What joy is joy, if Silvia be not by— <br />
                Unless it be to think that she is by <br />
                And feed upon the shadow of perfection? <br />
                Except I be by Silvia in the night, <br />
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item :value="4" label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend. Curabitur
                pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>
</template>
