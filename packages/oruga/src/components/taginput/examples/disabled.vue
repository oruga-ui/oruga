<template>
    <o-field label="Disabled">
        <o-taginput
            :model-value="['One']"
            :data="['One', 'Two', 'Three', 'Four']"
            variant="primary"
            placeholder="Add an item"
            icon="tag"
            disabled
            expanded />
    </o-field>
</template>
