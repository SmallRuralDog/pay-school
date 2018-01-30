<template>
  <div class="courses-info" v-if="page_show">

    <div class="info-main">
      <div class="header" :style="{'background-image': 'url('+info.b_h_cover+')'}">
        <div class="header-bg" v-if="false">
          <h1 class="header-title">{{info.title}}</h1>
          <h2 class="header-title">{{info.abstract}}</h2>
        </div>
      </div>
      <div class="info">
        <div class="titles vux-1px-b">
          <div class="info-title">{{info.title}}</div>
          <div class="info-desc">{{info.abstract}}</div>
        </div>
        <div class="info-prices">
          <span class="info-price" v-if="info.price>0">{{info.price}} <del>￥{{info.r_price}}</del></span>
          <span v-else class="info-price" style="color:#19be6b">免费课程</span>
        </div>
        <div class="info-datas">
          <div class="data-l">
            <div class="info-tag">
              <badge v-if="!info.vip_free" class="tag" text="推荐" />
              <badge v-if="info.vip_free" class="tag" text="会员免费" />
              <badge v-if="info.must_follow" class="tag fans-read" text="粉丝试读" />
            </div>
          </div>
          <div class="data-r">
            <rater :max="5" :value="info.grade|ceil" :font-size="12" active-color="#2bc17b" star='<i class="iconfont icon-pingfencaise item-rater"></i>' />
            <span class="fs">{{info.grade}}</span>
            <span class="yd">{{info.view_count}}人阅读</span>
          </div>
        </div>
      </div>
      <sticky>
        <tab custom-bar-width="30px" active-color="#2bc17b">
          <tab-item selected @on-item-click="onItemClick">详情</tab-item>
          <tab-item @on-item-click="onItemClick">目录</tab-item>
        </tab>
      </sticky>
      <div ref="detail" class="course-detail" v-if="tab_index==0">
        <div ref="content" class="content" v-html="info.detail" :style="{height: show_all?'auto':'160px'}"></div>
        <div class="show-full-content" v-if="!show_all" @click="show_all=true">
          <span class="iconfont icon-more"></span>
          <span class="percent">查看全部内容</span>
          <div class="text-overlay"></div>
        </div>
      </div>
      <div ref="list" class="course-list">
        <h1 class="content-title">课程目录</h1>
        <div class="course-list-view">
          <div class="list-item vux-1px-b" v-for="(item,index) in info.courses_list" :key="index" @click="go_detail(item)">
            <div class="item-l">
              <img class="icon" src="../../assets/player_b4b5e00.png" />
              <div>
                <div class="itme-titles">
                  <div class="title line-1"> {{item.title}}</div>
                </div>
                <div class="item-datas">
                  <span class="view_count">{{item.view_count}}人浏览</span>
                  <div class="info-tag">
                    <badge v-if="item.is_free" class="tag tag-free" text="免费" />
                    <badge v-if="!item.is_free && info.vip_free" class="tag vip-free" text="VIP免费" />
                    <badge v-if="item.is_follow" class="tag fans-read" text="试读" />
                  </div>
                </div>
              </div>
            </div>
            <div class="item-r">
              <i v-if="item.read_info.state" class="iconfont icon-shejiwenzhang"></i>
              <i v-else class="iconfont icon-iconset0114"></i>
            </div>
          </div>
        </div>
      </div>
      <load-more :show-loading="false" tip="别拉了，到底啦"></load-more>
    </div>
    <div class="bottom-bar ">
      <div class="bar-btn" @click="$router.push({name:'home'})">
        <i class="iconfont icon-home"></i>
        <p>首页</p>
      </div>
      <div class="bar-btn" @click="$router.push({name:'member'})">
        <i class="iconfont icon-my"></i>
        <p>我的</p>
      </div>
      <div class="b-r">
        <template v-if="pre.is_free">
          <x-button @click.native="start_study()" :gradients="['#3CB371','#19be6b']">免费学习</x-button>
        </template>
        <template v-else-if="info.vip_free && user.vip_info.is_vip">
          <x-button @click.native="start_study()" :gradients="['#3CB370','#19be6f']">立即学习
            <badge class="buy-ok-tag" text="您已开通VIP"></badge>
          </x-button>
        </template>
        <template v-else>
          <x-button v-if="info.vip_free && !pre.is_buy" :gradients="['#3CB371','#19be6b']" @click.native="$router.push({name:'vip',query: {item_id: info.id, back: 'CoursesInfo'}})">开通会员</x-button>
          <x-button v-if="!pre.is_buy" :gradients="['#ed3f14','#ff9900']" @click.native="buy">立即购买</x-button>
          <x-button @click.native="start_study()" v-if="pre.is_buy" :gradients="['#3CB370','#19be6f']">立即学习
            <badge class="buy-ok-tag" text="已购买"></badge>
          </x-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Badge, Rater, XButton, LoadMore, Sticky, Tab, TabItem } from 'vux'
