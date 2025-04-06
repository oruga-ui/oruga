<template>
    <section>
        <o-field grouped variant="danger" message="What do you want to search?">
            <o-input placeholder="Search..." />
            <o-button variant="primary" label="Search" />
        </o-field>

        <o-field grouped message="What do you want to search?">
            <o-input placeholder="Search..." expanded />
            <o-button variant="primary" label="Search" />
        </o-field>

        <o-field grouped multiline>
            <o-input aria-label="some input" />
            <o-button>First</o-button>
            <o-button>Second</o-button>
            <o-button>Third</o-button>
            <o-button>Fourth</o-button>
            <o-button>Fifth</o-button>
            <o-button>Sixth</o-button>
            <o-button>Seventh</o-button>
            <o-button>Eighth</o-button>
        </o-field>
    </section>
</template>
