<template>
    <div class="qr-login" v-if="init">
        <msg :icon="icon" :title="title" :description="message" :buttons="btn"></msg>
    </div>
</template>
<script>
import { Msg, XButton } from 'vux'
export default {
  components: {
    Msg,
    XButton
  },
  data () {
    return {
      key: '',
      init: false,
      icon: 'info',
      title: '合作平台登录',
      message: '正在授权求知圈合作平台登录',
      btn: [
        {text: '确定登录', type: 'primary', onClick: () => { this.$vux.loading.show(); this.consent_login() }},
        {text: '取消', type: 'default', onClick: () => { this.$wechat.closeWindow() }}
      ]
    }
  },
  mounted () {
    this.key = this.$route.query.key

    this.$http.get('v1/get_login_key?key=' + this.key).then(res => {
      this.init = true
      if (res.code === 200) {
        this.$wechat.config(res.data.wx_config)
        if (!res.data.state) {
          this.icon = 'warn'
          this.title = '二维码错误'
          this.btn = [{text: '关闭', type: 'default', onClick: () => { this.$wechat.closeWindow() }}]
        }
      }
    }, fail => {})
  },
  methods: {
    consent_login () {
      this.$http.get('v1/consent_login?key=' + this.key).then(res => {
        this.$vux.loading.hide()
        if (res.code === 200) {
          this.icon = 'success'
          this.title = '授权成功'
          this.btn = [{text: '关闭', type: 'default', onClick: () => { this.$wechat.closeWindow() }}]
        } else {
          this.icon = 'warn'
          this.title = res.message
          this.btn = [{text: '关闭', type: 'default', onClick: () => { this.$wechat.closeWindow() }}]
        }
      }, fail => {
        this.$vux.loading.hide()
      })
    }
  }
}
</script>
<style lang="less">
.qr-login {
  position: relative;
}
</style>
