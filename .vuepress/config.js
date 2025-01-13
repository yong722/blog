module.exports = {
  title: "随风",
  description: '学习文档',
  dest: 'public',
  base: "/blog/",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      {
        text: '文档',
        icon: 'reco-message',
        items: [
          { text: 'vuepress-reco', link: '/docs/theme-reco/' }
        ]
      },
      {
        text: '链接',
        icon: 'reco-message',
        items: [
          { text: 'Gitee', link: 'https://gitee.com/zhang722', icon: 'reco-mayun' },
          { text: 'Github', link: 'https://github.com/yong722/blog', icon: 'reco-github' },
          { text: 'Npm', link: 'https://www.npmjs.com/~zhang521', icon: 'reco-npm' },
        ]
      }
    ],
    sidebar: {
      '/docs/theme-reco/': [
        ''
      ],
      '/blogs/2021/': [
        'css/css',
        'js/js',
        'components/components',
        'threejs/threejs'
      ],
      '/blogs/2022/': [
        'scrollList/scrollList',
        'echarts/map'
      ],
      '/blogs/2023/': [
        'guide/guide'
      ],
      '/blogs/2025/': [
        'cesium/cesium'
      ]
    },
    type: 'blog',
    blogConfig: {
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/header.jpeg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    mode: 'dark', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '随风',
    // 作者头像
    authorAvatar: '/header.jpeg',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2017'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'gitee',

      // 其他的 Vssue 配置
      owner: 'zhang722',
      repo: 'blog',
      clientId: 'bc3ea050bec9c520c8f20d8f1762ab40e60fa397850a732808b0fa30d67bdc20',
      clientSecret: '23d809206facf5f3432642e8f199dac306355a3acfce3a23da827b3601ffba39',
      autoCreateIssue: true
    },
    "sakura": {
      num: 20,  // 默认数量
      show: true, //  是否显示
      zIndex: 1,   // 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...'     // 绝对路径
      }
    },
    "@vuepress-reco/vuepress-plugin-kan-ban-niang": {
      theme: ['miku', 'shizuku', 'koharu', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'izumi', 'wanko', 'z16'],
      clean: false,
      messages: {
        welcome: '欢迎来到我的博客',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      },
      width: 150,
      height: 260
    },
    'ribbon': {
      size: 90, // width of the ribbon, default: 90
      opacity: 0.8, // opacity of the ribbon, default: 0.3
      zIndex: -1, // z-index property of the background, default: -1
    },
    "ribbon-animation":{
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    },
    'vuepress-plugin-cursor-effects': {
      size: 3, // size of the particle, default: 2
      shape: ['star'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    },
    'dynamic-title': {
      showIcon: '/favicon.ico',
      showText: '(/≧▽≦/)咦！又好了！',
      hideIcon: '/failure.ico',
      hideText: '(●—●)喔哟，崩溃啦！',
      recoverTime: 2000,
    },
    '@vuepress-reco/vuepress-plugin-bgm-player': {
      autoplay: true,
      autoShrink:true,
      shrinkMode:'mini',
      position:{ left: '10px', bottom: '10px', 'z-index': '999999'},
      audios: [
        // 本地文件示例
        {
          name: 'Love Song',
          artist: 'Suzanne Ciani',
          url: '/blog/bgm/music.mp3',
          cover: '/blog/bgm/musichead.jpeg'
        }
      ],
    },

    '@vuepress/plugin-medium-zoom': {
      selector: '.page img',
      delay: 1000,
      options: {
        margin: 24,
        background: 'rgba(25,18,25,0.9)',
        scrollOffset: 40
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
}
