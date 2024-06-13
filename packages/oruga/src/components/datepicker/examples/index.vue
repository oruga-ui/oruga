<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Trigger from "./trigger.vue";
import TriggerCode from "./trigger.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Events from "./events.vue";
import EventsCode from "./events.vue?raw";

import MonthPicker from "./month-picker.vue";
import MonthPickerCode from "./month-picker.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="min_max">Min/Max date</h3>
    <ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

    <h3 id="range">Range</h3>
    <ExampleViewer :component="Range" :code="RangeCode" />

    <h3 id="multiple">Multiple</h3>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="trigger">Trigger</h3>
    <ExampleViewer :component="Trigger" :code="TriggerCode" />

    <h3 id="programmatically">Programmatically</h3>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

    <h3 id="slots">Slots</h3>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="events">Events</h3>
    <ExampleViewer :component="Events" :code="EventsCode" />

    <h3 id="month_picker">Month picker</h3>
    <ExampleViewer :component="MonthPicker" :code="MonthPickerCode" />
</template>
