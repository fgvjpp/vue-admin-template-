<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" ref="reference" :key="route.name" :item="route" :base-path="route.path" @target="target" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
const { mapState } = createNamespacedHelpers('permission')
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    ...mapState(['routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  // created() {
  //   setTimeout(() => {
  //     console.log(this.$refs.reference)
  //   }, 1000)
  // },
  methods: {
    target() {
      this.$refs.reference.forEach(item => {
        item.isok = false
        if (item.dom.span) {
          item.dom.span.style.color = '#fff'
        }
        if (item.dom.svg) {
          item.dom.svg.style.color = '#fff'
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
