<template>
    <div class="couses-detail">
        <div class="article-detail" v-if="init">
            <h1 class="title">{{title}}</h1>
            <div class="content">
                <div v-html="content">
                </div>
            </div>
            <div class="bottom-view">
              <x-button @click.native="$router.go(-1)" :gradients="['#f90','#f10']">返回目录</x-button>
            </div>
        </div>
        <msg v-if="fail" icon="waiting" title="打开失败" :description="message" :buttons="[
        {text:'重新加载',type:'primary',onClick:()=>{$vux.loading.show();getData()}},
        {text:'关闭',type:'default',onClick:()=>{$router.go(-1)}},
        ]"></msg>
    </div>
</template>
<script>
import {Msg, XButton} from 'vux'
export default{
  components: {
    Msg,
    XButton
  },
  data () {
    return {
      init: false,
      fail: false,
      message: '',
      title: '',
      content: ''
    }
  },
  mounted () {
    this.$vux.loading.show()
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('v1/souse-detail', {key: this.$route.query.key}).then(res => {
        this.$vux.loading.hide()
        if (res.code === 200) {
          this.init = true
          this.title = res.data.title
          this.content = res.data.content

          this.$wechat.config(res.data.wx_config)
          this.$wechat.ready(() => {
              // 自定义分享到朋友圈
            this.$wechat.onMenuShareTimeline({
              title: res.data.title,
              link: res.data.wx_config.url,
              imgUrl: res.data.img,
              success: () => {}
            })
            this.$wechat.onMenuShareAppMessage({
              title: res.data.title,
              desc: res.data.desc,
              link: res.data.wx_config.url,
              imgUrl: res.data.img
            })
          })
        } else {
          this.fail = true
          this.message = res.message
        }
      }, fail => {
        this.$vux.loading.hide()
        this.fail = true
        this.message = '请求失败'
      })
    }
  }
}
</script>
<style lang="less">
.couses-detail {
  position: relative;
 
  .article-detail {
     background: #ffffff;
    padding: 0.32rem;
    text-align: justify;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #000;
      letter-spacing: 0;
      line-height: 38.4px;
    }
    .content {
      position: relative;
      overflow: hidden;
      clear: both;
      font-family: SFProText-Regular;
      font-size: 17px;
      color: #585858;
      letter-spacing: 0;
      line-height: 1.9;
      p {
        margin: 0;
        text-align: justify;
        position: relative;
        padding: 8px 0;
      }
      img{
        width: 100%;
        max-width: 100%;
      }
    }
    .bottom-view{
      margin-top: 20px;
    }
  }
}
</style>
