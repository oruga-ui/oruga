
## Examples

### Base

::: demo
```html
<template>
  <div>
    <o-menu>
      <o-menu-list label="Menu">
        <o-menu-item icon-pack="fas" icon="info-circle" label="Info"></o-menu-item>
        <o-menu-item icon-pack="fas" icon="cogs" :active="isActive">
          <template slot="label" slot-scope="props">
            Administrator
            <o-icon pack="fas" :icon="props.expanded ? 'chevron-down' : 'chevron-up'" class="is-pulled-right"></o-icon>
          </template>
          <o-menu-item icon-pack="fas" icon="user-circle" label="Users"></o-menu-item>
          <o-menu-item icon-pack="fas" icon="desktop">
            <template slot="label">
              Devices
              <o-dropdown aria-role="list" class="is-pulled-right" position="bottom-left">
                <div slot="trigger">
                  <o-icon pack="fas" icon="ellipsis-v"></o-icon>
                </div>
                <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
              </o-dropdown>
            </template>
          </o-menu-item>
          <o-menu-item icon-pack="fas" icon="money-bill-alt" label="Payments" disabled></o-menu-item>
        </o-menu-item>
        <o-menu-item icon-pack="fas" icon="user-circle" label="My Account">
          <o-menu-item label="Account data"></o-menu-item>
          <o-menu-item label="Addresses"></o-menu-item>
        </o-menu-item>
        <o-menu-item label="Expo" icon-pack="fas" icon="link" target="_blank" href="/components/Menu.html#examples"></o-menu-item>
      </o-menu-list>
      <o-menu-list label="Actions">
        <o-menu-item label="Logout"></o-menu-item>
      </o-menu-list>
    </o-menu>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      isActive: true
    }
  }
}
</script>
```
:::
