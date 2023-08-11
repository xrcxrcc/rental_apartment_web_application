<template>
  <div class="pay">
    <van-nav-bar fixed title="Confirm and Pay" left-arrow @click-left="$router.go(-1)" />

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="list">
        <div class="goods-item">
            <div class="left">
              <img :src="room.image[0]" alt="" />
            </div>
            <div class="right">
              <p class="tit text-ellipsis-1">
                 {{apart.apart_name}}
              </p>
              <p class="tit text-ellipsis-2">
                 {{room.studio_name}}
              </p>
              <p class="info">
                <span class="count">{{room.rent_time}} weeks</span>
                <span class="price">￡{{room.price_min}}</span>
              </p>
            </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span class="money">In total: ￡{{room.rent_time*room.price_min}}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>Your stay</span>
        </div>

        <div class="pay-cell">
          <span>Move in</span>
          <span class="red">{{room.move_in}}</span>
        </div>

        <div class="pay-cell">
          <span>Move out</span>
          <span class="red">{{room.move_out}}</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">Pay method</span>
        <div class="pay-cell">
          <span><van-icon name="balance-o" />Balance（￡ 999919.00）</span>
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea placeholder="Optional: Leave a message" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">Total to pay:<span>￡{{room.rent_time*room.price_min}}</span></div>
      <div @click="onPay" class="tipsbtn">Pay</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PayIndex',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('user', ['userInfo']),
    ...mapState('payList', ['formDataList']),
    apart () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      return this.aparts.find((apart) => apart.apart_id === apartId)
    },
    room () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      const apart = this.aparts.find((apart) => apart.apart_id === apartId)
      const roomId = this.$route.params.rmid
      return apart.studio.find((room) => room.studio_id === roomId)
    }
  },
  methods: {
    onPay () {
      const payId = +this.$route.params.payid
      const formDataToUpdate = this.formDataList.find((formData) => formData.paylistId === payId)
      if (formDataToUpdate) {
        formDataToUpdate.paid = true
      }
      console.log(formDataToUpdate.paylistId)
      this.paidFormData(formDataToUpdate)
      this.$router.push('/')
    },
    ...mapMutations('payList', ['paidFormData'])
  }
}
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.goods-item {
  height: 100px;
  margin-bottom: 0px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 150px;
    img {
      display: block;
      width: 130px;
      margin: 10px auto;
      border-radius: 5px;
    }
  }
  .right {
    flex: 1;
    margin-top: 7px;
    font-size: 14px;
    line-height: 1.0;
    padding: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .text-ellipsis-1 {
      font-size: 16px;
    }
    .text-ellipsis-2 {
      margin-top: 5px;
      font-size: 14px;
    }
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #376941;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 16px;
  border-bottom: 8px solid #f5f5f5;
  .money {
    color: #376941;
  }
}

.pay-cell {
  font-size: 16px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #376941;
    font-size: 14px;
  }
}
.pay-detail {
  padding: 10px;
  border-bottom: 8px solid #f5f5f5;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color:#376941;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg,#376941,#48543c);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
