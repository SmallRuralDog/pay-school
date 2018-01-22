<template>
    <div class="courses-page" v-if="init">
        <div class="c-list" v-if="list.length>0">
            <div class="c-item vux-1px-b" v-for="(item,index) in list" :key="index" @click="$router.push({name: 'CoursesInfo', query: {id: item.id}})">
                <img class="cover" :src="item.h_cover" alt="">
                <div class="item-r">
                    <div>
                        <div class="title line-1">{{item.title}}</div>
                        <div class="desc line-2">{{item.abstract}}</div>
                    </div>
                    <div class="info">
                        <span>
                            <i class="iconfont icon-play"></i> {{item.page_count}}节课</span>
                            <span>{{item.view_count}}人参与</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-list" v-else>
            <i class="iconfont icon-1wodexuexizhongxin"></i>
            <div>
                <span>您还没购买课程噢，<span @click="$router.push({name: 'home'})">马上选课</span></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      init: false,
      list: []
    }
  },
  mounted () {
    this.$vux.loading.show()
    this.$http.get('v1/member-souse').then(
      res => {
        this.$vux.loading.hide()
        if (res.code === 200) {
          this.init = true
          this.list = res.data.list
        }
      },
      fail => {
        this.$vux.loading.hide()
      }
    )
  },
  methods: {}
}
</script>
<style lang="less">
@ph:100vh;
.courses-page {
  position: relative;
  background: #ffffff;
  .c-list {
    .vux-1px-b:after {
      border-color: #f1f1f1;
    }
    .c-item {
      display: flex;
      padding: 0.266667rem;
      .cover {
        width: 3.466667rem;
        height: 2.186667rem;
        flex-shrink: 0;
      }
      .item-r {
        margin-left: 0.266667rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 0.4rem;
        }
        .desc {
          font-size: 0.32rem;
          color: @minor-text;
        }
        .info {
          display: flex;
          align-items: center;
          color: @placeholder-text;
          justify-content: space-between;
          span:nth-child(1) {
            font-size: 12px;
            i {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
  .empty-list{
      height: @ph;
      
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i{
          font-size: 2.133333rem;
          color: #dcdcdc;
      }
      div{
         margin-bottom: 2.826667rem;
         span{
             font-size: 14px;
             color: #999999;
             span{
                 color: @Danger;
             }
         }
      }
  }
}
</style>
