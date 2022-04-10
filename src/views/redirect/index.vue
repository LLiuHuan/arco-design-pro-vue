<script lang="tsx">
  import { defineComponent, h, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Empty } from '@arco-design/web-vue';

  export default defineComponent({
    name: 'Redirect',
    setup() {
      const route = useRoute();
      const router = useRouter();
      onBeforeMount(() => {
        const { params, query } = route;
        const { path } = params;
        console.log(route, params);
        router.replace({
          path: '/' + (Array.isArray(path) ? path.join('/') : path),
          query,
        });
      });
      return () => h(Empty);
    },
  });
</script>
