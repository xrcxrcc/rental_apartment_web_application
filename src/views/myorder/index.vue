<template>
  <div class="stay">
    <van-nav-bar fixed title="Unpaid orders" left-arrow @click-left="$router.go(-1)"/>
    <div class="stay-item">
      <StayItem v-for="item in payList" :key="item.paylistId" :item="item"></StayItem>
    </div>
    <div v-if="payList.length === 0" class="none">You don't have unpaid order</div>
    <div class="space"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StayItem from '@/components/StayItem'
export default {
  name: 'MyOrderIndex',
  components: {
    StayItem
  },
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('user', ['userInfo']),
    ...mapState('payList', ['formDataList']),
    payList () {
      return this.formDataList.filter((formData) => {
        return formData.userId === this.userInfo.userId && formData.paid === false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.stay {
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
    margin: 20px 80px;
    color: #666;
  }
  .space {
    margin-bottom: 55px;
  }
}
</style>
