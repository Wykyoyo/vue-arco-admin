<template>
  <ExceptionPage
    :src="ExectionSrc"
    :code="404"
    describe="抱歉，您访问的页面不存在"
  ></ExceptionPage>
</template>
<script setup lang="ts">
import ExectionSrc from '../../assets/svg/404.svg'
import ExceptionPage from '../../components/ExceptionPage/ExceptionPage.vue'
</script>
