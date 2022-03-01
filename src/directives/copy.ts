import type { Directive, App } from 'vue'

let elValue = ''
const copyDirective: Directive = {
  beforeMount(el, binding) {
    elValue = binding.value
    const handler = () => {
      if (!elValue) {
        console.log('请输入要复制的内容')
        return
      }
      // 创建textarea标签
      const textarea = document.createElement('textarea')
      // 设置相关属性 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = true
      textarea.style.position = 'absolute'
      textarea.style.top = '-99999px'
      // 把目标内容赋值给它的value属性
      textarea.value = elValue
      // 插入到页面
      document.body.appendChild(textarea)
      // 调用onselect()方法
      textarea.select()
      // 把目标内容复制进剪贴板, 该API会返回一个Boolean
      const res = document.execCommand('Copy')
      // 移除textarea标签
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', () => {
      handler()
    })
  },
  updated(el, binding) {
    // 实时更新最新的目标内容
    elValue = binding.value
  },
  unmounted(el) {
    el.removeEventListener('click', () => {})
  }
}

export default copyDirective
