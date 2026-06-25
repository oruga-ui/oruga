<template>
    <section class="odocs-spaced">
        <p>
            <o-pagination
                :model-value="2"
                :total="100"
                :per-page="10"
                position="left" />
        </p>
        <p>
            <o-pagination
                :model-value="2"
                :total="100"
                :per-page="10"
                position="centered" />
        </p>
        <p>
            <o-pagination
                :model-value="2"
                :total="100"
                :per-page="10"
                position="right" />
        </p>
    </section>
</template>
