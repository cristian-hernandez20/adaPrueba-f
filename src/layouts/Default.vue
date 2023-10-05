<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="v-app">
    <router-view></router-view>
  </v-app>
</template>
<script setup></script>
<style scoped>
.v-app {
  background-image: url("@/assets/image/background.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
