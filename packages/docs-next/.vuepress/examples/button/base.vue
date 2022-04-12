<template>
    <section>
        <o-button @click="clickMe">Click Me</o-button>
    </section>
</template>

<script>
    export default {
        setup() {
            const clickMe = () => {
                alert('Clicked!')
            }
            return {
                clickMe
            }
        }
    }
</script>
