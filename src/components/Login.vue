<template>
  <div>
    <button @click="login">login</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script>

export default {
  name: "Login",
  methods: {
    login: function () {
      this.$store.dispatch('auth/login').then(res => {
        console.log('login :: ',res);
        this.$router.push(res.message);
      });
    },
    logout: function () {
      this.$store.dispatch('auth/logout').then(() => {
        console.log('test');
      });
    }
  }
}
</script>