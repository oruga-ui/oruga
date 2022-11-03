<template>
  <section>
    <o-pagination :total="200" v-model:current="current" :per-page="10">
      <template #default="props">
        <o-pagination-button
          :page="props.page"
          :id="`page${props.page.number}`"
        >
          {{ convertToRoman(props.page.number) }}
        </o-pagination-button>
      </template>
      <template #previous="props">
        <o-pagination-button
          :page="props.page"
        >
          Previous
        </o-pagination-button>
      </template>
      <template #next="props">
        <o-pagination-button :page="props.page">
          Next
        </o-pagination-button>
      </template>
    </o-pagination>
  </section>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const basicRomanNumeral = ref([
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'M',
      'MM',
      'MMM'
    ])

    function convertToRoman(num) {
      const numArray = num.toString().split('')
      const base = numArray.length
      let count = base - 1
      const convertedRoman = numArray.reduce((roman, digit) => {
        const digitRoman = basicRomanNumeral.value[+digit + count * 10]
        const result = roman + digitRoman
        count -= 1
        return result
      }, '')
      return convertedRoman
    }
    const current = ref(10)

    /*
    watch($route, (newVal, oldVal) => {
      if (newVal.hash) {
        current.value = parseInt(newVal.hash.replace(/\#page/g, ''))
      }
    })
    */

    return {
      current,
      basicRomanNumeral,
      convertToRoman
    }
  }
})
</script>
