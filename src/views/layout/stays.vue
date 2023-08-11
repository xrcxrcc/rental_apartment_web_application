<template>
  <div class="stay">
    <van-nav-bar fixed title="Your Stay" />
    <div class="stay-item">
      <StayItem v-for="item in payList" :key="item.paylistId" :item="item"></StayItem>
    </div>
    <div v-if="payList.length === 0" class="none">You don't have paid order</div>
    <div class="space"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StayItem from '@/components/StayItem'
export default {
  name: 'staysIndex',
  components: {
    StayItem
  },
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('user', ['userInfo']),
    ...mapState('payList', ['formDataList']),
    payList () {
      return this.formDataList.filter((formData) => {
        return formData.userId === this.userInfo.userId && formData.paid === true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.stay {
  background-color: #f5f5f5;
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
    background-color: #fff;
  }
  .space {
    margin-bottom: 55px;
  }
}
</style>
