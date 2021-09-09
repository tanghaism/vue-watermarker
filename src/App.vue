<script lang="ts">
import { defineComponent, PropType, App, createApp, toRefs, watch } from 'vue';
import WaterMarker from './WaterMarker.vue'
export default defineComponent({
  props: {
    visible: {
      default: true,
      type: Boolean
    },
    content: {
      default: () => [],
      type: Array as PropType<string[]>
    },
    styleOption: {
      default: () => ({}),
      type: Object as PropType<StyleSheet>
    },
    width: {
      type: Number,
      default: 220
    },
    height: {
      type: Number,
      default: 220
    },
    refresh: {
      default: 5000,
      type: Number
    },
    target: {
      default: undefined,
      type: [String, Object]
    }
  },
  setup(props: any) {

    const { visible, content, styleOption, refresh, target, width, height } = toRefs(props);

    let app: App;
    let comp: any;
    let observer: MutationObserver;

    let parentNode = document.body as HTMLElement;
    if(typeof target.value === 'string'){
      parentNode = document.querySelector(target.value) as HTMLElement
    }else if(typeof target.value === 'object') {
      parentNode = target.value as HTMLElement
    }

    const destroy = () => {
      observer?.disconnect();
      app?.unmount();
      comp = null;
      const dom = document.querySelector('#vue-water-marker');
      if(dom){
        dom?.parentNode?.removeChild(dom);
      }
    }

    const setData = () => {
      if(comp){
        comp.visible = visible.value;
        comp.content = content.value;
        comp.styleOption = styleOption.value;
        comp.width = width.value;
        comp.height = height.value;
        comp.markerNumber = Math.ceil(screen.width / height.value) * Math.ceil(screen.height / width.value);
      }
    }

    const createMarker = () => {
      const dom = document.createElement('div');
      dom.id = 'vue-water-marker';
      app = createApp(WaterMarker, {
        refresh: refresh.value
      });

      comp = app.mount(dom);

      setData();
      parentNode?.appendChild(dom);
    }

    const obverseFunc = () => {
      const obverseConfig = { childList: true };

      if(!observer){
        // 当观察到变动时执行的回调函数
        const callback = async function(mutationsList: MutationRecord[]) {
          for(const record of mutationsList){
            const removeList = record.removedNodes;
            if(removeList?.length > 0){
              for(const dom of Array.from(removeList)){
                if((dom as Element).getAttribute('id') === 'vue-water-marker'){
                  app?.unmount();
                  comp = null;
                  createMarker();
                }
              }
            }
          }
        };
        // 创建一个观察器实例并传入回调函数
        observer = new MutationObserver(callback);
      }


      // 以上述配置开始观察目标节点
      observer.observe(parentNode, obverseConfig);
    }

    if(!document.querySelector('#vue-water-marker')){
      obverseFunc();
      createMarker();
    }

    watch([() => content.value, () => styleOption.value, () => width.value, () => height.value], () => {
      setData();
    })

    watch(() => visible.value, () => {
      if(comp){
        comp.visible = visible.value;
      }
      if(!visible.value) {
        destroy();
      }else{
        createMarker()
      }
    })
  },
  render: () => null
})
</script>

<style lang="scss">
#vue-water-marker{
  padding-top: 20px;
  padding-left: 25px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  pointer-events: none;
  user-select: none;
  z-index: 19999;
  .vue-water-marker-item{
    padding: 0 20px;
    transform: rotate(-45deg);
    pointer-events: none;
    user-select: none;
  }
}
</style>
