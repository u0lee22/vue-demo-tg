<template>
  <div>
    <button @click="logout">logout</button>
    <div>
      <nav class="menuList">
        <li v-for="(menu, index) in $store.state.auth.user.menus" :key="index" v-show="menu.status">
          <router-link v-bind:to="menu.path">{{ menu.name }}</router-link>
        </li>
      </nav>
    </div>
    <default-layout></default-layout>
  </div>
</template>

<script>
import DefaultLayout from "@/components/DefaultLayout";

export default {
  name: "Main",
  created() {
    const homeRoute = {path: '/home', name: 'home', component: () => import('@/components/Home')};
    this.$router.options.routes[1].children.push(homeRoute);
    this.$router.addRoutes(this.$router.options.routes);
  },
  components: {
    DefaultLayout
  },
  methods:{
    logout: function () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.replace('/');
      });
    }
  }
}
</script>

<style>
.menuList {
  display: flex;
  flex-direction: column;
}
</style>