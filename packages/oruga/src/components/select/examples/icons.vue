<template>
    <section>
        <o-field>
            <o-select
                placeholder="Select a name"
                aria-label="Name with search icon"
                icon="search"
                icon-clickable>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field>
            <o-select
                placeholder="Select a name"
                aria-label="Name with envelope and clear icons"
                icon="envelope"
                icon-right="times-circle"
                icon-right-clickable>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>
    </section>
</template>
