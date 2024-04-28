<template>
  <AModal :visible="show" :closable="false" :footer="false">
    <template #title>
      <div class="w-full flex justify-between">
        <div class="model-title-left flex-center flex-auto">
          <SvgIcon
            icon="ri:search-line"
            size="20"
            color="rgba(var(--primary-6))"
            class="mr-8px"
          />
          <input
            ref="inputRef"
            v-model="keyword"
            class="flex-auto border-0 outline-none text-16px bg-transparent text-[var(--color-text-1)] leading-32px"
            :placeholder="$t('common.searchText')"
          />
        </div>

        <Tip />
      </div>
    </template>

    <AEmpty
      v-if="searchResult.length === 0"
      :description="$t('common.noDataText')"
    ></AEmpty>
    <div v-else class="pb-12px">
      <ul class="max-h-472px m-a overscroll-auto">
        <li
          v-for="(item, index) in searchResult"
          :key="item.path"
          :ref="setRefs(index)"
          :data-index="index"
          class="flex-center w-full h-56px mt-8px mb-5px rounded-6px text-14px cursor-pointer relative shadow"
          :class="{
            'bg-[rgba(var(--primary-6))] text-[var(--color-white)]':
              activeIndex === index,
          }"
          @mouseenter="handleMouseenter"
          @click="handleEnter"
        >
          <div class="pl-10px pr-5px flex-center">
            <SvgIcon
              :icon="item.meta.icon || 'solar:document-broken'"
              :local-icon="item.meta.localIcon"
              size="24"
            />
          </div>
          <div class="flex-auto leading-34px">
            {{
              item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title
            }}
          </div>
          <div
            class="pr-10px flex-center"
            :style="{
              opacity: activeIndex === index ? 1 : 0,
            }"
          >
            <SvgIcon icon="uil:enter" size="24" />
          </div>
        </li>
      </ul>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { onKeyStroke, useDebounceFn } from '@vueuse/core';
  import { nextTick, ref, unref, watch } from 'vue';
  import { useRouteStoreWithOut } from '@/store/modules/route';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useGo } from '@/hooks/web/usePage';
  import { transformRouteNameToOption } from '@/utils/router';
  import { useRefs } from '@/hooks/common/useRefs';
  import { useScrollTo } from '@/hooks/common/useScrollTo';
  import { Tip } from './components';

  defineOptions({ name: 'AppSearch' });

  interface Props {
    /**
     * @description 是否显示model
     * @description Whether to display model
     */
    show: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits(['close']);

  const scrollWrap = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLElement | null>(null);

  const keyword = ref('');
  const activeIndex = ref(-1);
  const searchResult = ref<AuthRoute.Route[]>([]);

  const { t } = useI18n();
  const routeStore = useRouteStoreWithOut();
  const { goKey } = useGo();
  const { refs, setRefs } = useRefs();

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

    searchResult.value = routeStore.getSearchMenus.filter((menu) => {
      const title = (
        menu.meta.i18nTitle ? t(menu.meta.i18nTitle) : menu.meta.title
      ).toLocaleLowerCase();

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

    const options = transformRouteNameToOption(item.name);

    goKey(item.name, options);
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
      console.log(visible, inputRef);
      if (visible) {
        nextTick(() => {
          unref(inputRef)?.focus();
          // 清空输入框
          keyword.value = '';
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

<style lang="less" scoped></style>
