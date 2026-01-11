<template>
  <div class="ui-home">
    <!-- Hero 部分 -->
    <div class="home-hero">
      <div class="hero-banner-container">
        <img :src="isMobile ? bannerMobile : banner" alt="banner" class="hero-banner">
        <div class="hero-content">
          <h1 class="hero-title">Dockter</h1>
          <div class="hero-subtitle">全能NAS管理工具</div>
          <p class="hero-slogan">让NAS管理更简单</p>
        </div>
      </div>
      <div class="hero-actions" style="margin-top: 20px;">
        <!-- <a class="action-button primary" href="/archive/symedia/Symedia部署流程">立即开始</a> -->
        <a class="action-button primary" href="https://wiki.viplee.cc">立即开始</a>
        <a class="action-button secondary" href="/donate">下载软件</a>
      </div>
    </div>

    <div class="ui-padding">
      <!-- 核心功能介绍 -->
      <div class="home-intro">
        <h2 class="section-title" data-text="全能NAS管理工具">全能NAS管理工具</h2>
        <p class="section-desc">Dockter 不只是一个 Docker 管理平台，而是一套现代化、智能化、可视化的容器管理解决方案。它让运维更优雅、管理更清晰、系统更具生命力。</p>
      </div>

      <!-- 特性部分 -->
      <div class="home-features">
        <div class="features-container">
          <div class="feature-item" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">
              <img :src="feature.icon" alt="feature icon">
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-details">{{ feature.details }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能展示 -->
    <div class="home-showcase-container">
      <div class="home-showcase">
        <div v-for="(item, index) in showcases" :key="index" class="showcase-section" :id="`showcase-${index}`">
          <div class="showcase-row" :class="{ reverse: index % 2 === 1 }">
            <div class="showcase-text">
              <h3>{{ item.title }}</h3>
              <div v-for="(section, sectionIndex) in item.content" :key="sectionIndex" class="content-section">
                <div class="content-subtitle">
                  <template v-if="item.content.length > 1">{{ sectionIndex + 1 }}. </template>{{ section.subtitle }}
                </div>
                <ul class="content-points">
                  <li v-for="(point, pointIndex) in section.points" :key="pointIndex">{{ point }}</li>
                </ul>
              </div>
            </div>
            <div class="showcase-image">
              <img v-if="item.image" :src="item.image" alt="功能展示" class="showcase-img">
              <video v-else-if="item.video" class="showcase-video" controls preload="metadata">
                <source :src="item.video" type="video/mp4">
                您的浏览器不支持视频播放，请升级或更换浏览器
              </video>
              <div v-if="item.video" class="copyright-disclaimer">
                <p>版权免责声明：此演示视频仅用于功能展示，所有媒体内容的版权归原作者所有。Symedia与FastEmby仅为技术工具，不提供、存储任何版权内容，不对用户使用行为负责。</p>
              </div>
              <div v-if="!item.image && !item.video" class="image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 将导航点移到这里，位于showcase外部 -->
      <div class="showcase-nav">
        <div class="showcase-dots">
          <span v-for="(_, dotIndex) in showcases" :key="dotIndex" :class="{ active: dotIndex === currentShowcase }"
            @click="scrollToShowcase(dotIndex)"></span>
        </div>
      </div>
    </div>


    <!-- 用户评价 -->
    <div class="home-testimonials">
      <h2 class="section-title" data-text="用户真实评价">用户真实评价</h2>
      <div class="testimonials-container">
        <div class="testimonial-item" v-for="(review, index) in testimonials" :key="index">
          <p class="testimonial-content">{{ review.content }}</p>
          <div class="testimonial-author">
            <span class="author-name">{{ review.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 开始使用区域 -->
  <div class="home-cta">
    <h2>开始使用Dockter</h2>
    <p>只需简单几步配置，即可享受全能NAS管理体验</p>
    <div class="cta-buttons">
      <a class="action-button primary enhanced"
        href="https://wiki.viplee.cc/dockter/newbie/install/#docker-compose">快速开始</a>
    </div>
  </div>
  <!-- 版权信息 -->
  <footer class="home-footer">
    <div class="disclaimer">
      <p>本软件仅用于合法用途，用户不得利用本软件从事违法违规行为，因用户违法使用所产生的一切后果均由用户自行承担。</p>
    </div>
    <div class="copyright">
      Copyright © 2024-2026 Shenxian
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const banner = '/assets/banner.webp'
const bannerMobile = '/assets/banner-mobile.png'
const features = [
  {
    icon: '/assets/icons/导航页.png',
    title: '导航页 · 可视化中枢工作台',
    details: '高度自由化、深度可定制的导航首页设计，支持自定义卡片与容器卡片，实时同步运行状态，支持PC与移动端分别配置背景图'
  },
  {
    icon: '/assets/icons/Docker.png',
    title: '容器管理 · 极致交互体验',
    details: '支持列表模式 & 卡片模式双视图，支持批量操作，容器状态实时呈现，运行状况一目了然，一键自动匹配容器图标'
  },
  {
    icon: '/assets/icons/compose.png',
    title: 'Compose 管理 · 多项目协同编排',
    details: '图形化、结构化的应用编排中心，支持统一管理多个Compose目录，一键启动、构建、更新及批量操作'
  },
  {
    icon: '/assets/icons/agent.png',
    title: 'Agent 管理 · 分布式节点控制',
    details: '远程节点接入能力，跨地域、多服务器统一管控，实时呈现CPU/内存/网络/磁盘数据，内置远程终端无需切SSH'
  },
  {
    icon: '/assets/icons/archive.png',
    title: '文件管理 · 接近 PC 级体验',
    details: '专业级Web文件管理器，多标签页并行操作，文本文件点击即可编辑，图片点击即可预览，支持多选、上传、下载'
  },
  {
    icon: '/assets/icons/bot.png',
    title: 'Bot 交互 · 智能助手系统',
    details: 'Bot控制系统让运维进入自动化时代，支持通过Bot指令控制容器启停、重启、管理维护，自动检测更新并推送通知'
  }
]

const showcases = [
  {
    title: '导航页 · 可视化中枢工作台',
    content: [
      {
        subtitle: '高度自由化的导航设计',
        points: [
          '支持自定义卡片与容器卡片',
          '容器卡片可实时同步运行状态',
          '支持PC与移动端分别配置背景图',
          '美观、动态、信息聚焦'
        ]
      }
    ],
    image: '/assets/images/placeholder.png'
  },
  {
    title: '容器管理 · 极致交互体验',
    content: [
      {
        subtitle: '专业运维视角的容器管理',
        points: [
          '支持列表模式 & 卡片模式双视图',
          '支持批量操作',
          '容器状态实时呈现，运行状况一目了然',
          '每一处操作都清晰直观、逻辑顺滑',
          '✨ 一键自动匹配容器图标'
        ]
      }
    ],
    image: '/assets/images/container.png'
  },
  {
    title: 'Compose 管理 · 多项目协同编排',
    content: [
      {
        subtitle: '图形化应用编排中心',
        points: [
          '支持统一管理多个Compose目录',
          '与容器管理一致的极简交互模式',
          '一键启动、一键构建、一键更新',
          '批量操作支持',
          '让容器应用管理进入真正的工程化时代'
        ]
      }
    ],
    image: '/assets/images/compose.png'
  },
  {
    title: 'Agent 管理 · 分布式节点控制',
    content: [
      {
        subtitle: '远程节点接入能力',
        points: [
          '将远程服务器纳入Dockter体系',
          '实时呈现：CPU / 内存 / 网络 / 磁盘等运行数据',
          '支持对远程Docker环境进行管理、运维、监控',
          '操作体验与本机完全一致'
        ]
      },
      {
        subtitle: '内置远程终端',
        points: [
          '无需再切SSH',
          '即可完成系统级操作',
          '彻底改变你的远程运维方式'
        ]
      }
    ],
    image: '/assets/images/agent.png'
  },
  {
    title: '文件管理 · 接近 PC 级体验',
    content: [
      {
        subtitle: '专业级 Web 文件管理器',
        points: [
          '多标签页并行操作',
          '文本文件点击即可编辑',
          '图片点击即可预览',
          '支持多选',
          '支持上传 / 下载',
          '接近桌面系统级别的文件管理体验'
        ]
      }
    ],
    image: '/assets/images/filebrowser.png'
  },
  {
    title: 'Bot 交互 · 智能助手系统',
    content: [
      {
        subtitle: 'Bot 控制系统',
        points: [
          '支持通过Bot指令控制容器',
          '支持启动、停止、重启、管理维护操作',
          '支持自动检测更新并推送通知',
          '📱 拿起手机 💬 发送命令 🚀 系统自动执行',
          '运维 · 不受地点限制'
        ]
      }
    ],
    image: '/assets/images/bot.png'
  }
]
const testimonials = [
  {
    content: 'Dockter的导航页设计太赞了！可以自定义容器卡片，实时查看运行状态，完全就是我想要的可视化工作台。',
    author: '运维工程师 老李'
  },
  {
    content: '容器管理功能非常强大，列表和卡片双视图，批量操作很方便，一键匹配图标让界面美观又专业。',
    author: 'DevOps 老王'
  },
  {
    content: 'Agent管理功能解决了我多服务器管理的痛点，一个界面就能管理所有服务器的Docker环境，内置终端更是神器！',
    author: '系统架构师 老张'
  },
  {
    content: 'Compose管理让我的多项目部署变得超级简单，图形化操作，一键启动、构建、更新，效率提升了好几倍。',
    author: '全栈开发者 老陈'
  },
  {
    content: '文件管理器做得太好了，多标签页操作，点击就能编辑和预览，完全就是桌面级的体验。',
    author: '前端工程师 小刘'
  },
  {
    content: 'Bot交互系统让我可以随时随地用手机管理容器，出门在外也能轻松运维，真正做到了移动办公。',
    author: '技术经理 老赵'
  },
  {
    content: 'Dockter把复杂的Docker管理变得如此简单优雅，界面美观、操作流畅、功能强大，强烈推荐！',
    author: '独立开发者 小明'
  },
  {
    content: '作为一个NAS玩家，Dockter完全满足了我对容器管理工具的所有期待，特别是远程管理功能，太实用了！',
    author: 'NAS爱好者 老杨'
  }
]


const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const currentShowcase = ref(0)
const isScrolling = ref(false)
const scrollLock = ref(false) // 添加滚动锁定状态

// 添加触摸事件支持
const touchStartY = ref(0)
const touchEndY = ref(0)
const touchThreshold = 50 // 触摸阈值，需要滑动超过这个距离才会触发翻页

// 处理触摸开始事件
const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY
}

// 处理触摸结束事件
const handleTouchEnd = (event) => {
  // 如果滚动锁定，直接返回
  if (scrollLock.value) return

  // 仅在showcase区域内处理
  const showcaseContainer = document.querySelector('.home-showcase-container')
  if (!showcaseContainer) return

  const rect = showcaseContainer.getBoundingClientRect()
  const isInViewport = (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  )

  if (!isInViewport || isScrolling.value) return

  touchEndY.value = event.changedTouches[0].clientY
  const deltaY = touchStartY.value - touchEndY.value

  if (Math.abs(deltaY) > touchThreshold) {
    // 防止触发默认的页面滚动
    event.preventDefault()

    // 设置滚动锁定
    scrollLock.value = true
    setTimeout(() => { scrollLock.value = false }, 1200) // 滚动锁定时间比防抖长

    isScrolling.value = true
    setTimeout(() => { isScrolling.value = false }, 800) // 防抖

    if (deltaY > 0 && currentShowcase.value < showcases.length - 1) {
      // 向上滑动，显示下一个
      scrollToShowcase(currentShowcase.value + 1)
    } else if (deltaY < 0 && currentShowcase.value > 0) {
      // 向下滑动，显示上一个
      scrollToShowcase(currentShowcase.value - 1)
    }
  }
}

// 处理滚轮事件
const handleWheel = (event) => {
  // 如果滚动锁定，直接返回
  if (scrollLock.value) return

  // 仅在showcase区域内处理
  const showcaseContainer = document.querySelector('.home-showcase-container')
  if (!showcaseContainer) return

  const rect = showcaseContainer.getBoundingClientRect()
  const isInViewport = (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  )

  if (!isInViewport || isScrolling.value) return

  // 设置滚动锁定
  scrollLock.value = true
  setTimeout(() => { scrollLock.value = false }, 1200) // 滚动锁定时间比防抖长

  isScrolling.value = true
  setTimeout(() => { isScrolling.value = false }, 800) // 防抖

  if (event.deltaY > 0 && currentShowcase.value < showcases.length - 1) {
    // 向下滚动
    scrollToShowcase(currentShowcase.value + 1)
  } else if (event.deltaY < 0 && currentShowcase.value > 0) {
    // 向上滚动
    scrollToShowcase(currentShowcase.value - 1)
  }
}

// 针对移动端优化的滚动函数
const scrollToShowcase = (index) => {
  if (index >= 0 && index < showcases.length) {
    currentShowcase.value = index
    const element = document.getElementById(`showcase-${index}`)
    if (element) {
      // 计算滚动位置
      const elementRect = element.getBoundingClientRect()
      const elementHeight = elementRect.height
      const windowHeight = window.innerHeight
      const elementTop = window.scrollY + elementRect.top

      // 移动端和桌面端不同的处理逻辑
      if (isMobile.value) {
        // 移动端：计算更精确的居中位置
        // 对于每个卡片使用动态计算，而不是固定百分比
        const visibleHeight = Math.min(elementHeight, windowHeight * 0.8) // 限制最大可见高度
        const topOffset = (windowHeight - visibleHeight) / 2 // 居中显示
        window.scrollTo({
          top: elementTop - topOffset + 10, // 微调顶部偏移，+10使其稍微上移
          behavior: 'smooth'
        })
      } else {
        // 桌面端：居中显示
        // 增加顶部偏移量，使卡片在视口中更居中
        const scrollToY = elementTop - ((windowHeight - elementHeight) / 2)
        // 增加垂直偏移量，使卡片更靠上一些
        const topOffset = 20
        window.scrollTo({
          top: Math.max(0, scrollToY - topOffset),
          behavior: 'smooth'
        })
      }
    }
  }
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
  window.addEventListener('wheel', handleWheel)

  // 添加触摸事件监听器
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)

  // 添加滚动事件监听器，用于控制导航点的显示和隐藏
  window.addEventListener('scroll', handleScroll)

  // 预加载所有图片，然后再执行对齐操作
  const preloadImages = () => {
    const images = document.querySelectorAll('.showcase-img')
    let loadedCount = 0
    const totalImages = images.length

    if (totalImages === 0) {
      // 如果没有图片，直接执行对齐
      alignTextWithImages()
      return
    }

    images.forEach(img => {
      if (img.complete) {
        loadedCount++
        if (loadedCount === totalImages) {
          alignTextWithImages()
        }
      } else {
        img.onload = () => {
          loadedCount++
          if (loadedCount === totalImages) {
            alignTextWithImages()
          }
        }
      }
    })

    // 设置一个兜底的计时器，确保即使某些图片加载失败也能执行对齐
    setTimeout(() => {
      alignTextWithImages()
    }, 1000)
  }

  // 执行预加载
  preloadImages()

  // 添加窗口尺寸变化时的对齐处理
  window.addEventListener('resize', alignTextWithImages)

  // 在任何异步操作之前注册 onUnmounted 钩子
  let observerInstance = null
  let resizeObserverInstance = null

  // 在组件卸载时清理所有事件监听器和观察器
  onUnmounted(() => {
    if (resizeObserverInstance) {
      resizeObserverInstance.disconnect()
    }
    if (observerInstance) {
      observerInstance.disconnect()
    }
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('resize', checkIsMobile)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', alignTextWithImages)
  })

  // 等待Vue完成DOM更新
  setTimeout(() => {
    // 添加滚动监听器来更新当前的showcase
    observerInstance = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const index = parseInt(id.split('-')[1])
          if (currentShowcase.value !== index) {
            currentShowcase.value = index
          }
        }
      })
    }, { threshold: 0.5 })

    // 使用ResizeObserver监听窗口大小变化
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverInstance = new ResizeObserver(debounce(() => {
        // 仅在用户已经滚动到showcase部分时才重新计算位置
        if (currentShowcase.value >= 0 && isInShowcaseView()) {
          scrollToShowcase(currentShowcase.value)
        }
      }, 200)) // 添加防抖

      // 监听body元素大小变化
      resizeObserverInstance.observe(document.body)

      // 观察每个showcase节点
      showcases.forEach((_, index) => {
        const el = document.getElementById(`showcase-${index}`)
        if (el) {
          observerInstance.observe(el)
        }
      })
    } else {
      // 降级处理，如果浏览器不支持ResizeObserver
      showcases.forEach((_, index) => {
        const el = document.getElementById(`showcase-${index}`)
        if (el) observerInstance.observe(el)
      })
    }
  }, 100)
})

