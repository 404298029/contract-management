<template>
  <div class="navBar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screen-full id="screenFull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip content="全局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" @command="updatePass">
        <div class="avatar-wrapper">
          <span>{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item command="b">
            <span @click="updatePass">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      status-icon
      :modal-append-to-body="false"
      center
      width="400px"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <span>{{ name }}</span>
        </el-form-item>
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPass">
          <el-input v-model="form.oldPass" type="password" autocomplete="off" style="width:150px" placeholder="原密码" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPass">
          <el-input
            v-model="form.newPass"
            type="password"
            show-password
            autocomplete="off"
            style="width:150px"
            placeholder="新密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pass2">
          <el-input
            v-model="form.pass2"
            type="password"
            show-password
            autocomplete="off"
            style="width:150px"
            placeholder="确认密码"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lose">取 消</el-button>
        <el-button type="primary" :loading="fas" @click="commit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import SizeSelect from '@/components/SizeSelect'
import ScreenFull from '@/components/Screenfull'
import { changepass } from '@/api/upms/user'
import store from '@/store'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    SizeSelect,
    ScreenFull
  },
  data() {
    const pass = (rule, value, cb) => {
      if (!value) {
        cb(new Error('密码不能为空'))
      } else {
        cb()
      }
    }
    let v
    const pass1 = (rule, value, cb) => {
      const user = /^[a-zA-Z0-9]{6,}$/
      if (!value || !user.test(value)) {
        cb(new Error('密码不能为空且不少于6位'))
      } else {
        cb()
        v = value
      }
    }
    const pass2 = (rule, value, cb) => {
      if (!value) {
        cb(new Error('确认密码不能为空'))
      } else if (v !== value) {
        cb(new Error('两次密码不一致'))
      } else {
        cb()
      }
    }
    return {
      rules: {
        oldPass: [{ required: true, trigger: 'blur', validator: pass }],
        newPass: [{ required: true, trigger: 'blur', validator: pass1 }],
        pass2: [{ required: true, trigger: 'blur', validator: pass2 }]
      },
      fas: false,
      dialogFormVisible: false,
      loading: false,
      form: {
        id: store.state.user.uid,
        oldPass: '',
        newPass: '',
        pass2: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name', 'uid'])
  },
  methods: {
    updatePass(com) {
      if (com === 'b') {
        this.dialogFormVisible = true
      }
    },
    commit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.fas = true
          changepass(this.form).then(res => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.fas = false
              this.dialogFormVisible = false
              this.form = {}
            }
          })
        }
      })
    },
    lose() {
      this.dialogFormVisible = false
      this.form = {}
      this.fas = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('tagsView/delAllViews')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
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

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
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
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
