---
title: 常用js方法
date: 2021-11-09 00:00:00
categories: []
tags: 
  - 
---
+ rem自适应
```js
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 这里的750 取决于设计稿的宽度
                docEl.style.fontSize = 16 * (clientWidth / 1920) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

+ 颜色加透明度
```js
function hexToRgba(hex, opacity) {
	if (hex[0] == '#') {
		if (hex.length > 4) {
            // #ffffff
			return (
				'rgba(' +
				parseInt('0x' + hex.slice(1, 3)) +
				',' +
				parseInt('0x' + hex.slice(3, 5)) +
				',' +
				parseInt('0x' + hex.slice(5, 7)) +
				',' +
				opacity +
				')'
			)
		} else {
            // #fff
			return (
				'rgba(' +
				parseInt('0x' + hex.slice(1, 3)) +
				',' +
				parseInt('0x' + hex.slice(1, 3)) +
				',' +
				parseInt('0x' + hex.slice(1, 3)) +
				',' +
				opacity +
				')'
			)
		}

	} else {
       
		let arr = hex.substring(hex.indexOf('('), hex.indexOf(')')).split(',');
         // rgba
		if (arr.length > 3) {
			arr.pop();
		}
		arr.push(opacity);
		let str = arr.join(',');
		return (
			'rgba(' + str + ')'
		)
	}

};
```

+ 数组分类
```js
funtion classify(attr){
    let dataArr = [];
    list.map((item) => {
      if (dataArr.length == 0) {
        dataArr.push({ publicAttr: item[attr], list: [item] });
      } else {
        let res = dataArr.some((item) => {
          //判断相同的大类，有就添加到当前项
          if (item.publicAttr == item[attr]) {
            item.list.push(item);
            return true;
          }
        });
        if (!res) {
          //如果没找相同的大类添加一个新对象
          dataArr.push({ publicAttr: item[attr], list: [item] });
        }
      }
    });
    return dataArr
}

```

+ 验证码
```js
function change (n) {
    var arr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var s = "";
    for (var i= 0; i < n; i++) {
        var index = parseInt(Math.random()*arr.length);
        s += arr[index];
    }
    return s;
}
```

+ 防抖
```js
export function debounce(func, wait=500, immediate=false) {
    var timeout
    return function() {
        var context = this
        var args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
    }
}
```

+ 节流
```js
export function throttle(func, wait=500, options) {
    var timeout, context, args
    var previous = 0
    if (!options) options = {leading:false,trailing:true}

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    var throttled = function() {
        var now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}
```

+ 懒加载
```js
  Vue.prototype.$unobserve = () => {
    var io = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          item.target.style.visibility = "visible";
          // 停止监控
          io.unobserve(item.target);
        }
      });
    });
    document.querySelectorAll(".ioimg").forEach((item) => {
      // 监控元素
      io.observe(item);
    });
  }
```

+ 根据窗口大小改变
```js
export default function screen() {
  var bodyStyle = document.createElement('style')
  bodyStyle.innerHTML = `body{width:1920px; height:1080px!important;}`
  document.documentElement.firstElementChild.appendChild(bodyStyle)

  function refreshScale() {
    let docWidth = document.documentElement.clientWidth;
    let docHeight = document.documentElement.clientHeight;
    var designWidth = 1920,
      designHeight = 1080,
      widthRatio = docWidth / designWidth,
      heightRatio = docHeight / designHeight,
      desRatio = designWidth / designHeight,
      docRatio = docWidth / docHeight;
      // 需要缩放的页面
    if (window.location.href.indexOf('zationData') == -1) {
      return
    }
    
    if (docRatio > desRatio) {
      // 比例大于设定比时，保证网页高度，并居中
      document.body.style = `transform:scale(${heightRatio},${heightRatio});transform-origin:center top;`;
    } else {
      // 比例小于等于设定比时，保证网页宽度
      document.body.style = `transform:scale(${widthRatio},${widthRatio});transform-origin:left top`;
    }
    // 应对浏览器全屏切换前后窗口因短暂滚动条问题出现未占满情况
      setTimeout(function(){
        if(docRatio>desRatio){
            document.body.style = `transform:scale(${heightRatio},${heightRatio});transform-origin:center top;`;
        }else{
            document.body.style = `transform:scale(${widthRatio},${widthRatio});transform-origin:left top;`;
        }
      },0)
  }
  refreshScale()

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      refreshScale()
    }
  }, false);
  window.addEventListener("resize", refreshScale, false);
}
```

+ 打印HTML
```js
const style = `<style>
    @page: pseudo-class {
      size: A4 landscape;
      margin: 2 cm;
    }
    @media print {
      section {page-break-before: always;}
      h1 {page-break-after: always;}
      p {
        page-break-inside: avoid;
        orphans: 3;
        widows: 2;
      }
    }
  </style>`
// 创建iframe容器
function createdIframe() {
  // 约定iframe的id为#reactPrintIframe
  let iframe = document.getElementById('reactPrintIframe');
  if (!iframe) {
    iframe = document.createElement('IFRAME');
    iframe.setAttribute('id', 'reactPrintIframe');
    // 让iframe不可见
    iframe.setAttribute('style', 'position:fixed;width:0px;height:0px;left:-5500px;top:-5500px;z-index:-1;margin:0;display:none');
    document.body.appendChild(iframe);
  }
  return iframe;
}
// 获取当前内容所在document的head, 并且过滤掉js
function getParentHead() {
  const head = document.head;
  const childs = head.childNodes;
  for (var i = 0; i < childs.length; i++) {
    const child = childs[i];
    if (child.nodeType === 1 && child.tagName.toLowerCase() === 'script') {
      head.removeChild(child);
      i--;
    }
  }
  return head;
}
// 打印方法(传入dom)
function print(element) {
  const iframe = createdIframe();
  const parentHead = getParentHead();
  let doc = iframe.contentWindow.document || iframe.contentDocument.document;


  doc.head.innerHTML = parentHead.innerHTML + style;
  doc.body.innerHTML =element.innerHTML;
  doc.close();
  // 延迟打印
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 350);
}
export default print

```

+ html转pdf&打印
```js
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
const printInfo = (element, name) => {
  let w = element.offsetWidth; // 获得该容器的宽
  let h = element.offsetWidth; // 获得该容器的高
  let offsetTop = element.offsetTop; // 获得该容器到文档顶部的距离
  let offsetLeft = element.offsetLeft; // 获得该容器到文档最左的距离
  let canvas = document.createElement("canvas");


  let abs = 0;
  let win_i = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  let win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
  if (win_o > win_i) {
    abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
  }
  canvas.width = w * 2; // 将画布宽&&高放大两倍
  canvas.height = h * 2;
  let context = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-offsetLeft - abs, -offsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
  // translate的时候，要把这个差值去掉
  html2canvas(element, {
    // allowTaint: true,
    useCORS: true,
    scale: 2,
  }).then(function (canvas) {
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    //一页pdf显示html页面生成的canvas高度;
    let pageHeight = contentWidth / 592.28 * 841.89;
    //未生成pdf的html页面高度
    let leftHeight = contentHeight;
    //页面偏移
    let position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    let imgWidth = 555.28;
    let imgHeight = 592.28 / contentWidth * contentHeight;
    let pageData = canvas.toDataURL('image/jpeg', 1.0);

    let pdf = new jsPDF('', 'pt', 'a4');

    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight);
    } else { // 分页
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    pdf.save(name + '.pdf');
  });
}
export default printInfo
```

<!-- ### 评论
<Vssue /> -->