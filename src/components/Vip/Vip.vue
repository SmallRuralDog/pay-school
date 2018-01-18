<template>
  <div class="vip-index-page" v-if="page_show">
    <div class="header">
      <img class="avatar" :src="user.avatar" alt="">
      <div>
        <dd class="name">{{user.name}}<i v-if="user.vip_info.is_vip" class="iconfont icon-VIP"></i></dd>
        <dd class="desc">
          <template v-if="user.vip_info.is_vip">
            <span v-if="user.vip_info.is_per">已开通永久会员</span>
            <template v-else>
              <span v-if="user.vip_info.is_yar">已开通年会员</span>
              <span>{{user.vip_info.exp_data}}到期</span>
            </template>

          </template>
          <template v-else>
            <span v-if="user.vip_info.vip_log">您的会员已到期</span>
            <span v-else>您还未开通会员</span>
          </template>

        </dd>
      </div>
    </div>
    <div class="combo">
      <div class="combo-title">会员套餐</div>
      <div class="combo-list">
        <div @click="item_click(item)" :class="item.key==ck_item.key?'item-ck':''" class="combo-item" v-for="(item,index) in combo" :key="index">
          <div class="info">
            <div class="titles">
              <span>{{item.title}}</span>
              <span class="label" v-if="item.data.label">
                <i class="iconfont icon-appreciate_light"></i>{{item.data.label}}</span>
            </div>
            <div class="datas">
              <span>
                <i class="iconfont" :class="item.data.icon"></i>{{item.data.desc}}</span>
            </div>
          </div>
          <div class="price">{{item.price}}</div>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="price-info">
        <span>总价</span>
        <span class="price-count">￥{{ck_item.price}}</span>
      </div>
      <x-button class="btn" :gradients="['#ed3f14','#ff9900']" @click.native="buy">确认支付</x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  },
  data () {
    return {
      page_show: false,
      combo: [],
      user: {},
      ck_item: {}
    }
  },
  mounted () {
    this.$vux.loading.show()
    this.getData()
  },
  methods: {
    buy () {
      this.$vux.loading.show()
      this.$http.post('v1/buy-vip', { key: this.ck_item.key }).then(
        res => {
          this.$vux.loading.hide()
          if (res.code === 200) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', res.data, re => {
              if (re.err_msg === 'get_brand_wcpay_request:ok') {
                this.getData()
                this.ok_back()
              } else {
                this.$vux.toast.text('支付失败')
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
    getData () {
      this.$http.get('v1/vip-index').then(
        res => {
          this.$vux.loading.hide()
          if (res.code === 200) {
            this.page_show = true
            this.combo = res.data.combo
            this.user = res.data.user
            let def = res.data.combo.filter(item => {
              return item.key === res.data.key
            })
            this.ck_item = def[0]

            this.$store.dispatch('member/setState', {init: true, user: res.data.user})
          }
        },
        fail => {
          this.$vux.loading.hide()
        }
      )
    },
    item_click (item) {
      this.ck_item = item
    },
    ok_back () {
      let id = this.$route.query.item_id
      let back = this.$route.query.back
      if (id && back) {
        this.$router.push({name: back, query: {id: id}})
      }
    }
  }
}
</script>
<style lang="less">
.vip-index-page {
  position: relative;
  .header {
    padding: 0.32rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: 0.32rem;
    }
    .name {
      font-size: 14px;
      color: #c4a669;
      i{
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .desc {
      color: #b5b5b5;
    }
  }
  .combo {
    background: #ffffff;
    margin-top: 0.213333rem;
    padding: 0.213333rem 0.32rem;
    .combo-title {
      font-size: 0.426667rem;
    }
    .combo-list {
      margin-top: 0.266667rem;
      .combo-item {
        padding: 0.16rem 0.4rem;
        border: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        margin-bottom: 0.213333rem;
        .info {
          .titles {
            font-size: 0.4rem;
            display: flex;
            align-items: center;
            .label {
              font-size: 0.32rem;
              padding: 0 0.213333rem;
              border-radius: 0.24rem;
              height: 0.48rem;
              display: flex;
              align-items: center;
              margin-left: 0.213333rem;
              background: linear-gradient(90deg, #ff951d, #ff6801);
              color: #ffffff;
              i {
                font-size: 14px;
                margin-right: 3px;
              }
            }
          }
          .datas {
            font-size: 0.32rem;
            color: #a3a2a3;
            i {
              margin-left: 3px;
              font-size: 0.32rem;
              color: #f60;
            }
          }
        }
        .price {
          font-size: 0.666667rem;
          color: #f60;
        }
        .price:before {
          content: "￥";
          font-size: 0.346667rem;
        }
      }
      .item-ck {
        border-color: #f60;
        background: #ffe9cc;
      }
    }
  }
  .bottombar {
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    .price-info {
      flex-grow: 1;
      padding-left: 0.32rem;
      font-size: 16px;
      .price-count {
        color: #f60;
      }
    }
    .btn {
      width: 4.8rem;
      border-radius: 0;
      height: 1.2rem;
    }
  }
}
</style>
