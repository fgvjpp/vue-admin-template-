const imgError = {
  inserted(el, options) {
    el.onerror = () => {
      el.src = options.value || 'https://heihei-1304600167.cos.ap-beijing.myqcloud.com/%E6%9C%AA%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png'
    }
  },
  componentUpdated(dom, options) {
    if (!dom.src) {
      dom.src = 'https://heihei-1304600167.cos.ap-beijing.myqcloud.com/%E6%9C%AA%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png'
    }
  }
}

export {
  imgError
}
