<template>
  <div>
    <span
      class="padding"
    >这是页面内容</span>
  </div>
  <VueWaterMarker
    :content="['这是第1行水印', '__这是第2行水印__', '~~~~~这是第三行水印~~~~']"
  />
</template>

<script lang="ts">
import {defineComponent} from "vue"
import VueWaterMarker from '../dist/index'
export default defineComponent({
  name: "App",
  components: {
    VueWaterMarker
  },
})
</script>

<style lang="scss" scoped>
.padding{
  font-size: 18px;
  padding: 10px;
}
</style>