// 判断用户是否在showcase视图中
const isInShowcaseView = () => {
  const showcaseContainer = document.querySelector('.home-showcase-container')
  if (!showcaseContainer) return false

  const rect = showcaseContainer.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  )
}

// 简单的防抖函数
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

// 处理滚动事件，控制导航点的显示和隐藏
const handleScroll = () => {
  const showcaseContainer = document.querySelector('.home-showcase-container')
  const showcaseNav = document.querySelector('.showcase-nav')
  if (!showcaseContainer || !showcaseNav) return

  const inView = isInShowcaseView()
  if (inView) {
    showcaseNav.classList.add('visible')
  } else {
    showcaseNav.classList.remove('visible')
  }
}

// 新增函数：图片与文字对齐
const alignTextWithImages = () => {
  const showcaseSections = document.querySelectorAll('.showcase-section')
  showcaseSections.forEach(section => {
    // 为每个区域添加加载状态标记
    section.classList.add('showcase-content-loading')
    section.classList.remove('showcase-content-loaded')

    const imageContainer = section.querySelector('.showcase-image')
    const textContainer = section.querySelector('.showcase-text')
    const image = imageContainer.querySelector('.showcase-img, .showcase-video')

    if (imageContainer && textContainer && image) {
      // 在图片加载前，先设置一个默认的顶部对齐
      textContainer.style.paddingTop = '0px'

      // 等待图片完全加载
      if (image instanceof HTMLImageElement) {
        if (!image.complete) {
          image.onload = () => {
            alignSingleSection(imageContainer, textContainer)
            // 加载完毕后标记内容已加载
            section.classList.remove('showcase-content-loading')
            section.classList.add('showcase-content-loaded')
          }
        } else {
          alignSingleSection(imageContainer, textContainer)
          // 图片已加载完毕，直接标记
          section.classList.remove('showcase-content-loading')
          section.classList.add('showcase-content-loaded')
        }
      } else {
        alignSingleSection(imageContainer, textContainer)
        // 非图片类型，直接标记
        section.classList.remove('showcase-content-loading')
        section.classList.add('showcase-content-loaded')
      }
    }
  })
}

