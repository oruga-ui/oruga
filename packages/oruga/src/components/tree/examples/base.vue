<template>
    <section>
        <o-field label="Sidebar">
            <o-tree>
                <o-tree-item icon="folder" label="Documents">
                    <o-tree-item icon="cog" label="Work">
                        <o-tree-item icon="file" label="Expenses.doc" />
                        <o-tree-item icon="file" label="Resume.doc" />
                    </o-tree-item>

                    <o-tree-item icon="home" label="Home">
                        <o-tree-item icon="file" label="Invoices.txt" />
                    </o-tree-item>
                </o-tree-item>

                <o-tree-item icon="cog" label="Events">
                    <o-tree-item icon="calendar-plus" label="Meeting" />
                    <o-tree-item icon="calendar-plus" label="Product Launch" />
                    <o-tree-item icon="calendar-plus" label="Report Review" />
                </o-tree-item>

                <o-tree-item icon="star" label="Movies">
                    <o-tree-item icon="star" label="Al Pacino">
                        <o-tree-item icon="video" label="Scarface" />
                        <o-tree-item icon="video" label="Serpico" />
                    </o-tree-item>

                    <o-tree-item icon="star" label="Robert De Niro">
                        <o-tree-item icon="video" label="Goodfellas" />
                        <o-tree-item icon="video" label="Untouchables" />
                    </o-tree-item>
                </o-tree-item>
            </o-tree>
        </o-field>
    </section>
</template>
