<template>
    <section>
        <o-collapse expanded>
            <template #trigger="{ open }">
                <h3 class="trigger">
                    <o-icon :icon="open ? 'chevron-down' : 'chevron-right'" />
                    {{ open ? "Close" : "Open" }} Collapse!
                </h3>
            </template>

            <div class="notification">
                <h4>Subtitle</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <br />
                    Nulla accumsan, metus ultrices eleifend gravida, nulla nunc
                    varius lectus, nec rutrum justo nibh eu lectus.
                    <br />
                    Ut vulputate semper dui. Fusce erat odio, sollicitudin vel
                    erat vel, interdum mattis neque.
                </p>
            </div>
        </o-collapse>
    </section>
</template>

<style lang="css" scoped>
.trigger {
    padding: 1rem;
    background-color: var(--vp-c-brand-2);
    color: white;
    box-shadow:
        0 2px 3px hsla(0, 0%, 4%, 0.1),
        0 0 0 1px hsla(0, 0%, 4%, 0.1);
    text-align: center;
}
</style>
