<template>
  <div>
    wylogowano
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("destroyToken")
    .then(() => {
      this.$router.push("/")
    })
  }
  
}
</script>