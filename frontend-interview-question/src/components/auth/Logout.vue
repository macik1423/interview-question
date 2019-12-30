<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <v-card>
              <v-card-title class="justify-center">
                Pomyślnie wylogowano
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export default {
  created() {
    this.$store.dispatch("destroyToken")
    sleep(1000).then(() => {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('login');
      this.$router.push("/");
    })
  }
}

</script>

