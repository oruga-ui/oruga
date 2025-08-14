<script setup lang="ts">
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

function convertToRoman(num: number): string {
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

<template>
    <section>
        <o-pagination v-model:current="current" :total="200" :per-page="10">
            <template #default="props">
                <o-button
                    :label="convertToRoman(props.number)"
                    :disabled="props.isCurrent"
                    :aria-label="props.ariaLabel"
                    @click="props.onClick" />
            </template>

            <template #previous="props">
                <o-button
                    label="Previous"
                    :disabled="props.isCurrent"
                    :aria-label="props.ariaLabel"
                    @click="props.onClick" />
            </template>

            <template #next="props">
                <o-button
                    label="Next"
                    :disabled="props.isCurrent"
                    :aria-label="props.ariaLabel"
                    @click="props.onClick" />
            </template>
        </o-pagination>
    </section>
</template>
