<template>
  <ExceptionPage
    :src="ExectionSrc"
    :code="403"
    describe="抱歉，您没有权限访问该页面"
  ></ExceptionPage>
</template>
<script setup lang="ts">
import ExectionSrc from '../../assets/svg/403.svg'
import ExceptionPage from '../../components/ExceptionPage/ExceptionPage.vue'
</script>
