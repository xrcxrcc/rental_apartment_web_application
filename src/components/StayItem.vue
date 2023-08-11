<template>
  <div class="stay-item">
    <div class="apart">
      <div class="left">
        <img :src="apart.front_image[0]" alt="" />
      </div>
      <div class="right" @click="$router.push(`/prodetail/${apart.apart_id}`)">
        <p class="tit text-ellipsis-2">
          {{apart.apart_name}}
        </p>
        <p class="count"><i class="star">★</i>{{apart.apart_rate}}<van-icon name="arrow" /></p>
        <p class="price">
          <span class="new">￡{{room.price_min}}</span>
          <span class="old">pre/week</span>
        </p>
      </div>
    </div>
    <div class="room">
      <div class="left">
        <img :src="room.image[0]" alt="" />
      </div>
      <div class="right" @click="$router.push(`/prodetail/${apart.apart_id}/${room.studio_id}`)">
        <p class="tit text-ellipsis-2">
          {{room.studio_name}}
        </p>
        <p class="move">
          <span class="move-text">Move In: </span>
          <span class="move-date">{{room.move_in}}</span>
          <van-icon name="arrow" />
        </p>
        <p class="move">
          <span class="move-text">Move Out: </span>
          <span class="move-date">{{room.move_out}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('user', ['userInfo']),
    apart () {
      const apartId = this.item.apartId // Assuming the route param is named "apartId"
      return this.aparts.find((apart) => apart.apart_id === apartId)
    },
    room () {
      const apartId = this.item.apartId // Assuming the route param is named "apartId"
      const apart = this.aparts.find((apart) => apart.apart_id === apartId)
      const roomId = this.item.studioId
      return apart.studio.find((room) => room.studio_id === roomId)
    }
  },
  created () {
    console.log(this.item.studioId)
  }
}
</script>

<style lang="less" scoped>
.stay-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 10px;
  .apart {
    height: 148px;
    width: 95%;
    padding: 10px;
    background-color: #fff;
    display: flex;
    border-radius: 10px 10px 0 0;
    .left {
      position: relative;
      width: 127px;
      border-radius: 10px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover; /* 缩放并裁剪图片以填充容器 */
        object-position: center;
      }
    }
    .right {
      flex: 1;
      font-size: 16px;
      line-height: 1.3;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .count {
        color: #999;
        font-size: 13px;
        .star {
          color: #376941;
          font-style: normal;
          font-size: 16px;
        }
        .van-icon {
          color: #666;
          margin-left: 150px;
          font-size: 16px;
        }
      }
      .price {
        color: #999;
        font-size: 16px;
        .new {
          color: #376941;
          margin-right: 10px;
          font-weight: 700;
        }
        .old {
          font-size: 12px;
        }
      }
    }
  }
  .room {
    width: 95%;
    height: 120px;
    margin-bottom: 6px;
    padding: 10px;
    background-color: #fff;
    display: flex;
    border-radius: 0 0 10px 10px;
    .left {
      position: relative;
      margin-left: 10px;
      width: 100px;
      height: 90px;
      border-radius: 10px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover; /* 缩放并裁剪图片以填充容器 */
        object-position: center;
      }
    }
    .right {
      flex: 1;
      font-size: 16px;
      line-height: 1.3;
      padding: 0 0 0 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .move {
        color: #999;
        font-size: 13px;
        .move-text {
          margin-right: 10px;
        }
        .move-date {
          color: #376941;
          font-weight: 700;
        }
        .van-icon {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
