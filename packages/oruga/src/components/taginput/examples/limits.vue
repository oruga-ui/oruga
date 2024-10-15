<template>
    <section>
        <o-field label="Limited to 10 characters">
            <o-taginput
                :model-value="['Oruga', 'Vue', 'CSS']"
                :maxlength="10"
                placeholder="Add new item"
                allow-new />
        </o-field>

        <o-field label="Limited to 5 tags">
            <o-taginput
                :model-value="['One', 'Two', 'Three', 'Four']"
                :maxitems="5"
                placeholder="Add new item"
                allow-new />
        </o-field>

        <o-field label="Limited to 10 characters and 5 tags">
            <o-taginput
                :model-value="['Red', 'Green', 'Blue', 'White']"
                :maxlength="10"
                :maxitems="5"
                placeholder="Add new item"
                allow-new />
        </o-field>
    </section>
</template>
