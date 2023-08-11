<template>
  <div class="like">
    <van-nav-bar fixed title="Liked list" />

    <div class="like-list">
      <LikeItem v-for="item in filteredAparts" :key="item.apart_id" :item="item"></LikeItem>
    </div>
    <div v-if="filteredAparts.length === 0" class="none">You don't have liked list</div>
    <div class="space"></div>
  </div>
</template>

<script>
import LikeItem from '@/components/LikeItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'LikeIndex',
  data () {
    return {
    }
  },
  components: {
    LikeItem
  },
  computed: {
    ...mapState('apartments', ['aparts']),
    ...mapState('user', ['userInfo']),
    filteredAparts () {
      return this.aparts.filter(item => this.userInfo.likeQuery.includes(item.apart_id.toString()))
    }
  }
}
</script>

<style lang="less" scoped>
.like {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }
  .none {
    margin: 20px 0 20px 100px;
    color: #666;
  }
  .space {
    margin-bottom: 55px;
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
