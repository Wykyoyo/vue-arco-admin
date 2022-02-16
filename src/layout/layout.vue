<template>
  <div class="flex h-100vh overflow-hidden">
    <aside class="w-[272px] z-3 shadow-sm">
      <LayoutAside></LayoutAside>
    </aside>
    <div class="flex-1 flex flex-col">
      <header class="h-64px z-2 shadow-sm">
        <LayoutHeader></LayoutHeader>
      </header>
      <main class="flex-1 bg-[#F0F2F5] overflow-y-auto">
        <div class="h-450px">1</div>
        <div class="h-450px">1</div>
        <div class="h-450px">1</div>
        <div class="h-450px">1</div>
        <div class="h-450px">1</div>
        <div class="h-450px">1</div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutAside from './components/layoutAside.vue'
import LayoutHeader from './components/layoutHeader.vue'
</script>
