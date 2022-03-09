<template>
  <div class="h-full flex flex-col">
    <div class="flex">
      <Input
        class="bg-[#FFF] hover:bg-[#fbfbfb] dark:bg-[#232324] dark:hover:bg-[#1B1A1A]"
      />
      <Button type="primary" class="ml-10px">发表</Button>
    </div>
    <div class="mt-10px flex-1">
      <md-editor-v3
        v-model="state.editorContent"
        :theme="settingStore.darkMode"
        editorClass="!h-full !dark:bg-[#232324]"
        :previewTheme="state.previewTheme"
        @onSave="onSave"
        @onUploadImg="onUploadImg"
        @onHtmlChanged="onHtmlChanged"
      ></md-editor-v3>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Input, Button } from '@arco-design/web-vue'
import MdEditorV3 from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive } from 'vue'
import useSettingStore from '../../store/setting'

const settingStore = useSettingStore()

// #region state相关
interface IState {
  editorContent: string
  previewTheme: 'default' | 'github' | 'vuepress'
}
const state = reactive<IState>({
  editorContent: '',
  previewTheme: 'github'
})
// #endregion
const onSave = (value: string) => {
  console.log(value)
}

const onUploadImg = (files: FileList, callback: (urls: string[]) => void) => {
  const url: string[] = []
  const URL = window.URL || window.webkitURL
  Array.from(files).forEach((file) => {
    url.push(URL.createObjectURL(file))
  })
  callback(url)
}

const onHtmlChanged = (value: string) => {
  console.log(value)
}
</script>
