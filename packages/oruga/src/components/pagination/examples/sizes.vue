<template>
    <section class="odocs-spaced">
        <p>
            <o-pagination
                :current="2"
                :total="100"
                :per-page="10"
                size="small" />
        </p>
        <p>
            <o-pagination :current="2" :total="100" :per-page="10" />
        </p>
        <p>
            <o-pagination
                :current="2"
                :total="100"
                :per-page="10"
                size="medium" />
        </p>
        <p>
            <o-pagination
                :current="2"
                :total="100"
                :per-page="10"
                size="large" />
        </p>
    </section>
</template>