// 对齐单个区域的文字和图片
const alignSingleSection = (imageContainer, textContainer) => {
  if (window.innerWidth <= 768) {
    // 移动端直接显示，不需要特殊对齐
    textContainer.style.paddingTop = '0px'
    textContainer.style.paddingBottom = '0px'
    return
  }

  const image = imageContainer.querySelector('.showcase-img, .showcase-video')

  if (image) {
    // 计算图片容器中图片的垂直居中偏移量
    const imageTopOffset = (imageContainer.clientHeight - image.clientHeight) / 2 - 12

    // 设置文字容器的样式，确保与图片区域对齐
    textContainer.style.paddingTop = `${imageTopOffset}px`

    // 计算文字容器内容的高度
    const textContentHeight = textContainer.scrollHeight - imageTopOffset

    // 如果文字内容高度小于图片高度，添加底部填充使其至少与图片一样高
    if (textContentHeight < image.clientHeight) {
      const paddingBottom = image.clientHeight - textContentHeight
      textContainer.style.paddingBottom = `${Math.max(0, paddingBottom)}px`
    } else {
      textContainer.style.paddingBottom = '0px'
    }
  }
}
</script>

<style>
.ui-padding {
  padding: 0 24px;
  margin: 0 auto;
  max-width: 1152px;
  color: var(--vp-c-text-1);
}

