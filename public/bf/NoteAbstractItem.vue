<template>
  <div class="bg" @click="$router.push(item.path)" @mouseenter="colorChange">
    <div class="abstract-item">
      <reco-icon v-if="item.frontmatter.sticky" icon="reco-sticky" />
      <div class="title">
        <reco-icon v-if="item.frontmatter.keys" icon="reco-lock" />
        <router-link :to="item.path">{{ item.title }}</router-link>
      </div>
      <div class="abstract" v-html="item.excerpt"></div>
      <PageInfo :pageInfo="item" :currentTag="currentTag"> </PageInfo>
    </div>
    <div class="before" :style="{borderColor:color}"></div>
    <div class="after" :style="{borderColor:color}"></div>
    <div></div>
  </div>
</template>

<script>
import { defineComponent,ref,reactive } from "vue-demi";
import { RecoIcon } from "@vuepress-reco/core/lib/components";
import PageInfo from "./PageInfo";
export default defineComponent({
  components: { PageInfo, RecoIcon },
  props: ["item", "currentPage", "currentTag"],
  setup(){
    let color=ref('#f00');
    let colorArr=reactive(['#ff0000','#ff7300','#ffe600','#91ff00','#00ff55','#00fff2','#0084ff','#0004ff','#8c00ff','#ff00d4','#ff0015'])
    return {color,colorArr}
  },
  methods:{
    colorChange(){
      this.color=this.colorArr[Math.floor(Math.random()*this.colorArr.length)]
    }
  }
});
</script>

<style lang="stylus" scoped>
.bg {
  position: relative;
  margin: 0 auto 20px;
  padding: 2px;
  width: 100%;
  border-radius: $borderRadius;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: var(--background-color);
  cursor: pointer;

  .before, .after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid gold;
    transition: all 0.5s;
    animation: clippath 3s infinite linear;
    border-radius: 10px;
    display: none;
  }

  .after {
    animation: clippath 3s infinite -1.5s linear;
  }
}

.bg:hover {
  .before, .after {
    display: block;
  }
}

@keyframes clippath {
  0%, 100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }

  50% {
    clip-path: inset(98% 0 0 0);
  }

  75% {
    clip-path: inset(0 0 0 98%);
  }
}

.abstract-item {
  // position: relative;
  // margin: 0 auto 20px;
  padding: 16px 20px;

  // width: 100%;
  // overflow: hidden;
  // border-radius: $borderRadius;
  // box-shadow: var(--box-shadow);
  // box-sizing: border-box;
  // transition: all 0.3s;
  // background-color: var(--background-color);
  // cursor: pointer;
  > * {
    pointer-events: auto;
  }

  .reco-sticky {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    color: $accentColor;
    font-size: 2.4rem;
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }

  .title {
    position: relative;
    font-size: 1.28rem;
    line-height: 46px;
    display: inline-block;

    a {
      color: var(--text-color);
    }

    .reco-lock {
      font-size: 1.28rem;
      color: $accentColor;
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: $accentColor;
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      transition: 0.3s ease-in-out;
    }

    &:hover a {
      color: $accentColor;
    }

    &:hover:after {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }

  .tags {
    .tag-item {
      &.active {
        color: $accentColor;
      }

      &:hover {
        color: $accentColor;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-top: 1rem;
    margin-left: 0 !important;
  }
}
</style>
