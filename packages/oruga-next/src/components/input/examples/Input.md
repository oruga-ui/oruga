
## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-field label="Name">
            <o-input v-model="name"></o-input>
        </o-field>

        <o-field label="Email"
            variant="danger"
            message="This email is invalid">
            <o-input type="email"
                value="john@"
                maxlength="30">
            </o-input>
        </o-field>

        <o-field label="Username"
            variant="success"
            message="This username is available">
            <o-input value="johnsilver" maxlength="30"></o-input>
        </o-field>

        <o-field label="Password">
            <o-input type="password"
                value="iwantmytreasure"
                password-reveal>
            </o-input>
        </o-field>

        <o-field label="Message">
            <o-input maxlength="200" type="textarea"></o-input>
        </o-field>

        <o-field>
            <o-input placeholder="No label"></o-input>
        </o-field>

        <o-field label="Rounded">
            <o-input placeholder="No label" rounded></o-input>
        </o-field>

        <o-field label="Success" variant="success">
            <o-input placeholder="Success"></o-input>
        </o-field>

        <o-field label="Error"
            variant="danger"
            message="You can have a message too">
            <o-input placeholder="Error"></o-input>
        </o-field>

        <o-field label="Info" variant="info">
            <o-input placeholder="Info"></o-input>
        </o-field>

        <o-field label="Warning" variant="warning">
            <o-input placeholder="Warning"></o-input>
        </o-field>

        <o-field label="Disabled">
            <o-input placeholder="Disabled" disabled></o-input>
        </o-field>

        <o-field>
            <o-input placeholder="Large"
                size="large"
                icon="user">
            </o-input>
        </o-field>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>
```
:::

### Base

::: demo
```html
<template>
    <section>
        <h3 class="subtitle">With Icons</h3>
        <o-field>
            <o-input placeholder="Search..."
                type="search"
                icon="search"
                icon-clickable
                @icon-click="searchIconClick">
            </o-input>
        </o-field>

        <o-field>
            <o-input placeholder="Email"
                v-model="email"
                type="email"
                icon="envelope"
                icon-right="times-circle"
                icon-right-clickable
                @icon-right-click="clearIconClick">
            </o-input>
        </o-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                email: ''
            }
        },
        methods: {
            searchIconClick() {
                alert('You wanna make a search?')
            },
            clearIconClick() {
                this.email = '';
                alert('Email cleared!')
            }
        }
    }
</script>
```
:::