<template>
    <div class="my-order">
        <tab class="order-tab">
            <tab-item selected @on-item-click="onItemClick">课程订单</tab-item>
            <tab-item @on-item-click="onItemClick">会员订单</tab-item>
        </tab>
        <div class="list" v-if="init && index==0">
            <form-preview class="list-item" v-for="(item,index) in c_order" :key="index" header-label="订单金额" :header-value="'￥'+item.order_money" :body-items="[
            {label:'购买课程',value:item.doc.title},
            {label:'订单编号',value:item.order_sn},
            {label:'支付单号',value:item.pay_sn},
            {label:'下单时间',value:item.created_at},
            ]"></form-preview>
        </div>
        <div class="list" v-if="init && index==1">
            <form-preview class="list-item" v-for="(item,index) in v_order" :key="index" header-label="订单金额" :header-value="'￥'+item.order_money" :body-items="[
            {label:'购买套餐',value:item.title},
            {label:'订单编号',value:item.order_sn},
            {label:'支付单号',value:item.pay_sn},
            {label:'下单时间',value:item.created_at},
            ]"></form-preview>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, FormPreview } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    FormPreview
  },
  data () {
    return {
      init: false,
      c_order: [],
      v_order: [],
      index: 0
    }
  },
  mounted () {
    this.$vux.loading.show()
    this.$http.get('v1/member-order').then(
      res => {
        this.$vux.loading.hide()
        if (res.code === 200) {
          this.init = true
          this.c_order = res.data.c_order
          this.v_order = res.data.v_order
        }
      },
      fail => {
        this.$vux.loading.hide()
      }
    )
  },
  methods: {
    onItemClick (index) {
      this.index = index
    }
  }
}
</script>
<style lang="less">
.my-order {
  position: relative;
  .order-tab {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .list {
    margin-top: 50px;
    .list-item{
        margin-top: 5px;
    }
  }
}
</style>
