<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);
  const { path, _redirectType } = params;

  Reflect.deleteProperty(params, '_redirectType');
  Reflect.deleteProperty(params, 'path');

  const _path = Array.isArray(path) ? path.join('/') : path;

  if (_redirectType === 'name') {
    replace({
      name: _path,
      query,
      params: JSON.parse((params._originParams as string) ?? '{}'),
    });
  } else {
    replace({
      path: _path.startsWith('/') ? _path : `/${_path}`,
      query,
    });
  }
</script>
