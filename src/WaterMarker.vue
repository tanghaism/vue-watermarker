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
import timerWorker from "./timmerWorker";

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

    let worker: Worker | null;

    const initWorker = () => {
      const blob = new Blob(['(' + timerWorker.toString() + ')()']);
      const url = window.URL.createObjectURL(blob);
      worker = new Worker(url) as Worker;
      worker.postMessage({ during: props.refresh || 5000 });
      worker.onmessage = async ({data}) => {
        if(data !== 'clear'){
          reset.value = false;
          await nextTick();
          reset.value = true;
          visible.value && worker?.postMessage({});
        }else{
          worker?.terminate()
        }
      }
    }

    visible.value && initWorker();

    onBeforeUnmount(() => {
      worker?.postMessage({type: 'clear'})
      worker = null;
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
        if(worker){
          worker.postMessage({ during: props.refresh || 5000 });
        }else{
          initWorker()
        }
      } else {
        worker?.postMessage({type: 'clear'})
        worker = null;
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
