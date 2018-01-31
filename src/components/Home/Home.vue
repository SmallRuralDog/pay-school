<template>
  <div v-if="page_show">
    <view-box ref="viewBox" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="60">
      <swiper v-if="swiper_list.length>0" :list="swiper_list" height="4.8rem" :auto="true" />
      <div class="list">
        <h3 class="types-title">
          <span class="tit-icon icon-new-l tit-icon-l"></span>
          <em>新</em>／
          <em>上</em>／
          <em>好</em>／
          <em>课</em>
          <span class="tit-icon icon-new-r tit-icon-r"></span>
        </h3>
        <div class="list-body">
          <template v-for="(item,index) in rec_hot.data">
            <item :item="item" :key="index" />
          </template>

        </div>
      </div>
      <div class="load-more-view">
        <load-more :show-loading="loading" :tip="load_more_tip" @click.native="reLoad"></load-more>
      </div>
    </view-box>
  </div>
</template>
<script>
import {
  Swiper,
  Rater,
  ViewBox,
  LoadMore,
  InlineLoading,
  Flexbox,
  Badge
} from 'vux'
import { mapState, mapActions } from 'vuex'
import Item from './Item'
import Vue from 'vue'
import InfiniteScroll from '../../packages/infinite-scroll'
Vue.use(InfiniteScroll)
var lodash = require('lodash')
export default {
  components: {
    Flexbox,
    Swiper,
    Rater,
    ViewBox,
    LoadMore,
    InlineLoading,
    Badge,
    Item
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      page_show: state => state.home.page_show,
      init: state => state.home.init,
      swiper_list: state => state.home.swiper_list,
      rec_hot: state => state.home.rec_hot,
      share: state => state.home.share,
      loading: state => state.home.loading,
      page: state => state.home.page,
      no_more: state => state.home.no_more,
      load_err: state => state.home.load_err,
      load_more_tip: state => state.home.load_more_tip
    })
  },
  mounted () {
    if (!this.init) {
      this.$vux.loading.show()
      this.getData()
    } else {
      this.$nextTick(() => {
        const h = this.$sess.get('home')
        if (h && h.scrollTop >= 0) {
          window.scroll(0, h.scrollTop)
        }
      })
    }
  },
  activated () {
    this.set_share()
  },
  methods: {
    loadMore () {
      if (this.loading || this.no_more) return
      this.setState({
        loading: true,
        page: this.page + 1,
        load_more_tip: '加载中'
      })
      this.getData()
    },
    reLoad () {
      if (this.loading || this.no_more) return
      this.setState({
        loading: true,
        page: this.page,
        load_more_tip: '加载中'
      })
      this.getData()
    },
    getData () {
      this.$http.get('v1/index?page=' + this.page).then(
        res => {
          this.$vux.loading.hide()
          if (res.code === 200) {
            if (this.page == 1) {
              this.setState({
                page_show: true,
                init: true,
                swiper_list: res.data.swiper_list,
                rec_hot: res.data.rec_hot,
                share: res.data.share
              })
              this.$wechat.config(res.data.wx_config)
              this.$wechat.ready(() => {
                this.set_share()
              })
            } else {
              let newData = res.data.rec_hot
              let oldData = []
              this.rec_hot.data.map(item => {
                oldData.push(item)
              })
              newData.data.map(item => {
                oldData.push(item)
              })
              newData.data = oldData
              let noMore = false
              if (this.page >= newData.last_page) {
                noMore = true
              }

              this.setState({
                loading: false,
                rec_hot: newData,
                no_more: noMore,
                load_more_tip: noMore
                  ? '看了那么多，就没一个喜欢的么'
                  : '加载中'
              })
            }
          } else {
            this.setState({
              loading: false,
              load_err: true,
              load_more_tip: '加载失败，点击重试'
            })
          }
        },
        fail => {
          this.$vux.loading.hide()
        }
      )
    },
    set_share () {
      // 自定义分享到朋友圈
      this.$wechat.onMenuShareTimeline({
        title: this.share.title,
        link: this.share.url,
        imgUrl: this.share.icon,
        success: () => {}
      })
      this.$wechat.onMenuShareAppMessage({
        title: this.share.title,
        desc: this.share.desc,
        link: this.share.url,
        imgUrl: this.share.icon
      })
    },
    ...mapActions('home', ['setState'])
  },
  filters: {
    ceil: function (value) {
      return lodash.ceil(value, 1)
    }
  }
}
</script>
<style lang="less">
.list {
  background: @page-bg;
  margin-bottom: 0.4rem;
  .list-title {
    padding: 0.4rem 0.266667rem 0.266667rem 0.266667rem;
    font-weight: 500;
    font-size: 0.48rem;
    color: @main-text;
  }
  .list-body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .types-title {
    position: relative;
    font-size: 14px;
    color: #93999f;
    letter-spacing: 0.6px;
    line-height: 36px;
    text-align: center;
    margin: .4rem 0 .266667rem 0;
    em {
      font-size: 20px;
      font-weight: 600;
      color: #4d555d;
      margin: 0 3px;
      font-style: normal;
    }
    .tit-icon {
      display: inline-block;
      vertical-align: bottom;
      width: 56px;
      height: 36px;
      background: url("../../../static/icon.png") no-repeat;
      background-size: 100%;
    }
    .icon-new-l {
      background-position: center -360px;
      margin-right: .533333rem;
    }
    .icon-new-r {
      background-position: center -396px;
      margin-left: .533333rem;

    }
  }
}
</style>
