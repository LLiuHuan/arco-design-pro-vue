<template>
  <a-drawer :visible="drawer" title="媒体库" width="33%" :footer="false">
    <div class="media">
      <a-image
        v-for="(item, key) in picList"
        :key="key"
        class="header-img-box-list"
        :src="item.url && item.url.slice(0, 4) !== 'http' ? path + item.url : item.url"
        @click="chooseImg(item.url, target, targetKey)"
        :preview-visible="false"
      />
    </div>
  </a-drawer>
</template>

<script lang="ts">
  import { FileTypes } from '@/api/file/file-types';

  const path = import.meta.env.VITE_BASE_API;
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { getFileList } from '@/api/file/file';
  export default defineComponent({
    name: 'ChooseImg',
    props: {
      target: {
        type: Object,
        default: null,
      },
      targetKey: {
        type: String,
        default: '',
      },
    },
    emits: ['enterImg'],
    setup(_, { emit }) {
      const state = reactive({
        drawer: ref(false),
        picList: ref<Array<FileTypes>>([]),
        path: path,
      });

      const chooseImg = (url, target, targetKey) => {
        if (target && targetKey) {
          target[targetKey] = url;
        }
        emit('enterImg', url);
        state.drawer = false;
      };

      const open = async () => {
        const res = await getFileList({ page: 1, pageSize: 9999 });
        state.picList = res.list;
        state.drawer = true;
      };

      return {
        ...toRefs(state),
        open,
        chooseImg,
      };
    },
  });
</script>

<style scoped>
  @import './styles/index.less';
</style>
