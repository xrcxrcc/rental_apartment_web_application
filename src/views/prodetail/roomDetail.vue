<template>
  <div class="prodetail">
    <van-nav-bar fixed :title="room.studio_name" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="image in room.image" :key="image">
        <img :src="image" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ room.image.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">{{room.studio_name}}</span>
        </div>
      </div>
      <div class="msg text-ellipsis-2">
        ￡{{room.price_min}} <span class="msg1">Pre/Week</span><span class="msg2">{{room.count}} room(s) left</span>
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />Free cancle in 7 days</span>
          <span><van-icon name="passed" />Transfer allowed</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="address">{{apart.apart_add}}</div>
    </div>
    <div class="info-bottom"></div>
    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">Real tenants review <p>5 reviews</p></div>
        <div class="right">{{apart.apart_rate}}<span> points</span>
          <p><van-rate :size="16" :value="apart.apart_rate" color="#376941" allow-half void-icon="star" void-color="#eee"/></p>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in filteredCmt" :key="item.com_id">
          <div class="top">
            <img src="http://cba.itlike.com/public/uploads/10001/20230321/a0db9adb2e666a65bc8dd133fbed7834.png" alt="">
            <div class="name">{{item.user}}</div>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          <div class="time">
            2023-03-21 15:01:35
          </div>
        </div>
      </div>
    </div>
    <div class="info-bottom"></div>
    <!-- 房型选择 -->
    <div class="room">
      <div class="rm-banner">Room Info</div>
      <div class="studio">
        <div class="sd-banner"><van-icon name="info-o" />
          <div class="sd-info">"Studio" refers to the suite, usually independent bathroom + independent kitchen, which is similar to the domestic Bay. There is no separate door between the bedroom and the kitchen.</div>
        </div>
        <div class="sd-content">
          <div class="sd-des">Room Type Overview</div>
          <div class="sd-icon-container">
            <div class="sd-icon">
              <van-icon name="wap-home-o" />
              <p>Package rental</p>
            </div>
            <div class="sd-icon">
              <van-icon name="expand-o" />
              <p>{{room.room_size}}m</p>
            </div>
            <div class="sd-icon">
              <van-icon name="friends-o" />
              <p>Dual oppcupancy</p>
            </div>
          </div>
          <div class="sd-des1">
            <p class="sd-header">Private bathroom</p>
            <p class="sd-in">The bedroom has a bath for exclusive use.</p>
            <p class="sd-header">Private kitchen</p>
            <p class="sd-in">The room has a kitchen for exclusive use.</p>
          </div>
          <div class="sd-des2">
            <p class="sd-header">The bedroom contains 1 bed(s)</p>
            <p class="sd-in">Mattress size: {{room.bed_size}}</p>
          </div>
          <div class="sd-floor">Floor: {{room.floor}}</div>
          <div class="sd-view">
            <div class="sd-price">
              <div class="sd-time">
                <p class="sd-rent">Fixed lease term {{room.rent_time}} week(s) <span>From<span>￡{{room.price_min}}</span>/Week</span></p>
                <p class="sd-move">Move in: {{room.move_in}}</p>
                <p class="sd-move">Move out: {{room.move_out}}</p>
              </div>
            </div>
            <div class="sd-button"
            :class="{'disabled': room.count === 0}"
            :disabled="room.count === 0"
            @click="$router.push(`/prodetail/${apart.apart_id}/${room.studio_id}/apply`)">{{ room.count === 0 ? 'Sold Out' : 'Apply rooms' }}</div>
          </div>
          <div class="sd-bottom"></div>
        </div>
      </div>
    </div>
    <div class="info-bottom"></div>
    <div class="map">
      <GoogleMap :item="apart"/>
    </div>
    <!-- space -->
    <div class="space"></div>
    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push(`/home`)">
        <van-icon name="wap-home-o" color="#376941" />
        <span>Home</span>
      </div>
      <div class="btn-add">From <span>￡{{room.price_min}}</span>/Week </div>
      <div class="btn-buy"
      :class="{'disabled': room.count === 0}"
      :disabled="room.count === 0"
      @click="$router.push(`/prodetail/${apart.apart_id}/${room.studio_id}/apply`)">{{ room.count === 0 ? 'Sold Out' : 'Apply rooms' }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoogleMap from '@/components/GoogleMap.vue'
export default {
  name: 'ProDetail',
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('comment', ['comments']),
    ...mapState('user', ['userInfo']),
    cmt () {
      const apartId = this.$route.params.id
      return this.comments.find((cmt) => cmt.apart_id === apartId)
    },
    apart () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      return this.aparts.find((apart) => apart.apart_id === apartId)
    },
    room () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      const apart = this.aparts.find((apart) => apart.apart_id === apartId)
      const roomId = this.$route.params.rmid
      return apart.studio.find((room) => room.studio_id === roomId)
    },
    filteredCmt () {
      return this.cmt.com.slice(0, 3)
    }
  },
  data () {
    return {
      images: [],
      current: 0
    }
  },
  components: {
    GoogleMap
  },
  methods: {
    onChange (index) {
      this.current = index
    }
  },
  created () {
    console.log(this.userInfo.likeQuery)
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  }
  .info {
    padding: 10px;
  }
  .info-bottom {
      display: block;
      height: 10px;
      width: 100%;
      background-color: #f5f5f5;
    }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #000;
      font-size: 20px;
    }
  }
  .msg {
    font-size: 20px;
    line-height: 24px;
    margin-top: 5px;
    span {
      font-size: 12px;
    }
    .msg2 {
      font-size: 14px;
      padding-left: 150px;
    }
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }
  .address {
    display: flex;
    margin-top: 10px;
    height: 20px;
    color: #000;
  }
  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .left {
      font-size: 24px;
      font-weight: 600;
      p {
        font-size: 14px;
        font-weight: 400;
        padding: 20px 0px 10px;
      }
    }
    .right {
      color: #376941;
      font-size: 24px;
      span {
        font-size: 16px;
      }
      .van-rate {
        padding-top: 10px;
      }
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .room {
    .rm-banner {
      height: 80px;
      color: #000;
      font-size: 24px;
      padding: 0 15px;
      line-height: 80px;
    }
    .studio {
      background-color: #f5f5f5;
      .sd-banner {
        display: flex;
        .sd-info {
          font-size: 12px;
          color: #5c5c5c;
          line-height: 20px;
          margin: 5px 0;
        }
        .van-icon {
          font-size: 20px;
          margin: 5px 10px;
          height: 80px;
          line-height: 80px;
        }
      }
      .sd-content {
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        .sd-icon-container {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .sd-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 22px;
          margin-right: 18px;
        }

        .sd-icon p {
          margin-top: 5px;
          font-size: 12px;
        }
        .sd-des1,
        .sd-des2 {
          width: 160px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-top: 20px;
          padding: 5px;
        }
        .sd-des2 {
          margin-left: 10px;
          .sd-header {
            padding-top: 20px;
            padding-left: 5px;
            font-size: 14px;
            font-weight: 600;
          }
          .sd-in {
            font-size: 12px;
            padding: 20px 5px 5px;
          }
        }
        .sd-header {
          padding: 5px 5px;
          font-size: 14px;
          font-weight: 600;
        }
        .sd-in {
          font-size: 12px;
          padding-left: 5px;
          padding-bottom: 5px;
        }
        .sd-floor {
          margin-top: 20px;
          font-size: 14px;
          color: #8f8d8d;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          width: 335px;
        }
        .sd-view {
          display: flex;
          .sd-price {
            margin-top: 20px;
            .sd-time {
              .sd-rent {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 8px;
                span {
                  font-size: 12px;
                  font-weight: 400;
                  span {
                    font-size: 16px;
                  }
                }
              }
              .sd-move {
                font-size: 12px;
                color: #666666;
                padding-top: 5px;
              }
            }
          }
          .sd-button {
            margin-top: 65px;
            margin-left: -80px;
            text-align: center;
            background-color: #376941;
            width: 100px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            border-radius: 20px;
          }
          .disabled {
            background-color: #fff;
            color: #376941;
            border: 1px solid #376941;
          }
        }
      }
    }
  }
  .space {
    margin-bottom: 55px;
  }
  .map {
    width: 100%;
    height: 250px;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add {
      font-size: 12px;
      span {
        font-size: 17px;
        font-weight: 600;
      }
    }
    .btn-buy {
      height: 38px;
      line-height: 38px;
      width: 120px;
      border-radius: 10px;
      background-color: #376941;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .disabled {
      background-color: #fff;
      color: #376941;
      border: 1px solid #376941;
    }
  }

.tips {
  padding: 10px;
}
</style>
