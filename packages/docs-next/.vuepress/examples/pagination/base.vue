<template>
  <section>
    <o-field grouped group-multiline>
      <o-field label="Total">
        <o-input type="number" v-model="total"></o-input>
      </o-field>
      <o-field label="Items per page">
        <o-input type="number" v-model="perPage"></o-input>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Show buttons before current">
        <o-input type="number" v-model="rangeBefore" min="0"></o-input>
      </o-field>
      <o-field label="Show buttons after current">
        <o-input type="number" v-model="rangeAfter" min="0"></o-input>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Order">
        <o-select v-model="order">
          <option value="">default</option>
          <option value="centered">centered</option>
          <option value="right">right</option>
        </o-select>
      </o-field>
      <o-field label="Size">
        <o-select v-model="size">
          <option value="">default</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </o-select>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Previous icon">
        <o-select v-model="prevIcon">
          <option value="chevron-left">Chevron</option>
          <option value="arrow-left">Arrow</option>
        </o-select>
      </o-field>
      <o-field label="Next icon">
        <o-select v-model="nextIcon">
          <option value="chevron-right">Chevron</option>
          <option value="arrow-right">Arrow</option>
        </o-select>
      </o-field>
    </o-field>
    <div class="block">
      <o-switch v-model="isSimple">Simple</o-switch>
      <o-switch v-model="isRounded">Rounded</o-switch>
    </div>

    <hr />
    <o-pagination
      :total="total"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </o-pagination>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const rangeBefore = ref(3)
    const rangeAfter = ref(1)
    const isSimple = ref(false)
    const isRounded = ref(false)
    const prevIcon = ref('chevron-left')
    const nextIcon = ref('chevron-right')
    const total = ref(200)
    const current = ref(10)
    const perPage = ref(10)
    const order = ref('')
    const size = ref('')

    return {
      total,
      current,
      perPage,
      rangeBefore,
      rangeAfter,
      order,
      size,
      isSimple,
      isRounded,
      prevIcon,
      nextIcon
    }
  }
})
</script>
