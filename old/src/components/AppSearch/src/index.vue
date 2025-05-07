<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { onKeyStroke, useDebounceFn } from '@vueuse/core';
  import { nextTick, ref, unref, watch } from 'vue';
  import { useRouteStore } from '@/store/modules/route';
  import { useGo } from '@/hooks/web/usePage';
  import { useRefs } from '@/hooks/common/useRefs';
  import { useScrollTo } from '@/hooks/common/useScrollTo';
  import { useRootSetting } from '@/hooks/setting';
  import { getRoutePath } from '@/router/elegant/transform';
  import { useI18n } from '@/hooks/web/useI18n';
  import { Tip } from './components';

  interface Props {
    /**
     * @description 是否显示model
     * @description Whether to display model
     */
    show: boolean;
  }

  defineOptions({ name: 'AppSearch' });

  const props = defineProps<Props>();

  const emit = defineEmits(['close']);

  const { t } = useI18n();

  const scrollWrap = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLElement | null>(null);

  const keyword = ref('');
  const activeIndex = ref(-1);
  const searchResult = ref<App.Menu[]>([]);

  const routeStore = useRouteStore();
  const { goKey } = useGo();
  const { refs, setRefs } = useRefs();
  const { getIsMobile } = useRootSetting();

  // 转译特殊字符
  // Translate special characters
  function transform(c: string) {
    const code: string[] = [
      '$',
      '(',
      ')',
      '*',
      '+',
      '.',
      '[',
      ']',
      '?',
      '\\',
      '^',
      '{',
      '}',
      '|',
    ];
    return code.includes(c) ? `\\${c}` : c;
  }

  // 创建搜索正则
  // Create search regular
  function createSearchReg(key: string) {
    const keys = [...key].map((item) => transform(item));
    const str = ['', ...keys, ''].join('.*');
    return new RegExp(str);
  }

  // 搜索
  // Search
  const search = () => {
    if (!unref(keyword)) {
      searchResult.value = [];
      return;
    }
    const reg = createSearchReg(unref(keyword));

    searchResult.value = routeStore.searchMenus.filter((menu) => {
      const title = menu.label.toLocaleLowerCase();

      return reg.test(title);
    });

    activeIndex.value = 0;
  };

  // 防抖搜索
  // Debounce search
  const handleSearch = useDebounceFn(search, 200);

  // Activate when the mouse moves to a certain line
  const handleMouseenter = (e: any) => {
    const { index } = e.target.dataset;
    activeIndex.value = Number(index);
  };

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs);
    if (
      !refList ||
      !Array.isArray(refList) ||
      refList.length === 0 ||
      !unref(scrollWrap)
    ) {
      return;
    }

    const index = unref(activeIndex);
    const currentRef = refList[index];
    if (!currentRef) {
      return;
    }
    const wrapEl = unref(scrollWrap);
    if (!wrapEl) {
      return;
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight;
    const wrapHeight = wrapEl.offsetHeight;
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    });
    start();
  }

  // 处理上下键
  // Handle up and down keys
  const handleUp = () => {
    if (!searchResult.value.length) return;
    activeIndex.value -= 1;
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1;
    }

    handleScroll();
  };
  const handleDown = () => {
    if (!searchResult.value.length) return;
    activeIndex.value += 1;
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0;
    }
    handleScroll();
  };
  // 处理关闭
  // Handle close
  const handleClose = () => {
    searchResult.value = [];
    keyword.value = '';
    activeIndex.value = -1;
    emit('close');
  };

  // 处理回车事件
  // Handle enter event
  const handleEnter = async () => {
    if (!searchResult.value.length || activeIndex.value < 0) {
      return;
    }
    const item = searchResult.value[activeIndex.value];
    handleClose();
    await nextTick();

    // TODO: 好像不对
    const options = getRoutePath(item.routeKey);

    goKey(item.routeKey, options);
  };

  // enter search
  onKeyStroke('Enter', handleEnter);
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
  // esc close
  onKeyStroke('Escape', handleClose);

  watch(
    () => props.show,
    (visible: boolean) => {
      if (visible) {
        nextTick(() => {
          setTimeout(() => {
            unref(inputRef)?.focus();
            // 清空输入框
            keyword.value = '';
          }, 200);
        });
      }
    },
  );

  watch(
    () => keyword.value,
    () => {
      handleSearch();
    },
  );
</script>

<template>
  <AModal
    :closable="false"
    :footer="false"
    :fullscreen="getIsMobile"
    :visible="show"
  >
    <template #title>
      <div class="w-full flex justify-between">
        <div class="model-title-left flex-center flex-auto">
          <SvgIcon
            class="mr-8px"
            color="rgba(var(--primary-6))"
            icon="ri:search-line"
            size="20"
          />
          <input
            ref="inputRef"
            v-model="keyword"
            :placeholder="t('common.searchText')"
            class="flex-auto border-0 outline-none text-16px bg-transparent text-[var(--color-text-1)] leading-32px"
          />
        </div>

        <Tip v-if="!getIsMobile" />
        <AButton v-else class="!p-0" type="text" @click="handleClose">
          {{ t('common.cancelText') }}
        </AButton>
      </div>
    </template>

    <AEmpty
      v-if="searchResult.length === 0"
      :description="t('common.noDataText')"
    />
    <div v-else class="pb-12px">
      <AScrollbar class="overflow-auto max-h-472px">
        <ul>
          <li
            v-for="(item, index) in searchResult"
            :key="item.key"
            :ref="setRefs(index)"
            :class="{
              'bg-[rgba(var(--primary-6))] text-[var(--color-white)]':
                activeIndex === index,
            }"
            :data-index="index"
            class="flex-center w-full h-56px mt-8px mb-5px rounded-6px text-14px cursor-pointer relative shadow"
            @click="handleEnter"
            @mouseenter="handleMouseenter"
          >
            <div class="pl-10px pr-5px flex-center">
              <component :is="item.icon" />
            </div>
            <div class="flex-auto leading-34px">
              {{ item.label }}
            </div>
            <div
              :style="{
                opacity: activeIndex === index ? 1 : 0,
              }"
              class="pr-10px flex-center"
            >
              <SvgIcon icon="uil:enter" size="24" />
            </div>
          </li>
        </ul>
      </AScrollbar>
    </div>
  </AModal>
</template>

<style lang="less" scoped></style>
