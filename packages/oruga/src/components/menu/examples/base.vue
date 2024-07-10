<template>
    <section>
        <o-menu label="Menu">
            <o-menu-item icon="info-circle" label="Info" />
            <o-menu-item icon="cog" expanded>
                <template #label="props">
                    <span>Administrator</span>
                    <o-icon
                        :icon="props.active ? 'chevron-up' : 'chevron-down'" />
                </template>
                <o-menu-item icon="user" label="Users" />
                <o-menu-item icon="mobile">
                    <template #label> Devices </template>
                </o-menu-item>
                <o-menu-item icon="money-bill" label="Payments" disabled />
            </o-menu-item>
            <o-menu-item icon="user" label="My Account">
                <o-menu-item label="Account data" />
                <o-menu-item label="Addresses" />
            </o-menu-item>
        </o-menu>
        <o-menu>
            <o-menu-item
                label="Documentation"
                icon="link"
                tag="a"
                target="_blank"
                href="/documentation/" />
        </o-menu>
        <o-menu label="Actions">
            <o-menu-item label="Logout" />
        </o-menu>
    </section>
</template>
