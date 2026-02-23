<template>
    <section>
        <o-select
            placeholder="Select a character"
            expanded
            icon="user"
            :options="{
                heisenberg: 'Heisenberg',
                jesse: 'Jesse',
                saul: 'Saul',
                mike: 'Mike',
                jack: 'Jack',
            }" />
    </section>
</template>
