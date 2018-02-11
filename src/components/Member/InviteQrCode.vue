<template>
    <div class="invite-qr-code" v-if="init">
        <div class="img-box">
            <img :src="list[index].qr_poster" />
        </div>
        <div class="b-view"></div>
        <div class="tip-view">
            <div class="tip">
                提示：长按大图保存</div>
        </div>
        <div class="img-list">
            <Scroller :lock-y="true">
                <div class="sc-list" :style="{'width':width+'rem'}">
                    <div class="list-item" v-for="(item,i) in list" :key="i" @click="index = i">
                        <img :src="item.path" alt="">
                    </div>
                </div>
            </Scroller>
        </div>
    </div>
</template>
<script>
import { Scroller } from 'vux'
export default {
  components: {
    Scroller
  },
  data () {
    return {
      init: false,
      list: [],
      index: 0,
      width: 0
    }
  },
  mounted () {
    console.log(this.width)
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('v1/qr-poster-list').then(res => {
        if (res.code === 200) {
          this.list = res.data.list
          this.width = this.list.length * 1.87 + 0.26
          this.init = true
        }
      }, fail => {

      })
    }
  }
}
</script>
<style lang="less">
.invite-qr-code {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .img-box {
    width: 100vw;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    img {
      width: 60%;
      padding: 0.266667rem;
      background: #ffffff;
      border-radius: 0.133333rem;
      box-shadow: 1px 1px 6px #dcdcdc;
    }
  }
  .b-view {
    height: 2.933333rem;
  }
  .img-list {
    height: 2.133333rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    .sc-list {
      display: flex;
    }
    .list-item {
      width: 1.6rem;
      height: 1.6rem;
      margin: 0.266667rem 0 0.266667rem 0.266667rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 3px;
      }
    }
  }
  .tip-view {
    position: fixed;
    bottom: 2.133333rem;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.266667rem 0;
    .tip {
      background: linear-gradient(90deg, rgb(255, 94, 58), rgb(255, 149, 0));
      padding: 0.133333rem 0.8rem;
      border-radius: 0.8rem;
      font-size: 0.373333rem;
      color: #ffffff;
    }
  }
}
</style>
