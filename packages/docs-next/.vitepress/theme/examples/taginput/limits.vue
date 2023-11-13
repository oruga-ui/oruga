<template>
    <section>
        <o-field label="Limited to 10 characters">
            <o-taginput
                :maxlength="10"
                :model-value="['Oruga', 'Vue', 'CSS']" />
        </o-field>

        <o-field label="Limited to 5 tags">
            <o-taginput
                :maxitems="5"
                :model-value="['One', 'Two', 'Three', 'Four']" />
        </o-field>

        <o-field label="Limited to 10 characters and 5 tags">
            <o-taginput
                :maxlength="10"
                :maxitems="5"
                :model-value="['Red', 'Green', 'Blue', 'White']" />
        </o-field>
    </section>
</template>
