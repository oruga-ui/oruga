<script setup lang="ts">
// @ts-expect-error Examples are loaded differently.
import type { OptionsItem } from "../../../../dist/oruga";

const options: OptionsItem[] = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
    { label: "Jack", value: "silver", attrs: { disabled: true } },
];
</script>

<template>
    <section>
        <o-field label="Simple">
            <o-select placeholder="Select a name" required>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field
            label="Error"
            variant="danger"
            message="Something went wrong with this field">
            <o-select placeholder="Select a character" :options="options" />
        </o-field>

        <o-field label="Disabled">
            <o-select
                placeholder="Select a character"
                disabled
                :options="options" />
        </o-field>

        <o-field label="Disabled option">
            <o-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver" disabled>Silver</option>
            </o-select>
        </o-field>

        <o-field label="Rounded">
            <o-select
                placeholder="Select a character"
                rounded
                :options="options" />
        </o-field>

        <o-field label="Expanded">
            <o-select
                placeholder="Select a character"
                expanded
                :options="options" />
        </o-field>
    </section>
</template>
