<template>
  <div v-if="page_show">
    <view-box ref="viewBox" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="60">
      <swiper v-if="swiper_list.length>0" :list="swiper_list" height="4.8rem" :auto="true" />
      <div class="list">
        <div class="list-title">精选好课</div>
        <div class="list-body">
          <div class="list-item" v-for="(item,index) in rec_hot.data" :key="index" @click="$router.push({name:'CoursesInfo',query:{id:item.id}})">
            <div class="item-main">
              <img class="item-thumb" :src="item.h_cover" />
              <div class="item-title line-2">{{item.title}}</div>
              <div class="item-data-info">
                <div>
                  <rater :max="5" :value="item.grade|ceil" :font-size="12" active-color="#2bc17b" star='<i class="iconfont icon-pingfencaise item-rater"></i>' />
                  <span class="fs">{{item.grade}}</span>
                </div>
                <span class="yd" v-if="item.view_count">{{item.view_count}}人阅读</span>
              </div>
              <div class="item-price-info" v-if="item.price > 0">
                <div class="prices">
                  <span>￥{{item.price}}</span>
                  <del v-if="item.r_price>0 && item.r_price > item.price">￥{{item.r_price}}</del>
                </div>
                <div>
                  <badge v-if="item.vip_free==1" text="VIP免费"></badge>
                </div>
              </div>
              <div class="item-price-info" v-else>
                <span style="color:#19be6b">限时免费</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more-view">
         <load-more  :show-loading="loading" :tip="load_more_tip" @click.native="reLoad"></load-more>
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
    Badge
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
                load_more_tip: noMore ? '别拉了，到底了' : '加载中'
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
    font-size: 0.426667rem;
    color: @main-text;
  }
  .list-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .list-item:nth-child(2n + 1) {
      margin-right: 0.5%;
    }
    .list-item:nth-child(2n) {
      margin-left: 0.5%;
    }
    .list-item {
      background: #ffffff;
      width: 49.5%;
      margin-top: 0.1rem;
      padding-bottom: 0.266667rem;
      .item-main {
        .item-thumb {
          width: 100%;
          height: 3.12rem;
          background: #f9f9f9;
        }
        .item-title {
          color: @main-text;
          font-size: 0.373333rem;
          line-height: 0.586667rem;
          height: 1.173333rem;
          font-weight: 400;
          text-align: justify;
          padding: 0 0.133333rem;
        }
        .item-data-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.133333rem;
          .item-rater {
            font-size: 10px;
          }
          .fs,
          .yd {
            font-size: 0.293333rem;
            color: @minor-text;
          }
        }
        .item-price-info {
          padding: 0 0.133333rem;
          font-size: 0.373333rem;
          display: flex;
          justify-content: space-between;
          .prices {
            span {
              color: @Danger;
              font-weight: 500;
            }
            del {
              font-size: 0.32rem;
              color: @placeholder-text;
            }
          }
          .vux-badge {
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
