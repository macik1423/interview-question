<template>
  <div>
    <menu-panel></menu-panel>
    Witaj {{login}}
  </div>
</template>

<script>
import MenuPanel from "../../components/MenuPanel.vue";
export default {
  data() {
    return {
      login: localStorage.getItem('login'),
    }
  },
  components: {
    MenuPanel,
  },
}
</script>