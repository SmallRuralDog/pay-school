<template>
    <div class="list-item" @click="$router.push({name:'CoursesInfo',query:{id:item.id}})">
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
  props: {
    item: {}
  },
  filters: {
    ceil: function (value) {
      return lodash.ceil(value, 1)
    }
  }
}
</script>
<style lang="less">
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
      .iconfont {
        font-size: 12px;
      }
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
</style>
