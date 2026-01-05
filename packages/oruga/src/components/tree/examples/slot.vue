<template>
    <section>
        <o-field label="Sibedar">
            <o-tree label="Links" :collapsable="false">
                <o-tree-item icon="link">
                    <template #label>
                        <a href="https://github.com/oruga-ui/" target="_blank">
                            Github
                        </a>
                    </template>
                </o-tree-item>
                <o-tree-item icon="link">
                    <template #label>
                        <a href="/documentation/" target="_blank">
                            Documentation
                        </a>
                    </template>
                </o-tree-item>
            </o-tree>
        </o-field>
    </section>
</template>
