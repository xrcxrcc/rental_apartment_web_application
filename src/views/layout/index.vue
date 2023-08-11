<template>
  <div>
    <router-view></router-view>
    <van-tabbar route active-color="#376941">
      <van-tabbar-item to="/home" :icon="isActive('/home') ? 'wap-home' : 'wap-home-o'">Home</van-tabbar-item>
      <van-tabbar-item to="/like" :icon="isActive('/like') ? 'like' : 'like-o'">Saved</van-tabbar-item>
      <van-tabbar-item to="/stays" :icon="isActive('/chat') ? 'shop' : 'shop-o'">Stays</van-tabbar-item>
      <van-tabbar-item to="/profile" :icon="isActive('/profile') ? 'manager' : 'manager-o'">Profile</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  methods: {
    isActive (route) {
      return this.$route.path === route
    }
  }
}
</script>

<style>

</style>
