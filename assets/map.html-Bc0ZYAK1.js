import{_ as n,c as e,a,o as i}from"./app-K4CeAmvM.js";const l={};function t(d,s){return i(),e("div",null,s[0]||(s[0]=[a(`<ul><li>当地图包含子区域时，阴影或伪3D效果实现方法：</li><li>方法1</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    方法：使用geo或者series-map，两层地图重叠，下层地图设置阴影实现。</span>
<span class="line">    缺陷：地图如果需要缩放或者移动，就算监听georoam实现同步变化效果也不理想，</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>方法2</p><p>1.只使用一个geo，下载geojson文件时下载包含子区域和不包含资源两个geojson文件，不包含子区域json中的features数组只有一个元素（地图外围边框数据），将这个元素复制粘贴到包含子区域json的features数组的第一位，并修改properties中的name;</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">&quot;features&quot;: [{</span>
<span class="line">    &quot;type&quot;: &quot;Feature&quot;,</span>
<span class="line">    &quot;properties&quot;: {</span>
<span class="line">        &quot;adcode&quot;: 500241,</span>
<span class="line">        &quot;name&quot;: &quot;边框&quot;,</span>
<span class="line">        &quot;center&quot;: [108.996043, 28.444772],</span>
<span class="line">        &quot;centroid&quot;: [109.018121, 28.491722],</span>
<span class="line">        &quot;childrenNum&quot;: 0,</span>
<span class="line">        &quot;level&quot;: &quot;district&quot;,</span>
<span class="line">        &quot;acroutes&quot;: [100000, 500000],</span>
<span class="line">        &quot;parent&quot;: {</span>
<span class="line">        &quot;adcode&quot;: 500000</span>
<span class="line">        }</span>
<span class="line">    },</span>
<span class="line">    ......</span>
<span class="line">    ......</span>
<span class="line">    ......</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.在geo中设置regions（其他配置就不说了），将阴影加载外围边框上（name与上面json中设置的一致）,这样就完成了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    regions: [{</span>
<span class="line">            name: &#39;边框&#39;,</span>
<span class="line">            itemStyle: {</span>
<span class="line">                shadowColor: &#39;rgb(49, 165, 242, 1)&#39;,</span>
<span class="line">                shadowBlur: 0,</span>
<span class="line">                shadowOffsetY: 15,</span>
<span class="line">            },</span>
<span class="line">            label: {</span>
<span class="line">                show: false</span>
<span class="line">            },</span>
<span class="line">    }],</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实现地图3D效果还可以用geo3D或者map3D，但是我的需求中scatter3D的symbol样式满足不了设计图需求，只有用2D实现，以前使用2D地图实现3D效果的方法又满足不了需求，于是就有了上面的方法</p></li></ul>`,3)]))}const r=n(l,[["render",t],["__file","map.html.vue"]]),p=JSON.parse('{"path":"/blogs/2022/echarts/map.html","title":"echarts地图3D效果&外部阴影","lang":"en-US","frontmatter":{"title":"echarts地图3D效果&外部阴影","date":"2022-07-14T00:00:00.000Z","tags":["echarts"],"categories":[]},"headers":[],"git":{"createdTime":1736844934000,"updatedTime":1736844934000,"contributors":[{"name":"zy","email":"848175192@qqcom","commits":1}]},"filePathRelative":"blogs/2022/echarts/map.md"}');export{r as comp,p as data};
