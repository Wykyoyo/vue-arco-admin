<template>
  <Upload
    :auto-upload="false"
    :show-file-list="false"
    :file-list="state.fileList"
    @change="onChangeFile"
  >
    <template #upload-button>
      <img
        id="avatar"
        class="w-80px h-80px rounded-[50%] cursor-pointer"
        :src="state.url"
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
    :width="350"
    @ok="onClickConfirm"
    @cancel="onClickCancel"
  >
    <div class="flex items-center flex-col">
      <div class="w-250px h-250px border-solid border-1px z-2">
        <img
          :src="state.editImage.url"
          ref="refCropperImg"
          draggable="false"
          class="w-248px w-248px"
        />
      </div>

      <div class="mx-20px">
        <div class="flex items-center mt-20px">
          <span class="cursor-pointer" @click="onClickActionImg('zoomout')">
            <svg class="icon w-20px h-20px" aria-hidden="true">
              <use xlink:href="#icon-zoomout"></use>
            </svg>
          </span>
          <span
            class="cursor-pointer ml-10px"
            @click="onClickActionImg('zoomin')"
          >
            <svg class="icon w-20px h-20px" aria-hidden="true">
              <use xlink:href="#icon-zoomin"></use>
            </svg>
          </span>
          <span
            class="cursor-pointer ml-30px"
            @click="onClickActionImg('left')"
          >
            <svg class="icon w-20px h-20px" aria-hidden="true">
              <use xlink:href="#icon-undo"></use>
            </svg>
          </span>
          <span
            class="cursor-pointer ml-10px"
            @click="onClickActionImg('right')"
          >
            <svg class="icon w-20px h-20px" aria-hidden="true">
              <use xlink:href="#icon-reload"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { Upload, Modal } from '@arco-design/web-vue'
import { FileItem } from '@arco-design/web-vue/es/upload/interfaces'
import { onMounted, reactive, nextTick, ref, shallowReactive, watch } from 'vue'
import avg from '../../../assets/img/ava.jpg'

const refCropperImg = ref()

// #region state相关
interface IEditImage {
  show: boolean
  url: string | undefined
}
interface IState {
  url: string | undefined
  fileList: FileItem[]
  editImage: IEditImage
}
const state = reactive<IState>({
  url: avg,
  fileList: [],
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
  initCropper()
  state.editImage.show = true
}

const initCropper = () => {
  nextTick(() => {
    shallowState.cropper = new Cropper(refCropperImg.value, {
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
      background: false,
      // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
      autoCropArea: 1,
      // 设置图片是否可以进行收缩功能
      zoomOnWheel: true,
      // 纵横比
      aspectRatio: 1,
      cropBoxResizable: false,
      minContainerHeight: 245,
      minContainerWidth: 245,
      modal: false
    })
  })
}

const onClickConfirm = () => {
  const cropperData = shallowState.cropper
    ?.getCroppedCanvas({
      width: 80,
      height: 80
    })
    .toDataURL()
  state.url = cropperData
  state.editImage.url = cropperData

  state.editImage.show = false
}

const onClickCancel = () => {
  state.editImage.url = ''
  state.editImage.show = false
}

const onClickActionImg = (key: string) => {
  switch (key) {
    case 'zoomout':
      shallowState.cropper?.zoom(-0.1)
      break
    case 'zoomin':
      shallowState.cropper?.zoom(0.1)
      break
    case 'left':
      shallowState.cropper?.rotate(-45)
      break
    case 'right':
      shallowState.cropper?.rotate(45)
      break
    default:
      break
  }
}

watch(
  () => state.editImage.show,
  () => {
    if (!state.editImage.show) {
      shallowState.cropper?.destroy()
    }
  }
)

onMounted(() => {
  // nextTick(() => {
  //   new Cropper(refCropperImg.value, {
  //     /*
  //       * viewMode 视图控制
  //         - 0 无限制
  //         - 1 限制裁剪框不能超出图片的范围
  //         - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
  //         - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
  //       * */
  //     viewMode: 0,
  //     // 设置图片是否可以拖拽功能
  //     /*
  //       * dragMode 拖拽图片模式
  //         - crop 形成新的裁剪框
  //         - move 图片可移动
  //         - none 什么也没有
  //       * */
  //     dragMode: 'move',
  //     // 是否显示图片后面的网格背景,一般默认为true
  //     background: true,
  //     // 进行图片预览的效果
  //     preview: '.before',
  //     // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
  //     autoCropArea: 0.8,
  //     // 设置图片是否可以进行收缩功能
  //     zoomOnWheel: true,
  //     // 是否显示 + 箭头
  //     center: true
  //   })
  // })
})
</script>
