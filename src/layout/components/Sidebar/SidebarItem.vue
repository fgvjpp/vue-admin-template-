<template>
  <div v-if="!item.hidden" class="animation" :class="{'red':isok}" @click="target">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="$t(item.name)" />
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { getCookies } from '@/utils/auth'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      isok: false,
      dom: {
        span: null,
        svg: null
      }
    }
  },
  methods: {
    target(e) {
      if (parseInt(getCookies('sidebarStatus')) !== 0) {
        Array.prototype.forEach.call(e.target.children, item => {
          if (item.nodeName === 'svg') {
            this.dom.svg = item
          }
          if (item.nodeName === 'SPAN') {
            this.dom.span = item
          }
        })
        this.$emit('target')
        if (this.dom.span) {
          this.dom.span.style.color = '#43a7fe'
        }
        if (this.dom.svg) {
          this.dom.svg.style.color = '#43a7fe'
        }
        this.isok = true
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
 .red {
    background-color: #fff !important;
}

.animation {
  transition: all 0.5s;
}
</style>
