<template>
  <div class="login-container">
    <div class="btn">
      <button @click="login">login</button>
    </div>
    <div class="btn">
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  methods: {
    login: function () {
      this.$store.dispatch('auth/login');
    },
    logout: function () {
      this.$store.dispatch('auth/logout');
    }
  }
}
</script>

<style lang="css">
.login-container {
  margin: auto 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn {
  margin: 10px;
}

.btn button {
  line-height: 30px;
  width: 150px;
}

</style>