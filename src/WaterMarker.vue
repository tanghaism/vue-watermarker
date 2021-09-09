<template>
  <template v-if="visible && reset">
    <div
      v-for="(item) in markerNumber"
      :key="item"
      class="vue-water-marker-item"
      :style="style"
    >
      <p
        v-for="(_content, index) in content"
        :key="index"
        v-html="_content"
      />
    </div>
  </template>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onBeforeUnmount, ref, watch} from "vue"

export default defineComponent({
  name: "WaterMarker",
  props: {
    refresh: {
      default: 5000,
      type: Number
    }
  },
  setup(props: { refresh: number }) {

    const markerNumber = ref<number>(0);
    const visible = ref<boolean>(true);
    const content = ref<string[]>([]);
    const width = ref<number>(0);
    const height = ref<number>(0);
    const styleOption = ref<any>({});
    const reset = ref<boolean>(true);

    let time: any;
    let refreshTime: any = () => {
      if(!visible.value){
        clearTimeout(time)
        return ;
      }
      time = setTimeout(async () => {
        reset.value = false;
        await nextTick();
        reset.value = true;
        refreshTime && visible.value && refreshTime();
      }, props.refresh || 5000)
    }

    refreshTime && visible.value && refreshTime();

    onBeforeUnmount(() => {
      refreshTime = null;
      clearTimeout(time);
      reset.value = true;
    })

    const style = computed(() => {
      return {
        fontSize: '15px',
        color: '#adadad',
        opacity: 0.2,
        textAlign: 'center',
        ...styleOption.value,
        width: width.value + 'px',
        height: height.value + 'px'
      }
    })

    watch(() => visible.value, (newVal: boolean) => {
      if (newVal) {
        reset.value = true;
        refreshTime && refreshTime();
      } else {
        clearTimeout(time);
        reset.value = false;
      }
    })

    return {
      visible,
      content,
      styleOption,
      width,
      height,
      style,
      markerNumber,
      reset,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