/* 添加内容预加载样式 */
.showcase-content-loading .showcase-text {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.showcase-content-loaded .showcase-text {
  opacity: 1;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px 0;
  padding: 10px 0;
  color: transparent;
  background-image: var(--sy-gradient-cyan-blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.5;
}

.home-hero {
  text-align: center;

  .hero-title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    margin: 0 0 24px;
    letter-spacing: -0.02em;
    background-image: var(--sy-gradient-cyan-blue);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    display: inline-block;
  }

  .hero-description {
    font-size: 24px;
    font-weight: 400;
    color: var(--vp-c-text-2);
    margin: 0 0 40px;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-note {
    font-size: 14px;
    color: var(--vp-c-text-3);
    margin-top: 24px;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 16px;

    .action-button {
      display: inline-block;
      border-radius: 28px;
      padding: 14px 32px;
      font-size: 18px;
      font-weight: 500;
      transition: all 0.3s ease;

      &.primary {
        background: var(--sy-gradient-blue-cyan);
        color: white;
        box-shadow: 0 4px 12px var(--sy-primary-shadow-light);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px var(--sy-primary-shadow-dark);
        }
      }

      &.secondary {
        border: 1px solid var(--sy-primary-color);
        color: var(--sy-primary-color);

        &:hover {
          background-color: var(--sy-primary-color-light);
        }
      }
    }
  }
}

.home-intro {
  text-align: center;
  padding: 40px 0;
  max-width: 800px;
  margin: 0 auto;

  .section-desc {
    font-size: 18px;
    color: var(--vp-c-text-2);
    line-height: 1.6;
  }
}

/* 特别长的标题需要更大的空间 */
.home-intro .section-title {
  padding: 10px 16px;
  max-width: 100%;
  word-break: break-word;
  white-space: normal;
}

.home-features {
  padding: 40px 0 80px;

  .features-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .feature-item {
    /* background-color: var(--vp-c-bg-soft); */
    border: 2px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px var(--vp-c-shadow-1);
    position: relative;
    overflow: hidden;

    &::before {
      content: none;
    }

    &:hover {
      box-shadow: 0 8px 24px var(--vp-c-shadow-2);
      transform: translateY(-5px);
    }

    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 12px;
      margin-bottom: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
      }
    }

    .feature-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 12px;
    }

    .feature-details {
      font-size: 15px;
      color: var(--vp-c-text-2);
      line-height: 1.6;
      margin: 0;
    }
  }
}

