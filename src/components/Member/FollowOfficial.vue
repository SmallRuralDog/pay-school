<template>
    <div>
      
        <div class="follow-official">
            <div class="main">
                <div class="title">{{data.title}}</div>
                <img class="ewm" src="http://ss.gxtcwl.com/md/0IWgUrCw9kIyExWceLROtPcHazwkR0wOgOFPToEZ.jpeg"/>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  data () {
    return {
      init: false,
      data: {
        title: '长按二维码识别即可成为粉丝'
      }
    }
  },
  mounted () {
    this.$http.get('v1/member-follow').then(res => {
      this.$vux.loading.hide()
      this.init = true
      this.data = res.data
    }, fail => {
      this.$vux.loading.hide()
    })
  }
}
</script>
<style lang="less">
.follow-official {
  .main {
    width: 8rem;
    height: 10.666667rem;
    background: #ffffff;
    border-radius: 5px;
    .title{
        font-size: 16px;
        text-align: center;
        line-height: 35px;
        margin-top: 25px;
    }
    .ewm{
        width: 100%;
    }
  }
  
}
</style>
