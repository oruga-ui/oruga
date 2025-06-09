<template>
    <section>
        <o-breadcrumb
            :options="[
                {
                    label: 'Home',
                    attrs: { href: '/', disabled: true },
                },
                {
                    label: 'Docs',
                },
                {
                    label: 'Breadcrumb',
                    attrs: { active: true },
                },
            ]" />
    </section>
</template>