.home-showcase-container {
  position: relative;
  width: 100%;
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 60px 0;
    min-height: initial;
  }
}

.home-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 80px;
  }
}

.showcase-section {
  width: 90%;
  max-width: 1200px;
  height: 70vh;
  margin: 0;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: auto;

  background: linear-gradient(45deg, rgba(76, 138, 231, 0.1), rgba(142, 84, 233, 0.1));
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(76, 138, 231, 0.15);
  border: none;

  @media (max-width: 768px) {
    height: auto;
    min-height: 80vh;
    max-height: 85vh;
    /* 限制最大高度 */
    padding: 20px 15px;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* 从顶部开始布局 */
  }
}

.showcase-nav {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.showcase-nav.visible {
  opacity: 1;
  visibility: visible;
}

.showcase-dots {
  display: flex;
  flex-direction: column;
  gap: 15px;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(76, 138, 231, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: linear-gradient(135deg, #4a8af4, #9254de);
      transform: scale(1.2);
      box-shadow: 0 0 10px rgba(74, 138, 244, 0.5);
    }
  }
}

.showcase-row {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  height: 100%;
  overflow: auto;

  &.reverse {
    flex-direction: row-reverse;
  }

  .showcase-text {
    flex: 1;
    padding: 0 30px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(76, 138, 231, 0.3);
      border-radius: 10px;
    }

    h3 {
      font-size: 34px;
      font-weight: 600;
      margin-bottom: 16px;
      color: transparent;
      background-image: var(--sy-gradient-cyan-blue);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 5px 0;
      line-height: 1.4;
    }

    .content-section {
      margin-bottom: 16px;
    }

    .content-subtitle {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #4a9eea;
      display: block;
    }

    .content-points {
      list-style-type: disc;
      padding-left: 20px;

      li {
        font-size: 15px;
        line-height: 1.5;
        font-weight: 600;
        color: var(--vp-c-text-2);
        margin-bottom: 4px;
      }
    }
  }

  .showcase-image {
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 100%;
    flex-direction: column;

    .image-placeholder {
      width: 100%;
      height: 280px;
      background-color: var(--vp-c-bg-soft);
      border-radius: 12px;
      border: 1px solid var(--vp-c-divider);
    }

    .showcase-img,
    .showcase-video {
      width: 100%;
      max-width: 700px;
      max-height: 90%;
      border-radius: 12px;
      margin-top: 0;
    }

    .copyright-disclaimer {
      margin-top: 10px;
      padding: 10px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      max-width: 700px;
      width: 100%;

      p {
        font-size: 12px;
        line-height: 1.4;
        color: var(--vp-c-text-3);
        text-align: center;
        margin: 0;
      }
    }
  }
}

