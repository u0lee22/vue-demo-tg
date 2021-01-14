<template>
  <div class="main">
    <div class="top">
      <div>Menu Test</div>
      <div>
        <button @click="logout">logout</button>
      </div>
    </div>
    <div class="menu-container">
      <div>
        <nav class="menuList">
          <li v-for="(menu, index) in menus" :key="index" v-show="menu.status">
            <router-link v-bind:to="menu.apiUrl">{{ menu.apiName }}</router-link>
          </li>
        </nav>
      </div>
      <default-layout></default-layout>
    </div>
  </div>
</template>

<script>
import DefaultLayout from "@/components/DefaultLayout";

export default {
  name: "Main",
  created() {
  },
  computed: {
    menus: function () {
      return this.$store.getters["auth/authMenu"];
    }

  },
  components: {
    DefaultLayout
  },
  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.replace('/login');
      });
    }
  }
}
</script>

<style>

.main {
  margin: 20px;
}

.top {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.menu-container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.menuList {
  text-align: start;
}


</style>