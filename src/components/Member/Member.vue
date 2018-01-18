<template>
    <view-box class="member" v-if="init">
        <div class="top">
            <div class="member-top">
                <div class="member-info">
                    <img :src="user.avatar" />
                    <div class="l-d">
                        <dd>{{user.name}}</dd>
                        <i class="iconfont icon-VIP" :class="user.vip_info.is_vip?'is_vip':''"></i>
                    </div>
                </div>
                <div>
                    <x-button v-if="is_vip" :mini="true" :gradients="['#FF5E3A', '#FF9500']">推广二维码</x-button>
                    <x-button v-if="false" style="color:#999999" @click.native="$vux.toast.text('即将开放')" :mini="true" :gradients="['#f7f7f7', '#f7f7f7']">推广二维码</x-button>
                </div>
            </div>
            <scroller :lock-y="true">
                <div class="vip-top">
                    <div class="vip-info">
                        <div class="l-d">
                            <span>
                                <i class="iconfont icon-vip"></i>
                            </span>
                            <div>
                                <dd class="vip-title">黄金VIP会员</dd>
                                <dd class="vip-desc">享受免费特权</dd>
                            </div>
                        </div>
                        <div class="r-d">
                            <span v-if="user.vip_info.is_vip" class="vip-ok">
                                <i class="iconfont icon-ok"></i>已开通</span>
                            <x-button :link="{'name':'vip'}" v-else  :mini="true" :gradients="['#FF5E3A', '#FF9500']">立即开通</x-button>
                        </div>
                    </div>
                    <div class="vip-info">
                        <div class="l-d">
                            <span style="border-color:#00c13b">
                                <i style="color:#00c13b" class="iconfont icon-gongzhonghao"></i>
                            </span>
                            <div>
                                <dd class="vip-title" style="color:#00c13b">公众号粉丝</dd>
                                <dd class="vip-desc">享受试读特权</dd>
                            </div>
                        </div>
                        <div class="r-d">
                            <span v-if="user.is_fans" class="vip-ok">
                                <i class="iconfont icon-ok"></i>已关注</span>
                            <x-button :link="host+'/gz?back=member'" v-else :mini="true" :gradients="['#00A832', '#00D941']">立即关注</x-button>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="m-menu">
            <grid :cols="3">
                <grid-item @click.native="$router.push({name:item.route_name})" label="Grid" v-for="(item,index) in menus" :key="index" :class="index>menus.length/3-1?'last':''">
                    <span slot="icon" class="iconfont menu-icon" :class="item.icon" :style="{color:item.color}"></span>
                    <span slot="label" class="menu-name">{{item.name}}</span>
                </grid-item>
            </grid>
        </div>

    </view-box>
</template>
<script>
import { ViewBox, XButton, Scroller, Grid, GridItem } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'member',
  components: {
    ViewBox,
    XButton,
    Scroller,
    Grid,
    GridItem
  },
  computed: {
    ...mapState({
      init: state => state.member.init,
      user: state => state.member.user
    })
  },
  mounted () {
    if (!this.init) {
      this.$vux.loading.show()
      this.$http.get('v1/member-index').then(res => {
        this.$vux.loading.hide()
        if (res.code === 200) {
          this.$store.dispatch('member/setState', {init: true, user: res.data.user})
        }
      }, fail => {
        this.$vux.loading.hide()
      })
    }
  },
  data () {
    return {
      is_vip: false,
      host: this.HOST,
      menus: [
        {
          name: '我的课程',
          icon: 'icon-1wodexuexizhongxin',
          color: '#f60',
          route_name: 'MyCourses'
        },
        {
          name: '我的订单',
          icon: 'icon-my-course',
          color: '#f60',
          route_name: 'MyOrder'
        },
        {
          name: '我的消息',
          icon: 'icon-xiaoxi',
          color: '#f60',
          route_name: 'MyMsg'
        }
      ]
    }
  }
}
</script>
<style lang="less">
.member {
  .top {
    padding: 0.4rem 0.266667rem;
    background: #ffffff;
    .member-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .member-info {
        display: flex;
        align-items: center;
        img {
          width: 1.466667rem;
          height: 1.466667rem;
          border-radius: 50%;
        }
        .is_vip{
          color: #E6A23C;
        }
        .l-d {
          margin-left: 0.266667rem;
          color: @minor-text;
          dd {
            color: @main-text;
            font-size: 0.4rem;
          }
        }
      }
    }
    .vip-top {
      margin-top: 0.4rem;
      display: flex;
      width: 14.666667rem;
      justify-content: space-between;
      .vip-info {
        width: 6.666667rem;
        border-radius: 40px;
        margin-right: 0.266667rem;
        border: 1px solid #f7f7f7;
        padding: 0.213333rem;
        height: 1.066667rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .l-d {
          display: flex;
          align-items: center;
          span {
            width: 1.066667rem;
            height: 1.066667rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: @Warning;
            border: 1px solid @Warning;
            i {
              font-size: 25px;
            }
          }
          div {
            margin-left: 0.266667rem;
            margin-right: 0.4rem;
            .vip-title {
              color: @Warning;
              font-size: 0.373333rem;
              font-weight: 500;
            }
            .vip-desc {
              color: @minor-text;
              font-size: 0.3rem;
            }
          }
        }
        .r-d {
          margin-right: 0.266667rem;
          .vip-ok {
            font-size: 0.373333rem;
            color: @minor-text;
            display: flex;
            align-items: center;
            i {
              font-size: 0.373333rem;
              margin-right: 0.133333rem;
            }
          }
        }
      }
    }
  }
  .m-menu {
    background: #ffffff;
    margin-top: 0.133333rem;
    .menu-icon {
      font-size: 28px;
      line-height: 28px;
    }
    .menu-name{
        font-size: .346667rem;
        font-weight: 500;
        color: @main-text;
    }
    .weui-grids:before,
    .weui-grids:after,
    .weui-grid:before {
      border-top: 0;
      border-right: 0;
    }
    .weui-grid:after {
      border-bottom-color: #e6e6e6;
    }
    .weui-grids {
      .last:after {
        border-bottom: 0;
      }
    }
  }
}
</style>
