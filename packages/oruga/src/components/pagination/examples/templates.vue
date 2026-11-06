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

const page = ref(10);

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
        <o-pagination v-model="page" :total="200" :per-page="10">
            <template #default="_props">
                <o-button
                    :label="convertToRoman(_props.number)"
                    :disabled="_props.isCurrent"
                    :aria-label="_props.ariaLabel"
                    :aria-current="_props.ariaCurrent"
                    @click="_props.onClick" />
            </template>

            <template #previous="_props">
                <o-button
                    label="Previous"
                    :disabled="_props.disabled"
                    :aria-label="_props.ariaLabel"
                    @click="_props.onClick" />
            </template>

            <template #next="_props">
                <o-button
                    label="Next"
                    :disabled="_props.disabled"
                    :aria-label="_props.ariaLabel"
                    @click="_props.onClick" />
            </template>
        </o-pagination>
    </section>
</template>
