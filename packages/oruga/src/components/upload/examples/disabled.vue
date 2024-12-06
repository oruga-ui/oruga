<template>
    <section>
        <o-field>
            <o-upload disabled>
                <o-button tag="button" variant="primary">
                    <o-icon icon="upload" />
                    <span>Click to upload</span>
                </o-button>
            </o-upload>
        </o-field>

        <o-field>
            <o-upload drag-drop disabled>
                <div style="text-align: center">
                    <p>
                        <o-icon icon="upload" size="is-large" />
                    </p>
                    <p>Drop your files here or click to upload</p>
                </div>
            </o-upload>
        </o-field>
    </section>
</template>
