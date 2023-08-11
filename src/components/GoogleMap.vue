<template>
  <div>
    <GmapMap
    :center="this.pos"
    :zoom="13"
    map-type-id="terrain"
    style="width: 100%; height: 250px">
      <GmapMarker
        :position="this.pos"
        :clickable="true"
        :draggable="true"
        @click="center = this.pos"
      />
    </GmapMap>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      pos: {
        lat: this.item.lat,
        lng: this.item.lng
      }
    }
  },
  created () {
    console.log(this.pos.lat)
  }
}
</script>
<style scoped>

</style>
