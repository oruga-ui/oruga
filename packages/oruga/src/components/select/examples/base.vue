<template>
    <section>
        <o-field label="Required">
            <o-select placeholder="Select a name" required>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="Billy">billy</option>
            </o-select>
        </o-field>

        <o-field label="Rounded">
            <o-select placeholder="Select a character" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="Billy">billy</option>
            </o-select>
        </o-field>

        <o-field
            label="Error"
            variant="danger"
            message="Something went wrong with this field">
            <o-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="Billy">billy</option>
            </o-select>
        </o-field>

        <o-field label="Disabled">
            <o-select placeholder="Select a character" disabled>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="Billy">billy</option>
            </o-select>
        </o-field>

        <o-field label="Disabled options">
            <o-select placeholder="Select a character">
                <option value="flint" disabled>Flint</option>
                <option value="silver" disabled>Silver</option>
            </o-select>
        </o-field>

        <o-field label="Expanded">
            <o-select placeholder="Select a character" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="Billy" disabled>billy</option>
            </o-select>
        </o-field>
    </section>
</template>
