<template>
  <Upload
    :auto-upload="false"
    :show-file-list="false"
    :file-list="state.fileList"
    @change="onChangeFile"
  >
    <template #upload-button>
      <img
        class="w-80px h-80px rounded-[50%] cursor-pointer"
        src="../../../assets/img/ava.jpg"
      />
    </template>
  </Upload>
</template>
<script setup lang="ts">
import { Upload, Button } from '@arco-design/web-vue'
import { FileItem } from '@arco-design/web-vue/es/upload/interfaces'
import { reactive } from 'vue'

// #region state相关
interface IState {
  fileList: FileItem[]
}
const state = reactive<IState>({
  fileList: []
})
// #endregion

const onChangeFile = (fileList: FileItem[], fileItem: FileItem) => {
  console.log(fileList)
  console.log(fileItem)
}
</script>
