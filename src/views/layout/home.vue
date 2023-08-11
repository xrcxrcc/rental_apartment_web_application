<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="XHome" />

    <!-- 搜索框 -->
    <div class="search-container">
      <div class="search-content">
        <van-icon class="search-icon" name="search" />
        <input class="Search" type="text"
        placeholder="    Search by City, University or Property"
        @click="$router.push('/search')">
        <van-icon class="calender-icon" name="notes-o" />
        <input class="SearchDate" type="text"
        placeholder="    Please select date"
        @click="showDatetimePicker">
        <button class="search-btn" @click="$router.push('/search')">Search</button>
      </div>
    </div>
    <van-datetime-picker type="year-month" v-model="selectedDate" v-if="showPicker" @confirm="onPickerConfirm" @cancel="onPickerCancel" />

    <!-- 导航 -->

    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/banner1.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner2.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner3.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— Recommendation ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in filteredAparts" :key="item.aparts_id" :item="item"></GoodsItem>
      </div>
    </div>
    <div class="void"></div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  computed: {
    ...mapState('apartments', ['aparts']),
    filteredAparts () {
      return this.aparts.filter(item => item.city === 'London').slice(0, 10)
    }
  },
  data () {
    return {
      showPicker: false,
      selectedDate: new Date()
    }
  },
  methods: {
    showDatetimePicker () {
      this.showPicker = true // 显示DatetimePicker弹出层
    },
    onPickerConfirm (val) {
      // 处理确认选择的日期逻辑
      this.selectedDate = val
      this.showPicker = false
      console.log(this.selectedDate) // 关闭DatetimePicker弹出层
    },
    onPickerCancel () {
      this.showPicker = false // 关闭DatetimePicker弹出层
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #376941;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.search-container {
  position: relative;
  width: 100%;
  height: 250px;
  background: url('@/assets/Forest.jpg') no-repeat top center/cover;
}
.search-content {
  position: absolute;
  background-color: #fff;
  width: 90%;
  height: 200px;
  top: 25px;
  left: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.Search {
  position: absolute;
  width: 290px;
  border: none; /* 去除边框 */
  background-color: transparent; /* 设置背景为透明 */
  padding: 0 0 20px 0;
  top: 25px;
  left: 25px;
  border-bottom: 2px solid #ccc;
}
.SearchDate {
  position: absolute;
  width: 280px;
  border: none; /* 去除边框 */
  background-color: transparent; /* 设置背景为透明 */
  padding: 0;
  top: 85px;
  left: 25px
}
.search-icon {
  position: absolute;
  top: 27px;
  left: 20px;
}
.calender-icon {
  position: absolute;
  top: 85px;
  left: 20px;
}
.search-btn {
  position: absolute;
  top: 125px;
  left: 25px;
  border: none;
  width: 290px;
  height: 55px;
  border-radius: 10px;
  color: #fff;
  background-color: #376941;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 100px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}
.boxshow {
  width: 90%;
  margin: 0 auto 20px;
}

// 猜你喜欢
.guess .guess-title {
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
.banner {
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    object-fit: cover; /* 缩放并裁剪图片以填充容器 */
    object-position: center;
  }
}
.void {
  height: 40px;
}
</style>
