<template>
    <section>
        <o-tabs type="boxed" multiline>
            <o-tab-item
                v-for="(item, index) in new Array(45)"
                :key="`longitem-${index}`"
                :label="`Head ${index}`" />
        </o-tabs>
    </section>
</template>
