---
title: 滚动列表
date: 2022-6-27 00:00:00
tags: 
  - 组件
category: 
  - 组件
categories: []
---
+ https://gitee.com/braZ/scroll-list-mini

+ npm安装 (已上传npm)
```
npm install scroll-list-mini --save
import { ScrollList } from 'scroll-list-mini'
<ScrollList></ScrollList>
```
+ 参数
```
    + dataList-数据列表
    + unit-像素单位px||rem
    + step-步长
    + stepTime-单步时长s
    + showRow-显示的行数
   
```
+ 使用
```html
    <ScrollList dataList={tableData} unit='rem' showRow='4' step='2.25' stepTime='4000'>
        {
            tableData.map(()=>{
                return <div />
            })
        }
    </ScrollList>
```

+ 组件源码
```js
import React, { useEffect } from "react";
    
function ScrollTable(props) {
    let timer;
    useEffect(() => {
        scroll()
        return () => {
            // clearInterval(timer);
            cancelAnimationFrame(timer)
        }
    }, [])
    // requestAnimationFrame实现
    function scroll() {
        let unit = props.unit || 'px';//单位
        let step = props.step || 20; // 步长
        let stepTime = props.stepTime || 3000; // 单步时长
        let tab = document.getElementById('scroll_small_list'); // 滚动列表
        let tabWrap = document.getElementById('scroll_small_wrap'); // 可是窗口
        let h, H, scrollH;

        tab.style.top = '0' + unit;
        let nowTime = 0;
        let lastTime = Date.now();
        function scrollTab() {
            H = tabWrap.offsetHeight;
            h = tab.offsetHeight;
            scrollH = tab.offsetTop;
            if ((h + scrollH) <= H) {
                tab.style.transition = '0s';
                tab.style.top = '0' + unit;
            } else {
                tab.style.transition = '1s'
                tab.style.top = tab.style.top.split(unit)[0] - step + unit;
            }
        }
        (function animloop() {
            nowTime = Date.now();
            if(nowTime-lastTime > stepTime){
                lastTime = nowTime
                scrollTab()
            }
            timer=requestAnimationFrame(animloop);
        })()
        // 鼠标移入
        tabWrap.addEventListener('mouseover', () => {
            cancelAnimationFrame(timer)
        })
        // 鼠标移出
        tabWrap.addEventListener('mouseleave', () => {
            (function animloop() {
                nowTime = Date.now();
                if(nowTime-lastTime > stepTime){
                    lastTime = nowTime
                    scrollTab()
                }
                timer=requestAnimationFrame(animloop);
            })()
        })
    }
    // setInterval实现
    function scroll2() {
        let unit = props.unit || 'px';//单位
        let step = props.step || 20; // 步长
        let stepTime = props.stepTime || 3000; // 单步时长
        let tab = document.getElementById('scroll_small_list'); // 滚动列表
        let tabWrap = document.getElementById('scroll_small_wrap'); // 可是窗口
        let h, H, scrollH;

        tab.style.top = '0' + unit;
        clearInterval(timer)
        timer = setInterval(() => {
            H = tabWrap.offsetHeight;
            h = tab.offsetHeight;
            scrollH = tab.offsetTop;
            // console.log(h,scrollH,H);
            if ((h + scrollH) <= H) {
                tab.style.transition = '0s';
                tab.style.top = '0' + unit;
            } else {
                tab.style.transition = '1s'
                tab.style.top = tab.style.top.split(unit)[0] - step + unit;
            }

        }, stepTime)
        // 鼠标移入
        tabWrap.addEventListener('mouseover', () => {
            clearInterval(timer);
        })
        // 鼠标移出
        tabWrap.addEventListener('mouseout', () => {
            clearInterval(timer);
            timer = setInterval(() => {
                H = tabWrap.offsetHeight;
                h = tab.offsetHeight;
                scrollH = tab.offsetTop;
                if ((h + scrollH) <= H) {
                    tab.style.transition = '0s';
                    tab.style.top = '0' + unit;
                } else {
                    tab.style.transition = '1s'
                    tab.style.top = tab.style.top.split(unit)[0] - step + unit;
                }

            }, stepTime)
        })
    }
    let unit = props.unit || 'px';
    let showRow = props.showRow || 3;
    let step = props.step || 20;
    let length = props.dataList?.length || 0;
    return (
        <div className={props.wrapName ? props.wrapName + " scrollWrap" : "scrollWrap"} id='scroll_small_wrap' style={{ height: length * step + unit, maxHeight: step * showRow + unit, position: 'relative' }}>
            <div className={props.ListName ? props.ListName + " scrollList" : "scrollList"} id='scroll_small_list' style={{ height: length * step + unit, width: '100%', position: 'absolute', top: 0, left: 0 }}>
                {props.children}
            </div>
        </div>
    )
}
export default ScrollTable
```