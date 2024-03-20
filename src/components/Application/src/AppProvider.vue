<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import { createAppProviderContext } from '@/hooks/common/useContext';

  const props = {
    /**
     * class style prefix - [class 前缀]
     */
    prefixCls: { type: String, default: 'adp' },
  };

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false);

      const { prefixCls } = toRefs(props);

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile });

      return () => slots.default?.();
    },
  });
</script>
