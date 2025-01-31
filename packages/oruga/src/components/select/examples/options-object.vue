<template>
    <section>
        <o-field label="Select a character">
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
        </o-field>
    </section>
</template>
