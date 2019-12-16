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
        <v-list-item-group mandatory color="indigo">
          <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block to="/login" class="link">Zaloguj</v-btn>
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
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard", route: "/" },
        { title: "Quiz", icon: "play_circle_outline", route: "" },
        { title: "Konto", icon: "account_box", route: "" },
        { title: "Admin", icon: "gavel", route: "" },
        { title: "O autorze", icon: "person", route: "/about" }
      ],
      drawer: false
    };
  },
  methods: {},
  props: {
    color: {
      type: String
    }
  }
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: black;
}
</style>