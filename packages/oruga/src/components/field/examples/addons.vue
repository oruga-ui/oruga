<template>
    <section>
        <o-field variant="danger">
            <o-input placeholder="Search..." type="search" icon="search" />
            <o-button variant="primary" label="Search" />
        </o-field>

        <o-field>
            <o-input placeholder="This is expanded" expanded />
            <o-button label="@gmail.com" />
        </o-field>

        <o-field>
            <o-select placeholder="Currency">
                <option>$</option>
                <option>£</option>
                <option>€</option>
            </o-select>
            <o-input type="number" placeholder="0,00" />
            <o-button variant="success" label="Transfer" />
        </o-field>

        <o-field>
            <o-button icon-left="bold" />
            <o-button icon-left="italic" />
            <o-button icon-left="underline" />
            <o-button icon-left="align-left" />
            <o-button icon-left="align-center" />
            <o-button icon-left="align-right" />

            <o-input placeholder="Search..." type="search" icon="search" />
        </o-field>

        <o-field>
            <o-button variant="primary" label="Button" />
            <o-dropdown>
                <template #trigger>
                    <o-button variant="primary" icon-right="caret-down" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </o-field>

        <o-field>
            <o-button variant="primary" label="Button" />
            <o-dropdown>
                <template #trigger>
                    <o-button variant="primary" icon-right="caret-down" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
            <o-button variant="primary" label="Button" />
        </o-field>

        <o-field>
            <o-dropdown>
                <template #trigger>
                    <o-button icon-right="caret-down" label="Filters" />
                </template>

                <o-dropdown-item
                    value="open_issues"
                    label="Open Issues and Pull Requests" />
                <o-dropdown-item value="your_issues" label="Your Issues" />
                <o-dropdown-item
                    value="pull_requests"
                    label="Your Pull Requests" />
                <o-dropdown-item value="everything" label="Everything" />
            </o-dropdown>
            <o-input icon="search" type="search" placeholder="Search..." />
        </o-field>
    </section>
</template>
