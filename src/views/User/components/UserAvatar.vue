<template>
  <img
    id="image"
    src="../../../assets/img/ava.jpg"
    ref="refCropperImg"
    class="block"
  />
  <!-- <Upload
    :auto-upload="false"
    :show-file-list="false"
    :file-list="state.fileList"
    @change="onChangeFile"
  >
    <template #upload-button>
      <img
        id="avatar"
        class="w-80px h-80px rounded-[50%] cursor-pointer"
        src="../../../assets/img/ava.jpg"
      />
    </template>
  </Upload>
  <Modal
    :visible="state.editImage.show"
    title="裁剪头像"
    title-align="start"
    :closable="false"
    top="12vh"
    :align-center="false"
    @ok="onClickConfirm"
    @cancel="onClickCancel"
  >
    <div class="p-120px">
      <img
        :src="state.editImage.url"
        ref="refCropperImg"
        id="image_cropper"
        class="image_cropper"
        draggable="false"
      />
    </div>
  </Modal> -->
</template>
<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { Upload, Modal } from '@arco-design/web-vue'
import { FileItem } from '@arco-design/web-vue/es/upload/interfaces'
import { onMounted, reactive, nextTick, ref, shallowReactive } from 'vue'

const refCropperImg = ref()

// #region state相关
interface IEditImage {
  show: boolean
  url: string
}
interface IState {
  fileList: FileItem[]
  image: any
  editImage: IEditImage
}
const state = reactive<IState>({
  fileList: [],
  image: null,
  editImage: {
    show: false,
    url: ''
  }
})

interface IShallowState {
  cropper: Cropper | null
}
const shallowState = shallowReactive<IShallowState>({
  cropper: null
})
// #endregion

const onChangeFile = (_fileList: FileItem[], fileItem: FileItem) => {
  state.fileList = [fileItem]
  const URL = window.URL || window.webkitURL
  state.editImage.url = URL.createObjectURL(fileItem.file as File)

  state.editImage.show = true
  initCropper()
}

const initCropper = () => {
  nextTick(() => {
    const cropper = new Cropper(refCropperImg.value, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    })
    // console.log(JSON.stringify(refCropperImg.value))
    // shallowState.cropper = new Cropperjs(
    //   document.getElementById('image_cropper'),
    //   {
    //     dragMode: 'move' /* 画布拖拽方式 */,
    //     autoCropArea: 0.9 /* 画布裁剪画布比例 */,
    //     restore: false,
    //     guides: false,
    //     center: true,
    //     highlight: false,
    //     cropBoxMovable: true,
    //     cropBoxResizable: true,
    //     toggleDragModeOnDblclick: false
    //   }
    // )
  })
}

const onClickConfirm = () => {
  state.editImage.show = false
}

const onClickCancel = () => {
  state.editImage.show = false
}

onMounted(() => {
  nextTick(() => {
    new Cropper(refCropperImg.value, {
      /*
        * viewMode 视图控制
          - 0 无限制
          - 1 限制裁剪框不能超出图片的范围
          - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
          - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
        * */
      viewMode: 0,
      // 设置图片是否可以拖拽功能
      /*
        * dragMode 拖拽图片模式
          - crop 形成新的裁剪框
          - move 图片可移动
          - none 什么也没有
        * */
      dragMode: 'move',
      // 是否显示图片后面的网格背景,一般默认为true
      background: true,
      // 进行图片预览的效果
      preview: '.before',
      // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
      autoCropArea: 0.8,
      // 设置图片是否可以进行收缩功能
      zoomOnWheel: true,
      // 是否显示 + 箭头
      center: true
    })
  })
})
</script>

<style scoped>
.image_cropper {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
