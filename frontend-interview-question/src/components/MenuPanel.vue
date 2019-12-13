<template>
  <nav>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Pytania rekrutacyjne z Javy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" height="500" width="256">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>Zaloguj</v-btn>
        </div>
        <div class="pa-2">
          <v-btn block>Wyloguj</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Quiz', icon: 'play_circle_outline' },
        { title: 'Konto', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' },
        { title: 'O autorze', icon: 'person' }
      ],
      drawer: false
    }
  },
  watch: {
    drawer(value) {
      return value;
    }
  }
}
</script>