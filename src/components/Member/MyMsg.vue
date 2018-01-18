<template>
    <div class="MyMsg">
        <msg icon="info" title="暂无消息" :buttons="[
        {text:'返回',type:'primary',onClick:()=>{$router.go(-1)}},
        ]"></msg>
    </div>
</template>
<script>
import {Msg} from 'vux'
export default{
  components: {
    Msg
  }
}
</script>
<style lang="less">
.MyMsg{
    position: relative;
}
</style>
