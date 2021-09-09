<template>
  <div>
    <span
      class="padding"
    >This is website content!</span>
  </div>

  <!-- waterMarker -->
  <VueWaterMarker
    :content="['water marker one', '__water marker two__', '~~~~~water marker three~~~~']"
  />
</template>

<script lang="ts">
import {defineComponent} from "vue"
import VueWaterMarker from 'vue-watermarker'
export default defineComponent({
  name: "App",
  components: {
    VueWaterMarker
  }
})
</script>

<style lang="scss" scoped>
.padding{
  font-size: 18px;
  padding: 10px;
}
</style>
