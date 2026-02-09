<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string>();
</script>

<template>
    <section>
        <o-tree v-model="selected" selectable>
            <o-tree-item icon="folder" label="Documents" value="documents">
                <o-tree-item icon="cog" label="Work" value="work">
                    <o-tree-item
                        icon="file"
                        label="Expenses.doc"
                        value="expanses" />
                    <o-tree-item
                        icon="file"
                        label="Resume.doc"
                        value="resume" />
                </o-tree-item>

                <o-tree-item icon="home" label="Home" value="home">
                    <o-tree-item
                        icon="file"
                        label="Invoices.txt"
                        value="invoices" />
                </o-tree-item>
            </o-tree-item>

            <o-tree-item icon="cog" label="Events" value="events">
                <o-tree-item
                    icon="calendar-plus"
                    label="Meeting"
                    value="meeting" />
                <o-tree-item
                    icon="calendar-plus"
                    label="Product Launch"
                    value="launch" />
                <o-tree-item
                    icon="calendar-plus"
                    label="Report Review"
                    value="review" />
            </o-tree-item>

            <o-tree-item icon="star" label="Movies" value="movies">
                <o-tree-item icon="star" label="Al Pacino" value="al-paciono">
                    <o-tree-item
                        icon="video"
                        label="Scarface"
                        value="scarface" />
                    <o-tree-item icon="video" label="Serpico" value="serpico" />
                </o-tree-item>

                <o-tree-item
                    icon="star"
                    label="Robert De Niro"
                    value="robert-deniro">
                    <o-tree-item
                        icon="video"
                        label="Goodfellas"
                        value="goodfellas" />
                    <o-tree-item
                        icon="video"
                        label="Untouchables"
                        value="untouchables" />
                </o-tree-item>
            </o-tree-item>
        </o-tree>

        <p><b> Selected:</b> {{ selected }}</p>
    </section>
</template>
