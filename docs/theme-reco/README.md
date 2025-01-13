---
title: 搭建博客
date: 2021-11-09 00:00:00
categories: 
  - theme-reco
tags: 
  - 
---
### 使用vuepress搭建博客（最好使用yarn）
```
  npm -g i @vuepress-reco/theme-cli
  theme-cli init //选择一个主题

```
#### .vuepress(配置文件夹)
+ config.js
  ```js
    module.exports = {
      title: "我的博客",
      description: '学习文档',
      dest: 'public',
      base:"/blog/",
      head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
      ],
      theme: 'reco',
      themeConfig: {
        nav: [// 顶部导航
          { text: '首页', link: '/', icon: 'reco-home' },
          { text: '时间线', link: '/timeline/', icon: 'reco-date' },
          { text: '文档', 
            icon: 'reco-message',
            items: [
              { text: 'vuepress-reco', link: '/docs/theme-reco/' }
            ]
          },
          { text: '链接', 
            icon: 'reco-message',
            items: [
              { text: 'Gitee', link: 'https://gitee.com/zhang722/', icon: 'reco-mayun' }
            ]
          }
        ],
        sidebar: {// 文章左侧导航（根据路径）
          '/docs/theme-reco/': [
             ''    
          ],
          '/blogs/2021/':[
            'css/css',
            'js/js',
            'threejs/threejs'
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
        logo: '/logo.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
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
        startYear: '2021'
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
      markdown: {
        lineNumbers: true
      }
  }  
  ```
  #### 内容
  ```
    ---
    title: threejs模型导入及操作（vue）
    date: 2021-11-10
    tags:
    - threejs
    category:
    - threejs
    ---
    //符号‘---’包裹内为文档信息，接着往下编辑为内容(使用markdown语法)
  ```
  #### 增加评论功能(vssue)
  ```js
  // 安装 https://vssue.js.org/zh/guide/vuepress.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95
  // npm install @vssue/vuepress-plugin-vssue
  // npm install @vssue/api-github-v3   //api根据部署平台选择 例如：在gitee上部署需安装@vssue/api-gitee-v5
  // .vuepress/config.js
  // 在.vuepress/config.js中添加
    module.exports = {
      plugins: {
        '@vssue/vuepress-plugin-vssue': {
          // 设置 `platform` 而不是 `api`
          platform: 'github',//platform: 'gitee'，与安装的api对应

          // 其他的 Vssue 配置
          owner: 'OWNER_OF_REPO',// github或gitee的用户名
          repo: 'NAME_OF_REPO',// 管理评论的git厂库名
          clientId: 'YOUR_CLIENT_ID',// gitee-右上角头像-设置-第三方应用填写（权限勾选issues&notes）-创建（创建后生成clientId&clientSecret）
          clientSecret: 'YOUR_CLIENT_SECRET',
        },
      },
    };
    // 使用
    // 在markdown文档中加如 <Vssue />就行
  ```
  #### 部署
    + 使用gitee或者gitHub部署
    + 使用yarn run build打包
    + 打包的文件默认为public文件夹
    + 在gitee或者gitHub上创建项目，将public文件夹的内容上传或者将整个博客项目上传
    + 以gitee为例，在gitee上打开项目选择 服务-gitee pages
    + 部署分支master，如果上传的是打包后的文件夹-部署目录不用设置，如果是整个项目则设置部署目录为打包的文件夹（public）
    + 点击启动等待部署完成，完成后会有一个网址就是博客网址了

  ### 评论
  <Vssue />

