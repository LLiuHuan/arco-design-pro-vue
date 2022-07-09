<script lang="tsx" setup>
  import { onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  onBeforeMount(() => {
    const { params, query } = route;
    const { path } = params;
    router.replace({
      path: `/${Array.isArray(path) ? path.join('/') : path}`,
      query,
    });
  });
</script>
