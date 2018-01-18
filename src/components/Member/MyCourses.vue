<template>
    <div class="MyCourses" v-if="init">
        <panel header="我购买的课程" :list="list" type="5" @on-click-item="item_click"></panel>
    </div>
</template>
<script>
import { Panel } from 'vux'
export default {
  components: {
    Panel
  },
  data () {
    return {
      init: false,
      list: []
    }
  },
  mounted () {
    this.$vux.loading.show()
    this.$http.get('v1/member-souse').then(res => {
      this.$vux.loading.hide()
      if (res.code === 200) {
        this.init = true
        let arr = []
        res.data.list.map(item => {
          arr.push({
            id: item.id,
            title: item.title,
            desc: item.abstract,
            src: item.cover
          })
        })
        this.list = arr
      }
    }, fail => {
      this.$vux.loading.hide()
    })
  },
  methods: {
    item_click (item) {
      console.log(item)
      this.$router.push({name: 'CoursesInfo', query: {id: item.id}})
    }
  }
}
</script>
<style lang="less">
.MyCourses {
  position: relative;
}
</style>
