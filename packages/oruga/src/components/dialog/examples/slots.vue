<template>
    <o-dialog>
        <template #title>Advanced Dialog</template>
        <template #subtitle>Dialog subtitle</template>
        <template #image>
            <img
                alt="Oruga Logo"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
        </template>
        <template #content>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa
                ratione quam perferendis esse, cupiditate neque quas!
            </p>
        </template>
        <template #cancelButton>
            <a href="#" class="dialog-link">A link</a>
        </template>
        <template #confirmButton>
            <a href="#" class="dialog-link">Another link</a>
        </template>
    </o-dialog>
</template>
