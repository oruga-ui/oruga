<template>
    <section>
        <h1> Buttons </h1>
        <div>
          <o-button label="Simple" root-class="pippo" />
          <o-button label="Rounded" rounded />
          <o-button label="Outlined" outlined />
          <o-button label="Disabled" disabled />

          <o-button label="Add" icon-left="plus" />
          <o-button icon-left="plus" />
        </div>

        <br>

        <h1>Dropdown</h1>
        <o-dropdown aria-role="list">
            <o-button variant="primary" slot="trigger" slot-scope="{ active }">
                <span>Click me!</span>
                <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
            </o-button>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
        </o-dropdown>

        <br> <br>

        <h1> Form </h1>
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