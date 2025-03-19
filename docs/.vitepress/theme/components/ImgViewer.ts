import { nextTick } from 'vue'

export const bindFancybox = () => {
  nextTick(async () => {
    const { Fancybox } = await import('@fancyapps/ui')
    const imgs = document.querySelectorAll('.vp-doc img')
    imgs.forEach((img) => {
      const image = img as HTMLImageElement
      if (!image.hasAttribute('data-fancybox')) {
        image.setAttribute('data-fancybox', 'gallery')
      }
    })
    
    Fancybox.bind('[data-fancybox="gallery"]', {
      Hash: false, // 禁用hash导航
      Thumbs: {
        showOnStart: false // 开始隐藏缩略图列表
      },
      Images: {
        Panzoom: {
          maxScale: 4, // 最大缩放比例
        }
      },
      Carousel: {
        transition: 'slide'
      },
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW', 'flipX', 'flipY'],
          right: ['thumbs', 'close']
        }
      }
    })
  })
}
