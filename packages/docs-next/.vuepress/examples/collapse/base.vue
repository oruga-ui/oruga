<template>
  <section>
    <o-collapse :open="false" aria-id="contentIdForA11y1">
      <template #trigger>
        <o-button
          variant="primary"
          aria-controls="contentIdForA11y1"
        >
          Click me!
        </o-button>
      </template>
      <div class="notification">
        <h3>Subtitle</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius
          lectus, nec rutrum justo nibh eu lectus. <br />
          Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel,
          interdum mattis neque.
        </p>
      </div>
    </o-collapse>
  </section>
</template>

<script>
export default {};
</script>
