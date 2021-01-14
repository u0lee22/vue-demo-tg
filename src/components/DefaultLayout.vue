<template>
  <div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
}
</script>

<style type="text/css">
.content {
  height: 550px;
  border: solid 1px;
  padding: 10px;
}
</style>