.home-integration {
  padding: 60px 0;
  background: linear-gradient(45deg, rgba(76, 138, 231, 0.1), rgba(142, 84, 233, 0.1));
  border-radius: 16px;
  margin: 40px 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(76, 138, 231, 0.15);
  border: none;

  &::before {
    content: none;
    /* 移除边框 */
  }

  .integration-content {
    display: flex;
    align-items: flex-start;
    padding: 0 40px;

    .integration-text {
      flex: 1;

      p {
        font-size: 18px;
        line-height: 1.6;
        color: var(--vp-c-text-1);
        margin-bottom: 16px;
        font-weight: 500;
      }

      p:first-child {
        font-size: 24px;
        font-weight: 700;
        background-image: linear-gradient(135deg, #4a8af4, #9254de);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        display: inline-block;
        margin-bottom: 8px;
      }
    }

    .integration-image {
      flex: 1;

      .fastemby-video {
        width: 100%;
        max-height: 400px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        clip-path: inset(5px 0 0 0);
        margin-top: -5px;
      }

      .copyright-disclaimer {
        margin-top: 10px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;

        p {
          font-size: 12px;
          line-height: 1.4;
          color: var(--vp-c-text-3);
          text-align: center;
          margin: 0;
        }
      }
    }
  }

  .integration-list {
    padding-left: 0;
    margin-top: 24px;

    li {
      margin-bottom: 18px;
      color: var(--vp-c-text-1);
      font-size: 16px;
      line-height: 1.6;
      position: relative;
      list-style-type: none;
      padding-left: 30px;
      background: linear-gradient(90deg, rgba(76, 138, 231, 0.05), transparent);
      padding: 8px 12px 8px 36px;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        background: linear-gradient(90deg, rgba(76, 138, 231, 0.1), transparent);
      }

      &:before {
        content: '✓';
        position: absolute;
        left: 10px;
        color: #42b983;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}

.section-title[data-text="与FastEmby完美配合"] {
  margin-bottom: 30px;
  background-image: linear-gradient(135deg, #4a8af4, #9254de);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-size: 34px;
  position: relative;
}

.home-testimonials {
  padding: 60px;

  .testimonials-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .testimonial-item {
    background-color: var(--vp-c-bg-soft);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 16px var(--vp-c-shadow-1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 200px;

    &:nth-child(3n+1)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--sy-gradient-primary);
    }

    &:nth-child(3n+2)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--sy-gradient-blue-purple);
    }

    &:nth-child(3n+3)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--sy-gradient-blue-cyan);
    }

    &:nth-child(4n)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--sy-gradient-hot);
    }

    .testimonial-content {
      font-size: 15px;
      line-height: 1.6;
      color: var(--vp-c-text-2);
      margin-bottom: 16px;
      font-style: italic;
      flex-grow: 1;
    }

    .testimonial-author {
      display: flex;
      flex-direction: column;
      margin-top: auto;

      .author-name {
        font-weight: 600;
        font-size: 16px;
        color: transparent;
        background-image: linear-gradient(135deg, #4a8af4, #9254de);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 3px 0;
      }
    }
  }
}

