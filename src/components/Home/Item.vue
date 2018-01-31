<template>
    <div class="home-item" @click="$router.push({name:'CoursesInfo',query:{id:item.id}})">
        <div class="left">
            <img class="cover" :src="item.h_cover" alt="">
            <badge v-if="item.vip_free==1" text="VIP免费"></badge>
        </div>
        <div class="right">
            <div>
                <div class="title line-1">{{item.title}}</div>
                <div class="abstract line-2">{{item.abstract}}</div>
            </div>
            <div class="r-d">
                <div class="prices">
                    <template v-if="item.price > 0">
                        <span class="price">{{item.price}}</span>

                        <del v-if="false && item.r_price>0 && item.r_price > item.price">￥{{item.r_price}}</del>
                    </template>
                    <template v-else>
                        <span class="free">限时免费</span>
                    </template>
                </div>
                <div class="pf">
                    <span class="yd" v-if="item.view_count">{{item.view_count}}人在学</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Rater, Badge } from 'vux'
var lodash = require('lodash')
export default {
  components: {
    Rater,
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
.home-item {
  display: flex;
  flex-direction: row;
  margin: 0.106667rem 0.213333rem;
  background: #ffffff;
  padding: 0.213333rem;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  .left {
    order: 2;
    line-height: 1;
    position: relative;
    width: 3.333333rem;
    height: 2.4rem;
    .cover {
      width: 3.333333rem;
      height: 2.4rem;
      background: #f9f9f9;
      border-radius: 0.08rem;
      line-height: 0;
    }
    .vux-badge {
      border-radius: 0 0 0.08rem 0;
      position: absolute;
      bottom: 0;
      right: 0;
      background: #19be6b;
    }
  }
  .right {
      order: 1;
    margin-right: 0.213333rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 0.426667rem;
      height: 0.426667rem;
      font-weight: bold;
      color: #2e2e2e;
      line-height: 1;
    }
    .abstract {
      font-size: 12px;
      color: #999999;
      margin-top: 0.106667rem;
    }
    .r-d {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-between;
      .prices {
        span {
          color: @Danger;
          font-weight: 500;
          font-size: 0.48rem;
          height: 0.48rem;
          line-height: 1;
        }
        del {
          font-size: 0.32rem;
          color: @placeholder-text;
        }
        .price::before {
          content: "￥";
          font-size: 10px;
        }
        .free {
          color: #19be6b;
          font-size: 0.426667rem;
        }
      }
      .pf {
        display: flex;
        align-items: baseline;
        color: #999999;
        .yd {
          font-size: 12px;
        }
        .item-rater {
          font-size: 10px;
        }
        .fs {
          font-size: 10px;
          color: #999999;
        }
      }
    }
  }
}
</style>