var lodash = require('lodash')
export default {
  name: 'CoursesInfo',
  components: {
    Badge,
    Rater,
    XButton,
    LoadMore,
    Sticky,
    Tab,
    TabItem
  },
  data () {
    return {
      page_show: false,
      show_all: true,
      content_h: 0,
      info: {},
      pre: {},
      user: {},
      wx_config: {},
      tab_index: 0
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.$vux.loading.show()
    this.getData()
  },
  activated () {
    if (this.page_show) {
      this.set_share()
    }
  },
  methods: {
    getData () {
      this.$http.get('v1/souse-info?id=' + this.id).then(
        res => {
          this.$vux.loading.hide()
          if (res.code === 200) {
            this.page_show = true
            this.info = res.data.info
            this.pre = res.data.pre
            this.user = res.data.user
            this.wx_config = res.data.wx_config
            this.$wechat.config(res.data.wx_config)

            this.$wechat.ready(() => {
              this.set_share()
            })
            this.$nextTick(() => {
              this.content_h = this.$refs.content.offsetHeight
              if (this.content_h > 180) {
                this.show_all = false
              }
            })
          } else {
            this.$vux.toast.text(res.message)
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
        title: this.info.title,
        link: this.wx_config.url,
        imgUrl: this.info.cover,
        success: () => {}
      })
      this.$wechat.onMenuShareAppMessage({
        title: this.info.title,
        desc: this.info.abstract,
        link: this.wx_config.url,
        imgUrl: this.info.cover
      })
    },
    start_study () {
      let item = this.info.courses_list[0]
      this.go_detail(item)
      // this.$router.push({'name': 'CoursesDetail', query: {key: item.key}})
    },
    buy () {
      this.$vux.loading.show()
      this.$http.post('v1/buy-courses', { id: this.id }).then(
        res => {
          this.$vux.loading.hide()
          if (res.code === 200) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', res.data, re => {
              if (re.err_msg === 'get_brand_wcpay_request:ok') {
                this.getData()
              } else {
                this.$vux.toast.text('购买失败')
              }
            })
          } else {
            this.$vux.toast.text(res.message)
          }
        },
        fail => {
          this.$vux.loading.hide()
        }
      )
    },
    go_detail (item) {
      if (item.read_info.state) {
        this.$router.push({ name: 'CoursesDetail', query: { key: item.key } })
      } else {
        if (item.read_info.code == 'buy') {
          this.$vux.confirm.show({
            content: item.read_info.message,
            theme: 'android',
            cancelText: '再想一想',
            confirmText: '立即购买',
            onConfirm: () => {
              this.buy()
            }
          })
        } else {
          this.$vux.confirm.show({
            content: item.read_info.message,
            theme: 'android',
            cancelText: '我才不要呢',
            confirmText: '立即关注',
            onConfirm: () => {
              window.location.href =
                HOST + '/gz?back=member?back=CoursesInfo&id=' + this.info.id
              // this.$router.push({'name': 'FollowOfficial', query: {item_id: this.info.id, back: 'CoursesInfo'}})
            }
          })
        }
      }
    },
    onItemClick (index) {
      if (this.tab_index == index) return
      console.log(index)
      this.tab_index = index
    }
  },
  filters: {
    ceil: function (value) {
      return lodash.ceil(value, 1)
    }
  }
}
</script>
<style lang="less">
.courses-info {
  position: relative;
  .info-main {
    margin-bottom: 1.733333rem;
  }
  .vux-1px-b:after {
    border-bottom-color: #f1f1f1;
  }
  .header {
    position: relative;
    height: 5.626667rem;
    width: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    .header-bg {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 2.866666rem;
      background-image: url("../../assets/cover_754d8e3.png");
      background-repeat: repeat;
      background: -webkit-linear-gradient(
        bottom,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0)
      );
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
      background-clip: content-box;
      .header-title {
        color: #fff;
        text-align: left;
        font-weight: 500;
      }
      h1 {
        font-size: 0.48rem;
        line-height: 0.586667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: absolute;
        bottom: 0.946666rem;
        left: 0.4rem;
        right: 0.4rem;
      }
      h2 {
        position: absolute;
        left: 0.4rem;
        right: 0.4rem;
        bottom: 0.28rem;
        font-size: 0.346667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .info {
    background: #fff;
    margin-bottom: 0.266667rem;
    padding: 0.266667rem;
    .titles {
      padding-bottom: 10px;

      .info-title {
        font-size: 0.48rem;
        color: #333;
        letter-spacing: 1px;
        line-height: 0.693333rem;
        display: inline-block;
        position: relative;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 1.386667rem;
        width: 100%;
        font-weight: 700;
        margin-bottom: 10px;
        text-align: justify;
      }
      .info-desc {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-break: break-all;
        max-height: 70px;
        font-size: 12px;
        color: #666;
        letter-spacing: 1px;
        line-height: 18px;
        text-align: justify;
      }
    }
    .info-tag {
      .tag {
        border-radius: 0;
      }
      .fans-read {
        background: #00c13b;
      }
    }
    .info-prices {
      margin: 0.213333rem 0;
      del{
        font-size: .32rem;
        color: #999999;
        font-weight: 400;
      }
      .info-price::before {
        content: "￥";
        font-size: 0.346667rem;
      }
      .info-price {
        font-size: 0.8rem;
        font-weight: 500;
        color: #e54743;
      }
    }
    .info-datas {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .data-r {
        .item-rater {
          font-size: 10px;
        }
        .fs,
        .yd {
          font-size: 0.293333rem;
          color: @minor-text;
        }
      }
    }
  }
  .course-detail {
    background-color: #fff;
    margin-bottom: 0.266667rem;
    .content {
      overflow: hidden;
      padding: 0.35rem 0.3rem;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 0.48rem;
        line-height: 1;
        color: @main-text;
        margin-top: 0.266667rem;
      }
      p,
      div {
        font-size: 0.373333rem;
        line-height: 1.8;
        margin-top: 0.213333rem;
        color: @convention-text;
        text-align: justify;
      }
    }
    .show-full-content {
      text-align: center;
      font-size: 14px;
      padding: 10px 0;
      color: #585858;
      position: relative;
      .text-overlay {
        width: 100%;
        height: 64px;
        background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(255, 255, 255, 0)),
          to(#fff)
        );
        background: -webkit-linear-gradient(
          top,
          rgba(255, 255, 255, 0) 0,
          #fff 100%
        );
        background: linear-gradient(
          -180deg,
          rgba(255, 255, 255, 0) 0,
          #fff 100%
        );
        position: absolute;
        top: -64px;
      }
    }
  }
  .course-list {
    background: #fff;
    padding-top: 0.266667rem;
    .content-title {
      font-size: 0.48rem;
      padding: 0.266667rem;
    }
    .course-list-view {
      .list-item {
        padding: 0.266667rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-l {
          display: flex;
          align-items: center;
          margin-right: 0.266667rem;
          .icon {
            margin-right: 10px;
            width: 0.96rem;
            height: 0.96rem;
            color: #00c13a;
          }
          .itme-titles {
            font-size: 0.373333rem;
            color: @main-text;
            display: flex;

            .iconfont {
              color: @Danger;
            }
            .title {
              font-size: 15px;
              color: @main-text;
            }
          }
          .item-datas {
            display: flex;
            align-items: baseline;
            .view_count {
              color: #999999;
              margin-right: 10px;
              font-size: 10px;
            }
          }
          .info-tag {
            .tag {
              border-radius: 3px;
              font-size: 8px;
              height: 11px;
              line-height: 11px;
            }
            .tag-free {
              background: #ff931b;
            }
            .fans-read {
              background: #19b683;
            }
          }
        }
        .item-r {
          .iconfont {
            font-size: 18px;
            color: #999999;
          }
        }
      }
    }
  }
  .bottom-bar {
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    display: flex;
    .bar-btn {
      width: 60px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      i {
        font-size: 20px;
      }
      p {
        font-size: 10px;
      }
    }
    .b-r {
      flex-grow: 1;
      display: flex;
      align-items: center;
      padding: 0 0.266667rem;
      button {
        border-radius: 0;
        margin-top: 0;
        margin-left: 2px;
      }
      .buy-ok-tag {
        position: absolute;
        left: 0;
        font-size: 10px;
        border-radius: 0;
      }
    }
  }
}
</style>
