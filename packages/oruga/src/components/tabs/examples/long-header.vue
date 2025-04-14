<template>
    <section>
        <o-tabs type="boxed" multiline>
            <o-tab-item
                v-for="(item, index) in new Array(45)"
                :key="`longitem-${index}`"
                :label="`Head ${index}`"
                :icon="index % 2 === 0 ? 'book' : ''" />
        </o-tabs>
    </section>
</template>
