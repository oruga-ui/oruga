<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

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
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="min_max">Min/Max date</h3>
        <p>
            Use the <code>min-date</code> and <code>max-date</code> props to
            define a limited date range for the user to choose from.
        </p>
        <ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

        <h3 id="range">Range</h3>
        <p>
            Let the user select a date range by setting the
            <code>range</code> prop.
        </p>
        <ExampleViewer :component="Range" :code="RangeCode" />

        <h3 id="multiple">Multiple</h3>
        <p>
            When the <code>multiple</code> prop is set, the user can select
            multiple dates at once. Also, the <code>modelValue</code> prop will
            be an array of date objects instead of a single date object.
        </p>
        <ExampleViewer :component="Multiple" :code="MultipleCode" />

        <h3 id="events">Events</h3>
        <p>
            To render the component inline instead of a dropdown/modal use the
            <code>inline</code> prop.
        </p>
        <p>
            The calendar can display indicators for events on specific dates by
            passing a list to the <code>events</code> prop.
        </p>
        <ExampleViewer :component="Events" :code="EventsCode" />

        <h3 id="slots">Slots</h3>
        <p>
            The component can be customized through several slots, e.g. the HTML
            input can be replaced by a custom trigger to open the dropdown/modal
            through the <code>trigger</code> slot. The header and footer can be
            overridden using the <code>header</code> and
            <code>footer</code> slots.
        </p>
        <ExampleViewer :component="Slots" :code="SlotsCode" />

        <h3 id="programmatically">Programmatically</h3>
        <p>
            The dorpdown/modal can be opened programmatically setting the
            <code>active</code> prop, which is also two-way bindable.
        </p>
        <ExampleViewer
            :component="Programmatically"
            :code="ProgrammaticallyCode" />

        <h3 id="month_picker">Month picker</h3>
        <p>
            Instead of picking a full date by setting the <code>type</code> prop
            to "month", the component will only render a month selector.
        </p>
        <ExampleViewer :component="MonthPicker" :code="MonthPickerCode" />
    </div>
</template>
