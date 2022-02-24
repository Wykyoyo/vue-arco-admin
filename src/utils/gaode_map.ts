const initAmapScript = () => {
  const ak = 'ce43a1e5df3f8b63809288fd8eba34ad'
  const amapUrl = `https://webapi.amap.com/maps?v=2.0&key=${ak}&callback=onAMapCallback`
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    // 如果已加载直接返回
    if (typeof AMap !== 'undefined') {
      resolve(AMap)
      // eslint-disable-next-line no-promise-executor-return
      return true
    }
    // 百度地图异步加载回调处理
    window.onAMapCallback = () => {
      resolve(AMap)
    }

    // 插入script脚本
    const scriptNode = document.createElement('script')
    scriptNode.setAttribute('type', 'text/javascript')
    scriptNode.setAttribute('src', amapUrl)
    scriptNode.onerror = reject
    document.body.appendChild(scriptNode)
  })
}

// eslint-disable-next-line import/prefer-default-export
export const initAmapUIScript = () => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    initAmapScript()
      // eslint-disable-next-line consistent-return
      .then(() => {
        // 如果已加载直接返回
        if (typeof AMapUI !== 'undefined') {
          resolve('')
          // eslint-disable-next-line no-promise-executor-return
          return true
        }
        const amapUIUrl = `https://webapi.amap.com/ui/1.1/main.js?v=1.1.1`
        // 插入script脚本
        const scriptAMapUINode = document.createElement('script')
        scriptAMapUINode.setAttribute('type', 'text/javascript')
        scriptAMapUINode.setAttribute('src', amapUIUrl)
        scriptAMapUINode.onerror = reject
        scriptAMapUINode.onload = (res) => {
          resolve('')
        }
        document.body.appendChild(scriptAMapUINode)
      })
      .catch((res) => {
        reject(res)
      })
  })
}
