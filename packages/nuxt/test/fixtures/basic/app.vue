<script setup lang="ts">
const orugaConfig = useConfigProgrammatic().getConfig();
const oruga = useOruga();
const hasProgrammaticApis = Boolean(
    oruga.dialog && oruga.modal && oruga.notification,
);
</script>

<template>
    <main>
        <OButton>Oruga works</OButton>
        <OInput placeholder="Type here" />
        <p id="oruga-config">
            {{ orugaConfig.iconPack }}|{{ orugaConfig.locale }}|{{
                orugaConfig.teleportTarget
            }}
        </p>
        <p id="programmatic-apis">
            {{ hasProgrammaticApis }}
        </p>
    </main>
</template>
