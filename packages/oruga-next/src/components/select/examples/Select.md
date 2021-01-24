## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-field label="Simple">
            <o-select placeholder="Select a name">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Grouped">
            <o-select placeholder="Select a character" icon="user">
                <optgroup label="Black Sails">
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                    <option value="vane">Vane</option>
                    <option value="billy">Billy</option>
                    <option value="jack">Jack</option>
                </optgroup>

                <optgroup label="Breaking Bad">
                    <option value="heisenberg">Heisenberg</option>
                    <option value="jesse">Jesse</option>
                    <option value="saul">Saul</option>
                    <option value="mike">Mike</option>
                </optgroup>

                <optgroup label="Game of Thrones">
                    <option value="tyrion-lannister">Tyrion Lannister</option>
                    <option value="jamie-lannister">Jamie Lannister</option>
                    <option value="daenerys-targaryen">Daenerys Targaryen</option>
                    <option value="jon-snow">Jon Snow</option>
                </optgroup>
            </o-select>
        </o-field>

        <o-field
            label="Error"
            variant="danger"
            message="Something went wrong with this field">
            <o-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Rounded">
            <o-select placeholder="Select a character" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Disabled">
            <o-select placeholder="Select a character" disabled>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Disabled option">
            <o-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver" disabled>Silver</option>
            </o-select>
        </o-field>

        <o-field label="Expanded">
            <o-select placeholder="Select a character" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Size 'large'">
            <o-select
                placeholder="Large"
                size="large">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </o-select>
        </o-field>

        <o-field label="Multiple">
            <o-select
                multiple
                native-size="8"
                v-model="selectedOptions">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="billy">Billy</option>
                <option value="jack">Jack</option>
                <option value="heisenberg">Heisenberg</option>
                <option value="jesse">Jesse</option>
                <option value="saul">Saul</option>
                <option value="mike">Mike</option>
            </o-select>
        </o-field>
    </section>
</template>

<script>
    export default {
      data() {
        return {
          selectedOptions: []
        }
      }
    }
</script>
```
:::
