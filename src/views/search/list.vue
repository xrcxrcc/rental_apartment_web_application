<template>
  <div class="search">
    <van-nav-bar fixed title="Search list" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="searchKeyword"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon @click="$router.push('/like')" class="tool" name="like-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="sortByRate">
        Rate
        <van-icon v-if="rateSortOrder !== 0" :name="rateSortOrder === -1 ? 'arrow-up' : 'arrow-down'" />
      </div>
      <div class="sort-item" @click="sortByPrice">
        Price
        <van-icon v-if="priceSortOrder !== 0" :name="priceSortOrder === -1 ? 'arrow-up' : 'arrow-down'" />
      </div>
      <div class="sort-item">{{searchKeyword}} </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in filteredAparts" :key="item.apart_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchQuery: '',
      rateSortOrder: 0,
      priceSortOrder: 0
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    filteredAparts () {
      return this.aparts.filter(apart => {
        const apartNameMatch = apart.apart_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        const cityMatch = apart.city.toLowerCase().includes(this.searchKeyword.toLowerCase())
        return apartNameMatch || cityMatch
      })
    },
    ...mapGetters(['searchKeyword']),
    ...mapState('apartments', ['aparts']),
    searchKeyword () {
      return this.$route.query.search
    }
  },
  methods: {
    sortByRate () {
      this.rateSortOrder = this.rateSortOrder === -1 ? 1 : this.rateSortOrder === 1 ? 0 : -1 // 切换排序方式
      this.aparts.sort((a, b) => (a.apart_rate - b.apart_rate) * this.rateSortOrder)
    },
    sortByPrice () {
      this.priceSortOrder = this.priceSortOrder === -1 ? 1 : this.priceSortOrder === 1 ? 0 : -1 // 切换排序方式
      this.aparts.sort((a, b) => (a.price_min - b.price_min) * this.priceSortOrder)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
