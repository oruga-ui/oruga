<template>
  <section>
    <o-field
      horizontal
      label="Subject"
      variant="danger"
      message="Please enter a subject"
    >
      <o-input name="subject" expanded></o-input>
    </o-field>

    <o-field horizontal label="From">
      <o-input name="name" placeholder="Name" expanded></o-input>
      <o-input
        name="email"
        type="email"
        placeholder="nobody@nowhere.com"
        expanded
      ></o-input>
    </o-field>

    <o-field horizontal label="Topic">
      <o-select placeholder="Select a topic">
        <option value="1">Oruga</option>
        <option value="2">Vue.js</option>
        <option value="3">UI</option>
      </o-select>
    </o-field>

    <o-field horizontal label="Message">
      <o-input type="textarea"></o-input>
    </o-field>

    <o-field horizontal
      ><!-- Label left empty for spacing -->
      <o-button variant="primary"> Send message </o-button>
    </o-field>
  </section>
</template>

<script>
export default {};
</script>
