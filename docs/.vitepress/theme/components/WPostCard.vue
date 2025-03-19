<template>
  <a v-if="props.noData" class="article-card post-card-no-data">
    <div class="post-container">
      <el-skeleton>
        <template #template>
          <div class="article-head">
            <el-skeleton-item variant="text" style="width: 30%;"/>
            <el-skeleton-item variant="text" style="width: 20px;"/>
          </div>
          <el-skeleton-item variant="text"/>
          <div class="post-loading">
            <weiz-loading />
          </div>
          <el-skeleton-item variant="text"/>
        </template>
      </el-skeleton>
    </div>
  </a>
  <a v-else class="article-card" :href="(post?.baseUrl || '') + post.url">
    <div class="article-head">
      <span class="date">{{ post.dateText ? formateDate(post.dateText[0]) : '' }}</span>
      <!-- 图标 -->
      <div :class="'weiz-icon weiz-icon-post xxm ' + (post.tags ? 'weiz-icon-' + post.tags[0].toLocaleLowerCase().replace(/\./g, '') : '')"></div>
    </div>
    <h3 class="article-title">
      <span>{{ subTitle(post.title) }}</span>
      <span class="article-title-hover">{{ subTitle(post.title) }}</span>
    </h3>
    <p class="article-abstract">{{ post.abstract }}</p>
    <div class="article-tag">
      <a class="article-tag-wrapper" v-for="(item, index) of post.tags?.slice(0, 3)" :key="index" :href="go(item)">
        <span class="sign">#</span> {{ item }}
      </a>
    </div>
  </a>
</template>

<script setup lang="ts">
import { HomePost } from '../type/WHome'
import { withBase } from 'vitepress'
import { calculateStrLength, truncateStr} from '../../utils/tools'

export interface PostCard extends HomePost {
  baseUrl?: string
}

const props = defineProps<{ post?: PostCard; noData?: Boolean }>()
const post = props?.post as PostCard

const formateDate = (date: string) => {
  const currentYear = String(new Date().getFullYear())
  if (date.indexOf(currentYear) === 0) {
    date = date.replace(currentYear + '/', '')
  }
  return date
}

const subTitle = (title: string) => {
  return calculateStrLength(title) > 28 ? truncateStr(title, 28) + '...' : title
}

const go = (tag: string) => {
  return withBase('/pages/tags?q=' + encodeURIComponent(tag))
}
</script>

<style lang="scss" scoped>
.article-card {
  width: 100%;
  display: inline-block;
  border-radius: var(--weiz-card-border-radius);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: var(--weiz-font-weight-medium);
  padding: var(--weiz-spacing-6xl);
  box-shadow: var(--weiz-shadow);
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s;
  &:hover {
    color: var(--vp-c-text-1);
    transform: scale(1.03);
    box-shadow: var(--weiz-shadow-hover);
    .article-title .article-title-hover {
      width: 100%;
    }
  }
  .article-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--weiz-spacing-4xl);
    .date {
      font-size: var(--weiz-font-size-sm);
      color: var(--vp-c-text-2);
    }
    .weiz-icon {
      filter: blur(8px);
    }
  }
  .article-title {
    font-size: var(--weiz-font-size-st);
    line-height: var(--weiz-text-st-line-height);
    font-weight: var(--weiz-font-weight-semibold);
    margin-bottom: var(--weiz-spacing-2xl);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    .article-title-hover {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      overflow: hidden;
      background-color: var(--vp-c-bg);
      color: var(--weiz-primary-color);
      transition: width 1s ease-in-out;
    }
  }
  .article-abstract {
    font-size: var(--weiz-font-size-sm);
    line-height: var(--weiz-text-sm-line-height);
    color: var(--vp-c-text-2);
    margin-bottom: var(--weiz-spacing-4xl);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .article-tag {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .article-tag-wrapper {
      font-size: var(--weiz-font-size-xs);
      color: var(--vp-c-text-2);
      margin-right: var(--weiz-spacing-3xl);
      &:first-child {
        color: var(--weiz-primary-color);
      }
      &:last-child {
        margin-right: 0;
      }
      cursor: pointer;
      &:hover {
        color: var(--weiz-primary-color);
      }
      .sign {
        font-size: var(--weiz-font-size-xs);
        color: var(--vp-c-text-4);
      }
    }
  }
  .post-loading {
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
