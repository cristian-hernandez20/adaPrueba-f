<template>
  <router-view />
  <Loader />
  <Alert />
</template>

<script setup>
import Loader from "@/components/UI/Spinner";
import Alert from "@/components/global/Alert";
</script>

<style lang="scss">
@import "./assets/app/style";
</style>
