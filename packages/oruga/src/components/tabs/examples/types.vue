<template>
    <section>
        <o-field label="Boxed/Tabs">
            <o-tabs type="boxed" aria-label="Boxed tabs">
                <o-tab-item label="Pictures" icon="images" />
                <o-tab-item label="Music" icon="music" />
                <o-tab-item label="Words" />
                <o-tab-item label="Videos" icon="video" />
            </o-tabs>
        </o-field>

        <o-field label="Toggle">
            <o-tabs type="toggle" aria-label="Toggle tabs">
                <o-tab-item label="Pictures" icon="images" />
                <o-tab-item label="Music" icon="music" />
                <o-tab-item label="Words" />
                <o-tab-item label="Videos" icon="video" />
            </o-tabs>
        </o-field>

        <o-field label="Pills">
            <o-tabs type="pills" aria-label="Pills tabs">
                <o-tab-item label="Pictures" icon="images" />
                <o-tab-item label="Music" icon="music" />
                <o-tab-item label="Words" />
                <o-tab-item label="Videos" icon="video" />
            </o-tabs>
        </o-field>
    </section>
</template>
