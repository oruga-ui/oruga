<template>
  <section>
    <o-field label="Limited to 10 characters">
      <o-inputitems maxlength="10" :value="['Oruga', 'Vue', 'CSS']">
      </o-inputitems>
    </o-field>

    <o-field label="Limited to 5 tags">
      <o-inputitems maxitems="5" :value="['One', 'Two', 'Three', 'Four']">
      </o-inputitems>
    </o-field>

    <o-field label="Limited to 10 characters and 5 tags">
      <o-inputitems
        maxlength="10"
        maxitems="5"
        :value="['Red', 'Green', 'Blue', 'White']"
      >
      </o-inputitems>
    </o-field>
  </section>
</template>
