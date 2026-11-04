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

const total = 200;
const perPage = 10;
const pageCount = Math.ceil(total / perPage);

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
        <o-pagination v-model="page" :total="total" :per-page="perPage">
            <template #default="props">
                <!-- aria-current marks the current page; it must stay focusable, so do not disable it -->
                <o-button
                    :label="convertToRoman(props.number)"
                    :aria-label="`Page ${convertToRoman(props.number)}`"
                    :aria-current="props.isCurrent ? 'page' : undefined"
                    @click="props.onClick" />
            </template>

            <template #previous="props">
                <!-- number is the target page, so it is out of range on the first page -->
                <o-button
                    label="Previous"
                    :disabled="props.number < 1"
                    :aria-label="props.ariaLabel"
                    @click="props.onClick" />
            </template>

            <template #next="props">
                <o-button
                    label="Next"
                    :disabled="props.number > pageCount"
                    :aria-label="props.ariaLabel"
                    @click="props.onClick" />
            </template>
        </o-pagination>
    </section>
</template>
