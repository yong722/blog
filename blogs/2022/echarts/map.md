---
title: echarts地图3D效果&外部阴影
date: 2022-76-14 00:00:00
tags: 
  - echarts
categories: []
---
+ 当地图包含子区域时，阴影或伪3D效果实现方法：
+ 方法1
```
    方法：使用geo或者series-map，两层地图重叠，下层地图设置阴影实现。
    缺陷：地图如果需要缩放或者移动，就算监听georoam实现同步变化效果也不理想，

```
+ 方法2

    1.只使用一个geo，下载geojson文件时下载包含子区域和不包含资源两个geojson文件，不包含子区域json中的features数组只有一个元素（地图外围边框数据），将这个元素复制粘贴到包含子区域json的features数组的第一位，并修改properties中的name;
    ```
    "features": [{
        "type": "Feature",
        "properties": {
            "adcode": 500241,
            "name": "边框",
            "center": [108.996043, 28.444772],
            "centroid": [109.018121, 28.491722],
            "childrenNum": 0,
            "level": "district",
            "acroutes": [100000, 500000],
            "parent": {
            "adcode": 500000
            }
        },
        ......
        ......
        ......
    ```
    2.在geo中设置regions（其他配置就不说了），将阴影加载外围边框上（name与上面json中设置的一致）,这样就完成了
    ```
        regions: [{
                name: '边框',
                itemStyle: {
                    shadowColor: 'rgb(49, 165, 242, 1)',
                    shadowBlur: 0,
                    shadowOffsetY: 15,
                },
                label: {
                    show: false
                },
        }],
    ```
+ 实现地图3D效果还可以用geo3D或者map3D，但是我的需求中scatter3D的symbol样式满足不了设计图需求，只有用2D实现，以前使用2D地图实现3D效果的方法又满足不了需求，于是就有了上面的方法
  