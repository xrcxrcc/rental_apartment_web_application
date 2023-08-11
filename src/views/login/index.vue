<template>
  <div class="login">
    <van-nav-bar
      title="Login or Sign up"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
        <h3>Log in with Phone number</h3>
        <p>We'll call or text to confirm your number</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="Phone number" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="Input the code" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="Input the verify code" type="text">
          <button @click="getCode">{{ second === totalSecond ? 'Send code' : 'Resend after ' + second }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">Login</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      msgCode: ''
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    validFn () {
      if (!/^(\+44|0)(\d{9,10})$/.test(this.mobile)) {
        this.$toast('Please input the correct    phone number')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('Please input the correct    code')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('Verify code message sent successfully')
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('Please input the correct verify code')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('Login successfully')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #2c7744;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#2c7744,#445a3e);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
