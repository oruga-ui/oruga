---
title: Skeleton
---

# Skeleton

> Base component, contains and wrap all the other components.

---

## Demo

::: demo
<template>
    <section>
        <o-field grouped group-multiline>
            <div class="control">
                <o-switch v-model="animated">Animated</o-switch>
            </div>
        </o-field>
        <o-skeleton width="20%" :animated="animated"></o-skeleton>
        <o-skeleton width="40%" :animated="animated"></o-skeleton>
        <o-skeleton width="80%" :animated="animated"></o-skeleton>
        <o-skeleton :animated="animated"></o-skeleton>
    </section>
</template>

<script>
export default {
    data() {
        return {
            animated: true
        }
    }
}
</script>

