<template>
  <ExceptionPage
    :src="ExectionSrc"
    :code="500"
    describe="抱歉，服务器出错了"
  ></ExceptionPage>
</template>
<script setup lang="ts">
import ExectionSrc from '../../assets/svg/500.svg'
import ExceptionPage from '../../components/ExceptionPage/ExceptionPage.vue'
</script>