.home-cta {
  background: var(--sy-gradient-blue-purple);
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;

  h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 32px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;

    .action-button {
      &.primary {
        border-color: white;
        color: white;
      }

      &.secondary {
        border-color: white;
        color: white;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

.home-cta .action-button.enhanced {
  background: linear-gradient(45deg, #2196f3, #00bcd4, #4caf50);
  background-size: 200% 200%;
  color: white;
  font-size: 20px;
  padding: 16px 42px;
  border-radius: 30px;
  border: none;
  box-shadow: 0 8px 24px rgba(33, 150, 243, 0.3);
  transition: all 0.5s ease;
  animation: gradientShift 3s ease infinite;
}

.home-cta .action-button.enhanced:hover {
  box-shadow: 0 12px 28px rgba(33, 150, 243, 0.5);
  transform: translateY(-5px);
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}

@media (max-width: 768px) {
  .home-hero {

    .hero-title {
      font-size: 36px;
    }

    .hero-description {
      font-size: 18px;
    }
  }

  .section-title {
    font-size: 28px;
  }

  .home-showcase-container {
    padding: 40px 0;
    min-height: auto;
  }

  .home-showcase {
    gap: 60px;
  }

  .showcase-section {
    height: auto;
    min-height: 75vh;
    max-height: 85vh;
    /* 限制最大高度，避免过长 */
    padding: 20px 15px;
    width: 95%;
    overflow-y: auto;
    /* 允许内容溢出时滚动 */
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 确保内容分布均匀 */
  }

  .home-showcase .showcase-row,
  .home-showcase .showcase-row.reverse {
    flex-direction: column;
    padding: 5px;
    height: auto;

    .showcase-text {
      padding: 0;
      margin-bottom: 15px;
      height: auto;
      max-height: 40vh;
      overflow-y: auto;

      h3 {
        font-size: 24px;
        margin-bottom: 10px;
        /* text-align: center; */
      }

      .content-subtitle {
        font-size: 16px;
      }

      .content-points {
        padding-left: 15px;

        li {
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 3px;
        }
      }
    }

    .showcase-image {
      padding: 0;
      width: 100%;
      height: auto;
      max-height: 35vh;
      margin-top: auto;
      flex-direction: column;

      .showcase-img,
      .showcase-video {
        max-width: 100%;
        max-height: 30vh;
        margin: 0 auto;
      }

      .copyright-disclaimer {
        max-width: 100%;
        margin-top: 5px;

        p {
          font-size: 10px;
        }
      }
    }
  }

  .showcase-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .showcase-nav {
    position: fixed;
    bottom: 20px;
    top: auto;
    right: 50%;
    transform: translateX(50%);
    z-index: 1000;
  }

  .showcase-dots {
    flex-direction: row;
    gap: 10px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(4px);

    span {
      width: 8px;
      height: 8px;

      &.active {
        width: 10px;
        height: 10px;
      }
    }
  }

  .home-cta {
    padding: 40px 20px;

    .cta-buttons {
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .action-button {
        width: 100%;
        max-width: 300px;
      }
    }
  }

  /* 确保FastEmby集成部分的响应式 */
  .home-integration .integration-content {
    flex-direction: column;

    .integration-text {
      padding: 0;
      margin-bottom: 30px;
    }

    .integration-image {
      width: 100%;

      .fastemby-video {
        max-width: 100%;
        max-height: 300px;
        margin: 0 auto;
      }
    }
  }
}

.hero-banner-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.hero-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-content {
  position: absolute;
  top: 40%;
  left: 15%;
  transform: translateY(-50%);
  text-align: left;
  z-index: 2;
  width: 50%;
  padding: 0 20px;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 5px !important;
  background-image: var(--sy-gradient-cyan-blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero-subtitle {
  font-size: 36px;
  line-height: 1.4;
  margin-top: 10px;
  margin-bottom: 0px !important;
  font-weight: 900;
  background-image: var(--sy-gradient-cyan-blue);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero-slogan {
  font-size: 24px;
  margin-top: 0px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-content {
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
  }

  .hero-banner {
    content: v-bind(bannerMobile);
  }
}

.home-footer {
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.disclaimer {
  margin-bottom: 20px;
  padding: 0 20px;

  p {
    font-size: 13px;
    color: var(--vp-c-text-3);
    line-height: 1.6;
    margin: 0;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}

.copyright {
  font-size: 14px;
  color: var(--vp-c-text-3);
}
</style>