<template>
    <section>
        <h2> Buttons </h2>
        <o-button label="Simple" root-class="pippo" />
        <o-button label="Rounded" rounded />
        <o-button label="Outlined" outlined />
        <o-button label="Disabled" disabled />

        <o-button label="Add" icon-left="plus" />
        <o-button icon-left="plus" />

        <h2>Dropdown</h2>
        <o-dropdown aria-role="list">
            <o-button variant="primary" slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
                <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <h2> Form </h2>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <o-field label="Username" label-for="username">
                    <o-input id="username" type="text" placeholder="Username" />
                </o-field>
            </div>
            <div class="mb-6">
                <o-field label="Password" label-for="password" variant="danger" message="Please choose a password">
                    <o-input id="username" type="password" placeholder="Password" />
                </o-field>
            </div>
            <div class="flex items-center justify-between">
                <o-button label="Sign In" native-type="button" />
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return { }
    },
    created() {
        this.$oruga.config.setOptions({
            statusIcon: false,
            button: {
                override: true,
                rootClass: 'btn',
                roundedClass: 'btn-rounded',
                outlinedClass: 'btn-outlined',
                disabledClass: 'btn-disabled'
            },
            field: {
                override: true,
                labelClass: 'field-label',
                messageClass: 'text-xs italic',
                variantClass: 'field-'
            },
            input: {
                override: true,
                inputClass: 'input focus:outline-none focus:shadow-outline',
                roundedClass: 'rounded',
                variantClass: 'input-'
            },
            dropdown: {
                override: true,
                rootClass: 'dropdown',
                menuClass: 'dropdown-menu',
                itemClass: 'dropdown-item'
            }
        })
    },
    beforeDestroy() {
        this.$oruga.config.setOptions({
            statusIcon: true,
            button: {
                override: false,
                rootClass: undefined,
                roundedClass: undefined,
                outlinedClass: undefined,
                disabledClass: undefined
            },
            field: {
                override: false,
                labelClass: undefined
            },
            input: {
                override: false,
                inputClass: undefined,
            }
        });
    }
}
</script>

<style lang="css">

@tailwind base;
@tailwind components;
@tailwind utilities;

.btn {
    @apply font-bold py-2 px-4 bg-blue-500 text-white rounded;
}
.btn-rounded {
    @apply rounded-full;
}
.btn-outlined {
    @apply bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500;
}
.btn-disabled {
    @apply opacity-50 cursor-not-allowed;
}
.field-label {
    @apply block text-gray-700 text-sm font-bold mb-2;
}
.field-danger {
    @apply text-red-500;
}
.input {
    @apply shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight;
}
.input-danger {
    @apply border-red-500;
}
.dropdown {
    @apply inline-flex relative;
}
.dropdown-menu {
    top: 100%;
    min-width: 12em;
    @apply absolute bg-white left-0 m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
    @apply relative block no-underline px-1 py-2 cursor-pointer;
}

</style>