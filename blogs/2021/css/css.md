---
title: 常用css
date: 2021-12-29 00:00:00
tags: 
  - css
category: 
  - css
categories: []
---
### 流光字
```css
    .sq_start {
    width: 100%;
    height: 100%;
    background-image: -webkit-linear-gradient(
        -40deg,
        transparent,
        transparent 42%,
        rgba(255, 255, 255,0.5) 50%,
        transparent 58%,
        transparent
    );
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked 1s infinite linear;
    }
    @keyframes masked {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: 0 0;
    }
    }
```
<imgbox :url="require('../../../.vuepress/public/img/shanguangzi.gif')" />

<!-- ### 评论
<Vssue /> -->