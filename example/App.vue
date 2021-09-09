<template>
  <div>
    <span
      class="padding"
    >This is website content!</span>
  </div>

  <!-- waterMarker -->
  <VueWaterMarker
    :visible="init"
    :content="['water marker one', '__water marker two__', '~~~~~water marker three~~~~']"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from "vue"
import VueWaterMarker from '../src/index'
export default defineComponent({
  name: "App",
  components: {
    VueWaterMarker
  },
  setup(){

    const init = ref<boolean>(true);

    setTimeout(() => {
      init.value = false;
      setTimeout(() => {
        init.value = true;
      }, 2000)
    }, 2000)

    return {
      init
    }
  },
})
</script>

<style lang="scss" scoped>
.padding{
  font-size: 18px;
  padding: 10px;
}
</style>
