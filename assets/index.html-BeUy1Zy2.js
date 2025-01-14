import{_ as n,c as a,a as e,o as i}from"./app-iCGy6m7k.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<ul><li>当地图包含子区域时，阴影或伪3D效果实现方法：</li><li>方法1</li></ul><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>    方法：使用geo或者series-map，两层地图重叠，下层地图设置阴影实现。</span></span>
<span class="line"><span>    缺陷：地图如果需要缩放或者移动，就算监听georoam实现同步变化效果也不理想，</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>方法2</p><p>1.只使用一个geo，下载geojson文件时下载包含子区域和不包含资源两个geojson文件，不包含子区域json中的features数组只有一个元素（地图外围边框数据），将这个元素复制粘贴到包含子区域json的features数组的第一位，并修改properties中的name;</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&quot;features&quot;: [{</span></span>
<span class="line"><span>    &quot;type&quot;: &quot;Feature&quot;,</span></span>
<span class="line"><span>    &quot;properties&quot;: {</span></span>
<span class="line"><span>        &quot;adcode&quot;: 500241,</span></span>
<span class="line"><span>        &quot;name&quot;: &quot;边框&quot;,</span></span>
<span class="line"><span>        &quot;center&quot;: [108.996043, 28.444772],</span></span>
<span class="line"><span>        &quot;centroid&quot;: [109.018121, 28.491722],</span></span>
<span class="line"><span>        &quot;childrenNum&quot;: 0,</span></span>
<span class="line"><span>        &quot;level&quot;: &quot;district&quot;,</span></span>
<span class="line"><span>        &quot;acroutes&quot;: [100000, 500000],</span></span>
<span class="line"><span>        &quot;parent&quot;: {</span></span>
<span class="line"><span>        &quot;adcode&quot;: 500000</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    ......</span></span>
<span class="line"><span>    ......</span></span>
<span class="line"><span>    ......</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.在geo中设置regions（其他配置就不说了），将阴影加载外围边框上（name与上面json中设置的一致）,这样就完成了</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>    regions: [{</span></span>
<span class="line"><span>            name: &#39;边框&#39;,</span></span>
<span class="line"><span>            itemStyle: {</span></span>
<span class="line"><span>                shadowColor: &#39;rgb(49, 165, 242, 1)&#39;,</span></span>
<span class="line"><span>                shadowBlur: 0,</span></span>
<span class="line"><span>                shadowOffsetY: 15,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            label: {</span></span>
<span class="line"><span>                show: false</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>    }],</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实现地图3D效果还可以用geo3D或者map3D，但是我的需求中scatter3D的symbol样式满足不了设计图需求，只有用2D实现，以前使用2D地图实现3D效果的方法又满足不了需求，于是就有了上面的方法</p></li></ul>`,3)]))}const c=n(l,[["render",p],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/j0gb7ezg/","title":"echarts地图3D效果&外部阴影","lang":"zh-CN","frontmatter":{"title":"echarts地图3D效果&外部阴影","createTime":"2025/01/14 11:45:36","permalink":"/article/j0gb7ezg/"},"headers":[],"readingTime":{"minutes":1.17,"words":350},"git":{},"filePathRelative":"blogs/2022/echarts/map.md","categoryList":[{"id":"51704a","sort":10000,"name":"blogs"},{"id":"764894","sort":10001,"name":"2022"},{"id":"ccb88f","sort":10002,"name":"echarts"}],"bulletin":false}');export{c as comp,r as data};
