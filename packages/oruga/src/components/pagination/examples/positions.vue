<template>
    <section>
        <o-pagination
            :current="2"
            :total="100"
            :per-page="10"
            position="left" />

        <o-pagination
            :current="2"
            :total="100"
            :per-page="10"
            position="centered" />

        <o-pagination
            :current="2"
            :total="100"
            :per-page="10"
            position="right" />
    </section>
</template>
