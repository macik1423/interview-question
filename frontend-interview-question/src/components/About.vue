<template>
    <div>
        <menu-panel></menu-panel>
        <go-top :size="50" :bottom="50"></go-top>
        <p>Nazywam się Maciej Kowalik, ta strona powstała w celu przećwiczenia technologii:</p>
        <ul>
            <li>Java Spring</li>
            <li>Vue</li>
            <li>Vuetify</li>
        </ul>
        <img src="https://www.codewars.com/users/macik1423/badges/small">
    </div>
</template>

<script>
import MenuPanel from '../components/MenuPanel.vue';
import GoTop from '@inotom/vue-go-top';

export default {
    components: {
        MenuPanel,
        GoTop
    },
}
</script>


