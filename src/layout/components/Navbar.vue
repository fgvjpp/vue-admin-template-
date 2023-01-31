<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="app-breadcrumb">
      江苏传智播客教育科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>
    <div class="right-menu">
      <el-dropdown trigger="click" class="lang" @command="handoverLang">
        <span class="el-dropdown-link">
          {{ lang | filtrationLang }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="cn">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" content="换肤" placement="bottom">
        <themePicker class="themePicker" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <svg-icon style="margin-right:10px;color: #fff;cursor:pointer;" icon-class="fullscreen" @click.native="fullScreen" />
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imgError="errorImgSrc" :src="userInfo.staffPhoto" class="user-avatar">
          <span class="name">{{ userInfo.username }}</span>
          <i class="el-icon-caret-bottom" style="color:#fff" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/shuiruohanyu/hrsaas53">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { resetRouter } from '@/router/index'
import ScreenFull from 'screenfull'
import themePicker from '@/components/ThemePicker'
import { setCookies, getCookies } from '@/utils/auth'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    themePicker
  },
  filters: {
    filtrationLang(val) {
      switch (val) {
        case 'cn':
          val = '中文'
          break
        case 'en':
          val = 'English'
          break
      }
      return val
    }
  },
  data() {
    return {
      errorImgSrc: require('@/assets/common/head.jpg'), // 解析图片路径
      lang: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  created() {
    this.lang = this.$i18n.locale
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.commit('user/removeAll')
      this.$router.push('/login')
      this.$message.success('退出成功')
      resetRouter()
    },
    fullScreen() {
      if (ScreenFull.isEnabled) {
        ScreenFull.toggle()
      } else {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
      }
    },
    handoverLang(lang) {
      if (getCookies('lang') !== lang) {
        setCookies('lang', lang)
        this.$i18n.locale = lang
        this.lang = lang
        this.$store.state.calendarApply++
        this.$message.success('语言切换成功')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .app-breadcrumb {
        display: inline-block;
        font-size: 18px;
        line-height: 50px;
        margin-left: 10px;
        color: #ffffff;
        cursor: text;
        .breadBtn {
            background: #84a9fe;
            font-size: 14px;
            padding: 0 10px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            border-radius: 10px;
            margin-left: 15px;
        }
    }
    .right-menu {
        position: relative;
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }
        .lang {
          height: 28px;
          margin-right: 50px;
          color: #ffffff;
          span{
            cursor: pointer;
          }
        }
        .themePicker {
          position: absolute;
          right: 155px;
          top: 10px;
        }
        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;
            .user-avatar {
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 15px;
                vertical-align: middle;
            }
            .name {
                color: #fff;
                vertical-align: middle;
                margin-left: 5px;
            }
            .user-dropdown {
                color: #fff;
            }
            .avatar-wrapper {
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 50%;
                    font-size: 12px;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>
