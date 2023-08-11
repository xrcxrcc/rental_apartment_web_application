<template>
  <div class="user">

    <div class="head-page">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">{{userInfo.userId}}</div>
        <div class="words">Email verified</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>0</span>
          <span>Balance</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>Credit</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>Voucher</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay" />
          <span>My wallet</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push('/stays')">
        <van-icon name="balance-list-o" />
        <span>Paid order</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder')">
        <van-icon name="clock-o" />
        <span>Unpaid order</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/like')">
        <van-icon name="like-o" />
        <span>Liked</span>
      </div>
      <div class="order-navbar-item">
        <van-icon name="send-gift-o" />
        <span>Comment</span>
      </div>
    </div>

    <div class="service">
      <div class="title">My service</div>
      <div class="content">
        <div class="content-item">
          <van-icon name="records" />
          <span>Address</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o" />
          <span>Gift</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o" />
          <span>Voucher</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o" />
          <span>Help</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o" />
          <span>My credit</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o" />
          <span>Service</span>
        </div>
      </div>
    </div>

    <div class="logout-btn">
     <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ProfileIndex',
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['userLogout']),
    logout () {
      this.$dialog.confirm({
        message: 'Are you sure to Log out',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#376941'
      })
        .then(() => {
          this.userLogout()
          this.$router.push('/')
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  height: 130px;
  background: url('@/assets/Forest.jpg');
  background-size: cover;
  display: flex;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .words {
    color: #fff;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #376941;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #376941;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
