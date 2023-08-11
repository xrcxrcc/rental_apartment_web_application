<template>
  <div v-if="item.apart_id" class="goods-item">
    <div class="like-item">
      <div class="left">
        <img :src="item.apart_image" alt="" />
        <van-icon :name="isLiked ? 'like' : 'like-o'" :class="isLiked ? 'like-icon' : 'like-o-icon'" @click="addLike" />
      </div>
      <div class="right" @click="$router.push(`/prodetail/${item.apart_id}`)">
        <p class="tit text-ellipsis-2">
          {{item.apart_name}}
        </p>
        <p class="count"><i class="star">★</i>{{item.apart_rate}}</p>
        <p class="price">
          <span class="new">￡{{item.price_min}}</span>
          <span class="old">pre/week</span>
        </p>
      </div>
    </div>
    <div class="banner"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    isLiked () {
      const apartIdStr = this.item.apart_id.toString()
      // 判断item.apart_id是否在this.userInfo.likeQuery数组中
      return this.userInfo.likeQuery.includes(apartIdStr)
    }
  },
  methods: {
    addLike () {
      this.$dialog.confirm({ title: 'Hint', message: 'Are you sure you want to remove this apartment from Like List', confirmButtonText: 'Yes', cancelButtonText: 'Cancel', cancelButtonColor: '#376941', confirmButtonColor: '#000000' })
        .then(() => {
          const id = this.item.apart_id.toString()
          this.$store.dispatch('user/addToLikeQuery', id)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  .like-item {
    height: 148px;
    margin-bottom: 6px;
    padding: 10px;
    background-color: #fff;
    display: flex;
    .left {
      position: relative;
      width: 127px;
      border-radius: 10px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
      .like-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #376941;
        font-size: 24px;
      }
      .like-o-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #fff;
        font-size: 24px;
      }
    }
    .right {
      flex: 1;
      font-size: 14px;
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
  .banner {
      height: 10px;
      width: 100%;
      background-color: #f5f5f5;
    }
}

</style>
