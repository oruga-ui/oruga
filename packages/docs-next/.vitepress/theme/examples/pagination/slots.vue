<template>
    <section>
        <o-pagination v-model:current="current" :total="200" :per-page="10">
            <template #default="props">
                <o-pagination-button
                    :id="`page${props.page.number}`"
                    :page="props.page">
                    {{ convertToRoman(props.page.number) }}
                </o-pagination-button>
            </template>
            <template #previous="props">
                <o-pagination-button :page="props.page">
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

<script setup>
import { ref } from "vue";

const basicRomanNumeral = ref([
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "M",
    "MM",
    "MMM",
]);

const current = ref(10);

function convertToRoman(num) {
    const numArray = num.toString().split("");
    const base = numArray.length;
    let count = base - 1;
    return numArray.reduce((roman, digit) => {
        const digitRoman = basicRomanNumeral.value[+digit + count * 10];
        const result = roman + digitRoman;
        count -= 1;
        return result;
    }, "");
}
</script>
